import formidable from 'formidable';
import { v2 as cloudinary } from 'cloudinary';

// Cloudinary configuration
cloudinary.config({
  cloud_name: 'dow3hldnr',
  api_key: '496957526634376',
  api_secret: 'OmoOb1uSfvu42L6iz3o1ugLjZ6Q',
});

// Disable Next.js body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error parsing the form:", err);
        return res.status(500).json({ error: "Error parsing the form" });
      }

      console.log("Files received:", files);
      console.log("Fields received:", fields);

      // Check if an image was uploaded
      const file = files.image?.filepath;
      if (!file) {
        console.error("No file uploaded or 'image' key missing.");
        return res.status(400).json({ error: "No file uploaded or 'image' key missing" });
      }

      try {
        // Upload the file to Cloudinary
        const result = await cloudinary.uploader.upload(file, {
          folder: 'your_folder_name', // Optional: Add a folder in Cloudinary
        });

        console.log("Upload successful:", result);

        // Send the result back to the client
        return res.status(200).json(result);
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res.status(500).json({ error: "Failed to upload image to Cloudinary" });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
};

export default handler;
