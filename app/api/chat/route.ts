import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    // Format messages for OpenAI API: {role: 'user'|'assistant', content: string}
    const chatMessages = messages.map((m: any) => ({
      role: m.role,
      content: m.content,
    }));
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: chatMessages,
      max_tokens: 150,
    });
    const reply = completion.choices[0].message?.content || '';
    return NextResponse.json({ message: reply });
  } catch (error: any) {
    console.error('OpenAI error:', error);
    return NextResponse.json({ message: 'Entschuldigung, es gab einen Fehler.' }, { status: 500 });
  }
}