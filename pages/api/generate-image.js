import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dow3hldnr', // Replace with your Cloudinary cloud name
  api_key: '496957526634376', // Replace with your Cloudinary API key
  api_secret: 'OmoOb1uSfvu42L6iz3o1ugLjZ6Q', // Replace with your Cloudinary API secret
});

export const config = {
  api: {
    bodyParser: true, // Allow JSON body parsing
  },
};

const handler = async (req, res) => {
  const { text } = req.body; // Text passed from the client

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    // Create an image with dynamic text using Cloudinary's transformation
    const result = await cloudinary.uploader.upload('data:image/png;base64,', {
      public_id: 'generated_image', // Public ID for the generated image
      transformation: [
        { width: 600, height: 400, crop: 'fit' }, // Set image size
        { overlay: { font_family: 'Arial', font_size: 40, text: text }, gravity: 'center' }, // Add text overlay in the center
        { background: 'yellow' }, // Background color (optional)
      ],
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
};

export default handler;
