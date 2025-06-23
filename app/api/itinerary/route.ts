import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OpenAI API key in environment variables');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful travel planner. Based on the trip info below, create a detailed day-by-day itinerary. Include for each day: - Date - Activities - Meal suggestions - Travel tips Format the response like this: Day 1: - Morning: ... - Afternoon: ... - Evening: ...',
        },
        {
          role: 'user',
          content: `Plan a trip based on this info: ${JSON.stringify(body)}`,
        },
      ],
    });

    return NextResponse.json({ itinerary: response.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { error: 'Something went wrong processing your request.' },
      { status: 500 }
    );
  }
}
