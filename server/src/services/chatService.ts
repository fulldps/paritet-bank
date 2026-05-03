import { query } from '../db/pool'

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.3-70b-versatile'

const SYSTEM_PROMPT = `Ты — виртуальный ассистент банка Paritet (Беларусь).
Твоя роль: помогать клиентам с вопросами о банковских услугах.

О банке Paritet:
- Предлагает дебетовые и виртуальные карты
- Кредиты до 30 000 BYN на любые цели
- Вклады в BYN, RUB, USD с оформлением онлайн
- P2P переводы в более 60 стран мира
- Выгодный обмен валют (iParitet)
- Онлайн-обслуживание без визита в офис

Правила общения:
- Отвечай только на русском языке
- Будь вежливым и профессиональным
- Отвечай кратко (2-4 предложения если не нужно подробнее)
- Если вопрос не по теме банка — мягко перенаправь
- Не придумывай конкретные цифры по ставкам — говори "уточните на сайте"
- По вопросам курсов валют — пользователь может проверить актуальный курс на странице "Курсы валют"

Если не знаешь ответа — скажи честно и предложи позвонить на горячую линию.`

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export const sendChatMessage = async (sessionId: string, userMessage: string): Promise<string> => {
  // Получаем историю последних 10 сообщений из БД
  const historyResult = await query<{ role: string; content: string }>(
    `SELECT role, content FROM chat_messages
     WHERE session_id = $1
     ORDER BY created_at DESC
     LIMIT 10`,
    [sessionId],
  )
  const history = historyResult.rows.reverse() as ChatMessage[]

  // Сохраняем сообщение пользователя
  await query(`INSERT INTO chat_messages (session_id, role, content) VALUES ($1, 'user', $2)`, [
    sessionId,
    userMessage,
  ])

  const messages: ChatMessage[] = [...history, { role: 'user', content: userMessage }]

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      max_tokens: 512,
      temperature: 0.7,
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`Groq API error: ${response.status} — ${err}`)
  }

  const data = await response.json()
  const assistantMessage: string = data.choices[0].message.content

  // Сохраняем ответ ассистента
  await query(
    `INSERT INTO chat_messages (session_id, role, content) VALUES ($1, 'assistant', $2)`,
    [sessionId, assistantMessage],
  )

  return assistantMessage
}

export const getChatHistory = async (sessionId: string): Promise<ChatMessage[]> => {
  const result = await query<ChatMessage>(
    `SELECT role, content FROM chat_messages
     WHERE session_id = $1
     ORDER BY created_at ASC`,
    [sessionId],
  )
  return result.rows
}
