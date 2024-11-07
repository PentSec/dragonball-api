import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';
import { Character } from '../../types';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); 
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const filePath = path.join(process.cwd(), 'data', 'characters.json');
    const jsonData: Character[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    const { characters, category, origin, debut, id } = req.query;
    let filteredData = jsonData;

    if (typeof id === 'string') {
        const character = filteredData.find(char => char.id === parseInt(id, 10));
        if (character) {
            return res.status(200).json(character);
        } else {
            return res.status(404).json({ message: 'Character not found with the provided ID' });
        }
    }

    if (typeof characters === 'string') {
        filteredData = filteredData.filter(char =>
            char.name.toLowerCase().includes(characters.toLowerCase())
        );
    }

    if (typeof category === 'string') {
        filteredData = filteredData.filter(char =>
            char.category.toLowerCase() === category.toLowerCase()
        );
    }

    if (typeof origin === 'string') {
        filteredData = filteredData.filter(char =>
            char.origin.toLowerCase() === origin.toLowerCase()
        );
    }

    if (typeof debut === 'string') {
        filteredData = filteredData.filter(char =>
            char.debut.arc?.toLowerCase().includes(debut.toLowerCase())
        );
    }

    if (filteredData.length > 0) {
        return res.status(200).json(filteredData);
    } else {
        return res.status(404).json({ message: 'No characters found matching the filters' });
    }
}
