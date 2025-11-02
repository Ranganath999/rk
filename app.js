// ===================================
// AI Image Generator - Main Application
// ===================================

class ImageGenerator {
    constructor() {
        this.apiKey = null;
        this.isGenerating = false;
        this.currentImageBlob = null;
        this.currentPrompt = '';
        this.currentModel = '';
        
        this.initializeElements();
        this.attachEventListeners();
        this.loadSavedApiKey();
    }

    initializeElements() {
        // Input elements
        this.promptInput = document.getElementById('prompt-input');
        this.negativePromptInput = document.getElementById('negative-prompt');
        this.modelSelect = document.getElementById('model-select');
        this.stepsInput = document.getElementById('steps-input');
        this.stepsValue = document.getElementById('steps-value');
        this.apiKeyInput = document.getElementById('api-key-input');
        
        // Button elements
        this.generateBtn = document.getElementById('generate-btn');
        this.downloadBtn = document.getElementById('download-btn');
        this.newGenerationBtn = document.getElementById('new-generation-btn');
        
        // Status and result elements
        this.statusSection = document.getElementById('generation-status');
        this.resultSection = document.getElementById('result-section');
        this.generatedImage = document.getElementById('generated-image');
        this.usedPrompt = document.getElementById('used-prompt');
        this.usedModel = document.getElementById('used-model');
        
        // Example items
        this.exampleItems = document.querySelectorAll('.example-item');
    }

