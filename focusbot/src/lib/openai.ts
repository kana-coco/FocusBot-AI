// lib/openai.ts
import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // サーバー側のみ使用
})

export async function generateLearningPlan(prompt: string) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4', // 必要に応じて 'gpt-3.5-turbo' でもOK
      messages: [
        {
          role: 'system',
          content: 'あなたはプロの学習コーチであり、さまざまな試験対策講師です。また、キャリア戦略に強いIT業界出身のコーチです。5年後に年収1000万を超えるキャリアの選択ができるようにおすすめの資格の提案や優先してやるべきことなどを相談者に明確に提示してください。また、与えられた情報から最適な学習プランや転職に向けた準備を作成してください。',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
    })

    return response.choices[0].message.content
  } catch (error) {
    console.error('OpenAI API error:', error)
    throw new Error('学習プランの生成に失敗しました。')
  }
}
