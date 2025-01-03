import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Endpoint to generate an image from Craiyon
app.post('/generateImage', async (req, res) => {
    const { prompt } = req.body;
    
    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required.' });
    }

    try {
        const response = await axios.post(
            'https://api.apify.com/v2/acts/hamza.alwan~craiyon-crawler/runs?token=<YOUR_API_TOKEN>',
            { searchStrings: [prompt] },
            { headers: { 'Content-Type': 'application/json' } }
        );
        
        const result = await axios.get(
            `https://api.apify.com/v2/acts/hamza.alwan~craiyon-crawler/run-sync-get-dataset-items?token=<YOUR_API_TOKEN>`
        );
        
        res.json({ imageUrls: result.data.items });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while generating the image' });
    }
});

// Start the backend server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
