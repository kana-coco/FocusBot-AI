'use client'

import { useState } from 'react'
import axios from 'axios'

export default function PlannerPage() {
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [validationError, setValidationError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult('')
    setValidationError('')

    // 🔸 バリデーションチェック
    if (!prompt.trim()) {
        setValidationError('入力が空です。学習の目的を入力してください。')
        return
      }
      if (prompt.length < 10) {
        setValidationError('10文字以上で具体的に記入してください。')
        return
      }
      if (prompt.length > 300) {
        setValidationError('300文字以内に収めてください。')
        return
      }
  
      setLoading(true)

    try {
      const res = await axios.post('/api/gpt', { prompt })  //フルパス指定せずとも Next.jsが内部でマッピングしてくれる
      setResult(res.data.result)
    } catch (err: any) {
      setError('AIのプラン生成に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">学習プラン生成</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="例：2ヶ月でTOEICスコアを200点伸ばしたい"
          className="w-full border rounded p-2"
          rows={4}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? '生成中...' : 'プラン生成'}
        </button>
        {/* バリデーションエラー表示 */}
        {validationError && <p className="text-yellow-600">{validationError}</p>}
      </form>

      {/* サーバーエラー */}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {/* AI生成結果表示 */}
      {result && (
        <div className="mt-6 border p-4 rounded bg-gray-50 whitespace-pre-wrap">
          <h2 className="font-semibold mb-2">AI生成プラン：</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  )
}
