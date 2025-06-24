import { NextResponse } from 'next/server'
import { generateLearningPlan } from '@/lib/openai'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { prompt } = body

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: '無効なプロンプトです' }, { status: 400 })
    }

    const result = await generateLearningPlan(prompt)

    return NextResponse.json({ result })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'AIプランの生成に失敗しました' }, { status: 500 })
  }
}
