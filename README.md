# 🎨 AI Image Generator

A powerful web-based AI image generation tool that transforms text prompts into stunning, high-quality images using Hugging Face's Stable Diffusion models.

## ✨ Features

- **Text-to-Image Generation**: Create images from detailed text descriptions
- **Multiple AI Models**: Choose from various Stable Diffusion models
- **Customizable Parameters**: Adjust quality steps for better results
- **Negative Prompts**: Specify what you don't want in your images
- **Modern UI**: Beautiful, responsive dark-themed interface
- **Easy Download**: Save generated images with one click
- **Example Prompts**: Quick-start templates to inspire creativity
- **API Key Storage**: Securely save your API key locally

## 🚀 Getting Started

### Prerequisites

You'll need a free Hugging Face API key to use this tool:

1. Go to [Hugging Face](https://huggingface.co/)
2. Create a free account (if you don't have one)
3. Navigate to [Settings > Access Tokens](https://huggingface.co/settings/tokens)
4. Create a new token with "Read" permissions
5. Copy your API key (starts with `hf_`)

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser
3. No build process or server required!

### Usage

1. **Enter Your API Key**: Paste your Hugging Face API key in the designated field
2. **Write Your Prompt**: Describe the image you want to create in detail
3. **Optional Settings**:
   - Add negative prompts to avoid unwanted elements
   - Select your preferred AI model
   - Adjust quality steps (higher = better quality but slower)
4. **Generate**: Click the "Generate Image" button
5. **Download**: Save your generated image to your device

## 💡 Tips for Better Results

### Be Specific
Instead of "a cat", try "a fluffy orange cat sitting on a windowsill, soft morning light, photorealistic"

### Mention Art Style
Add style keywords like:
- "digital art"
- "oil painting"
- "photorealistic"
- "anime style"
- "watercolor"
- "3D render"

### Use Quality Terms
Include terms like:
- "highly detailed"
- "4K"
- "professional"
- "cinematic lighting"
- "trending on artstation"

### Use Negative Prompts
Specify what to avoid:
- "blurry"
- "low quality"
- "distorted"
- "ugly"
- "deformed"

## 🎯 Example Prompts

- **Fantasy**: "A majestic dragon flying over a medieval castle at sunset, fantasy art style, highly detailed, vibrant colors"
- **Sci-Fi**: "A futuristic cyberpunk city at night with neon lights, flying cars, and towering skyscrapers, cinematic lighting"
- **Nature**: "A serene Japanese garden with cherry blossoms, koi pond, and traditional bridge, peaceful atmosphere, spring season"
- **Character**: "A cute robot reading a book in a cozy library, warm lighting, digital art, kawaii style"
- **Space**: "An astronaut floating in space with Earth in the background, photorealistic, 4K quality, stunning view"

## 🤖 Available AI Models

- **Stable Diffusion 2.1**: Latest version with improved quality
- **Stable Diffusion 1.5**: Fast and reliable
- **OpenJourney**: Midjourney-style results
- **Stable Diffusion 1.4**: Classic model

## 🔧 Technical Details

### Technologies Used
- Pure HTML, CSS, and JavaScript (no frameworks required)
- Hugging Face Inference API
- Modern ES6+ JavaScript
- CSS Grid and Flexbox for responsive layout

### Browser Compatibility
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

### API Information
- Uses Hugging Face's free Inference API
- Rate limits apply based on your account tier
- Models may take 20-30 seconds to load on first use
- Generated images are typically 512x512 or 768x768 pixels

## 🔒 Privacy & Security

- Your API key is stored locally in your browser (localStorage)
- No data is sent to any server except Hugging Face
- All processing happens client-side
- Your prompts and images are not stored by this application

## 📝 License

MIT License - Feel free to use, modify, and distribute this project.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 🙏 Acknowledgments

- [Hugging Face](https://huggingface.co/) for providing the Inference API
- [Stability AI](https://stability.ai/) for Stable Diffusion models
- The open-source AI community

## 📞 Support

If you encounter issues:
1. Check that your API key is valid
2. Ensure you have an active internet connection
3. Wait 20-30 seconds if the model is loading
4. Try a different model if one isn't working
5. Check the browser console for error messages

## 🎉 Have Fun Creating!

Unleash your creativity and generate amazing images with AI. The only limit is your imagination!

---

Made with ❤️ using AI technology
