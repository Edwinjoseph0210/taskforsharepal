import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

async function startServer() {
  const app = express();
  app.use(express.json());

  // API chat endpoint for SharePal AI assistant
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;
      const model = 'gemini-2.5-flash';
      
      const chat = ai.chats.create({
        model,
        history: history || [],
        config: {
          systemInstruction: 'You are Pal, the friendly AI gaming rental assistant for SharePal in Bangalore. You help users find gaming consoles (PS5, Xbox Series X/S, Nintendo Switch, Handhelds like Steam Deck, ASUS ROG Ally), VR headsets (Meta Quest 3), racing wheels (Logitech G29/G923), high-end gaming laptops, and projectors on rent. SharePal offers free 24-hr doorstep delivery, free pickup, refundable security deposits, and multi-month discounts across Bangalore (Indiranagar, Koramangala, HSR Layout, Whitefield, Jayanagar, etc.). Be helpful, concise, and enthusiastic about gaming!',
        }
      });

      const response = await chat.sendMessage({ message });
      res.json({ reply: response.text });
    } catch (error: any) {
      console.error('Gemini chat error:', error);
      res.status(500).json({ error: error.message || 'Failed to communicate with AI assistant' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  const port = Number(process.env.PORT || 3000);
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

startServer();
