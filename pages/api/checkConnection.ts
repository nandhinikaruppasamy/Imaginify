import type { NextApiRequest, NextApiResponse } from 'next';
import {connectToDatabase} from '../../lib/database/mongoose';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connectToDatabase();
        res.status(200).json({ message: 'MongoDB is connected successfully' });
    } catch (error) {
        console.error('MongoDB connection error:', error);
        res.status(500).json({ error: 'Failed to connect to MongoDB' });
    }
}
