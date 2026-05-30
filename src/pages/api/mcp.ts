import type { NextApiRequest, NextApiResponse } from 'next';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { mcpServer } from '@/lib/mcp';

// Global map to hold active transports by session ID
const transports = new Map<string, SSEServerTransport>();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Allow cross-origin requests from AI clients
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    // 1. Establish SSE Connection
    try {
      const transport = new SSEServerTransport('/api/mcp', res);
      await mcpServer.connect(transport);

      // Store transport so POST requests can find it
      transports.set(transport.sessionId, transport);

      // Handle client disconnect
      req.on('close', () => {
        transports.delete(transport.sessionId);
      });

      // Keep connection open (do not call res.end())
      return;
    } catch (error) {
      console.error('Failed to establish SSE connection', error);
      return res.status(500).json({ error: 'Failed to establish SSE connection' });
    }
  }

  if (req.method === 'POST') {
    // 2. Handle incoming JSON-RPC messages via POST
    const sessionId = req.query.sessionId as string;

    if (!sessionId) {
      return res.status(400).json({ error: 'Missing sessionId query parameter' });
    }

    const transport = transports.get(sessionId);

    if (!transport) {
      return res.status(404).json({ error: 'Session not found. Connect via GET /api/mcp first.' });
    }

    try {
      await transport.handlePostMessage(req, res);
      // handlePostMessage automatically calls res.writeHead and res.end
      return;
    } catch (error) {
      console.error('Error handling POST message:', error);
      if (!res.headersSent) {
        return res.status(500).json({ error: 'Internal Server Error processing MCP message' });
      }
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
