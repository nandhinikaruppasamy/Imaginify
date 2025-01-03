// pages/api/generateImage.js

import axios from 'axios';

const API_KEY = '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'; // Replace with your actual OpenAI API key

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    try {console.log("inside try");
      // Make a request to OpenAI API to generate image
      const response = await axios.post(
        'https://api.openai.com/v1/images/generations',
        {
          prompt: prompt,
          n: 1,
          size: '1024x1024', // You can change the size here
        },
        {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Send back the image URL in the response
      const imageUrl = response.data.data[0].url;console.log("im url",imageUrl);
      res.status(200).json({ imageUrl });
    } catch (error) {
      console.error('Error generating image:', error);
      res.status(500).json({ error: 'Failed to generate image' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
