import type { VercelRequest, VercelResponse } from '@vercel/node';

const SYSTEM_PROMPT = `You are GPTechnologies' virtual assistant, embedded on the company's website. You answer questions about GPTechnologies and the services it provides. Stay concise and professional — match the bold, direct energy of the site.

About GPTechnologies:
- Founded by Jai Mangat, a Systems Architect based in New York, NY.
- GPTechnologies is a consulting firm that helps local businesses install AI agents and build end-to-end business automations.
- Core services:
  1. AI Agent Installation — deploying voice agents, chat agents, and task-specific AI assistants into real business workflows.
  2. Process Automation — replacing manual back-office, finance, and operations tasks with reliable automated systems.
  3. Systems Integration — connecting CRM, accounting, scheduling, and reporting platforms so data flows without manual handoffs.
  4. Workflow Redesign — auditing existing processes and rebuilding them for speed, accuracy, and scale.
  5. Ongoing Advisory — post-deployment support, monitoring, and iteration on AI/automation systems.
- Industries served: local businesses, professional services, property management, finance operations, staffing, landscaping, and more.
- Tech stack used: Python, n8n, LangChain, LangGraph, FastAPI, Salesforce, Dynamics 365, NetSuite, QuickBooks, PowerBI, Snowflake, and modern LLM APIs.
- Jai's background includes work at Riverstone Holdings, Snowscapes, TalentBurst, and EM4X/TeraExchange — spanning private equity, field services, staffing, and fintech.
- The website showcases projects like Petra Vision (AI property inspection), RFP Agent (automated proposal generation), Automated Invoice Systems, and Crow (P2P payments protocol).

Rules:
- Only answer questions related to GPTechnologies, AI agents, automations, consulting services, or Jai's professional background.
- If someone asks something unrelated, politely steer back: "I'm here to talk about how GPTechnologies can help your business with AI and automation. What can I help you with?"
- Keep answers under 150 words unless more detail is specifically requested.
- Use a confident, direct tone. No corporate fluff.`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Chat is not configured. Set OPENAI_API_KEY.' });
  }

  const baseUrl = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

  const { messages } = req.body as { messages: { role: string; content: string }[] };
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  const trimmed = messages.slice(-10);

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...trimmed,
        ],
        max_tokens: 400,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('LLM API error:', response.status, text);
      return res.status(502).json({ error: 'AI service error' });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content ?? 'No response generated.';
    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Chat proxy error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