    attachEventListeners() {
        // Generate button
        this.generateBtn.addEventListener('click', () => this.handleGenerate());
        
        // Download button
        this.downloadBtn.addEventListener('click', () => this.handleDownload());
        
        // New generation button
        this.newGenerationBtn.addEventListener('click', () => this.handleNewGeneration());
        
        // Steps slider
        this.stepsInput.addEventListener('input', (e) => {
            this.stepsValue.textContent = e.target.value;
        });
        
        // API key input - save to localStorage
        this.apiKeyInput.addEventListener('change', () => {
            this.saveApiKey();
        });
        
        // Example prompts
        this.exampleItems.forEach(item => {
            item.addEventListener('click', () => {
                const prompt = item.getAttribute('data-prompt');
                this.promptInput.value = prompt;
                this.promptInput.focus();
                this.showStatus('Example prompt loaded! Click Generate to create your image.', 'info');
            });
        });
        
        // Enter key in prompt textarea
        this.promptInput.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                this.handleGenerate();
            }
        });
    }

    loadSavedApiKey() {
        const savedKey = localStorage.getItem('hf_api_key');
        if (savedKey) {
            this.apiKeyInput.value = savedKey;
            this.apiKey = savedKey;
        }
    }

    saveApiKey() {
        const key = this.apiKeyInput.value.trim();
        if (key) {
            localStorage.setItem('hf_api_key', key);
            this.apiKey = key;
            this.showStatus('API key saved successfully!', 'success');
        }
    }

    validateInputs() {
        const prompt = this.promptInput.value.trim();
        const apiKey = this.apiKeyInput.value.trim();

        if (!prompt) {
            this.showStatus('Please enter a prompt describing the image you want to generate.', 'error');
            this.promptInput.focus();
            return false;
        }

        if (!apiKey) {
            this.showStatus('Please enter your Hugging Face API key. Get one for free at huggingface.co/settings/tokens', 'error');
            this.apiKeyInput.focus();
            return false;
        }

        if (!apiKey.startsWith('hf_')) {
            this.showStatus('Invalid API key format. Hugging Face API keys start with "hf_"', 'error');
            this.apiKeyInput.focus();
            return false;
        }

        return true;
    }

    async handleGenerate() {
        if (this.isGenerating) {
            return;
        }

        if (!this.validateInputs()) {
            return;
        }

        this.isGenerating = true;
        this.generateBtn.disabled = true;
        this.generateBtn.innerHTML = '<span class="spinner"></span> <span class="btn-text">Generating...</span>';
        
        const prompt = this.promptInput.value.trim();
        const negativePrompt = this.negativePromptInput.value.trim();
        const model = this.modelSelect.value;
        const steps = parseInt(this.stepsInput.value);
        const apiKey = this.apiKeyInput.value.trim();

        this.currentPrompt = prompt;
        this.currentModel = model;

        try {
            this.showStatus('Initializing AI model... This may take a moment.', 'loading');
            
            const imageBlob = await this.generateImage(prompt, negativePrompt, model, steps, apiKey);
            
            this.currentImageBlob = imageBlob;
            this.displayGeneratedImage(imageBlob);
            this.showStatus('Image generated successfully! 🎉', 'success');
            
        } catch (error) {
            console.error('Generation error:', error);
            this.showStatus(`Error: ${error.message}`, 'error');
        } finally {
            this.isGenerating = false;
            this.generateBtn.disabled = false;
            this.generateBtn.innerHTML = '<span class="btn-text">🎨 Generate Image</span>';
        }
    }

    async generateImage(prompt, negativePrompt, model, steps, apiKey) {
        const API_URL = `https://api-inference.huggingface.co/models/${model}`;
        
        const payload = {
            inputs: prompt,
            parameters: {
                num_inference_steps: steps,
            }
        };

        // Add negative prompt if provided
        if (negativePrompt) {
            payload.parameters.negative_prompt = negativePrompt;
        }

        this.showStatus('Sending request to AI model...', 'loading');

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            let errorMessage = 'Failed to generate image';
            
            try {
                const errorJson = JSON.parse(errorText);
                if (errorJson.error) {
                    errorMessage = errorJson.error;
                    
                    // Handle model loading
                    if (errorMessage.includes('loading')) {
                        this.showStatus('Model is loading... Please wait 20-30 seconds and try again.', 'loading');
                        throw new Error('Model is currently loading. Please wait a moment and try again.');
                    }
                }
            } catch (e) {
                // If not JSON, use the text
                if (errorText) {
                    errorMessage = errorText;
                }
            }
            
            if (response.status === 401) {
                throw new Error('Invalid API key. Please check your Hugging Face API key.');
            } else if (response.status === 403) {
                throw new Error('Access denied. Please check your API key permissions.');
            } else if (response.status === 503) {
                throw new Error('Model is currently loading. Please wait 20-30 seconds and try again.');
            }
            
            throw new Error(errorMessage);
        }

        this.showStatus('Processing generated image...', 'loading');

        const blob = await response.blob();
        
        if (blob.size === 0) {
            throw new Error('Received empty image. Please try again.');
        }

        return blob;
    }

    displayGeneratedImage(blob) {
        const imageUrl = URL.createObjectURL(blob);
        this.generatedImage.src = imageUrl;
        this.usedPrompt.textContent = this.currentPrompt;
        this.usedModel.textContent = this.currentModel;
        
        this.resultSection.style.display = 'block';
        this.resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    handleDownload() {
        if (!this.currentImageBlob) {
            this.showStatus('No image to download.', 'error');
            return;
        }

        const url = URL.createObjectURL(this.currentImageBlob);
        const a = document.createElement('a');
        a.href = url;
        
        // Create filename from prompt (first 50 chars, sanitized)
        const sanitizedPrompt = this.currentPrompt
            .substring(0, 50)
            .replace(/[^a-z0-9]/gi, '_')
            .toLowerCase();
        
        a.download = `ai_generated_${sanitizedPrompt}_${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showStatus('Image downloaded successfully!', 'success');
    }

    handleNewGeneration() {
        this.resultSection.style.display = 'none';
        this.currentImageBlob = null;
        this.promptInput.focus();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    showStatus(message, type = 'info') {
        this.statusSection.innerHTML = '';
        this.statusSection.className = 'status-section active';
        
        if (type === 'loading') {
            this.statusSection.classList.add('loading');
            this.statusSection.innerHTML = `
                <div class="status-message info">
                    <span class="spinner"></span>
                    <span>${message}</span>
                </div>
            `;
        } else if (type === 'success') {
            this.statusSection.classList.add('success');
            this.statusSection.innerHTML = `
                <div class="status-message success">
                    <span>✅</span>
                    <span>${message}</span>
                </div>
            `;
            
            // Auto-hide success messages after 5 seconds
            setTimeout(() => {
                this.statusSection.classList.remove('active');
            }, 5000);
        } else if (type === 'error') {
            this.statusSection.classList.add('error');
            this.statusSection.innerHTML = `
                <div class="status-message error">
                    <span>❌</span>
                    <span>${message}</span>
                </div>
            `;
        } else {
            this.statusSection.innerHTML = `
                <div class="status-message info">
                    <span>ℹ️</span>
                    <span>${message}</span>
                </div>
            `;
            
            // Auto-hide info messages after 5 seconds
            setTimeout(() => {
                this.statusSection.classList.remove('active');
            }, 5000);
        }
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ImageGenerator();
});
