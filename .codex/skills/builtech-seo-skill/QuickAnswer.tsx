import { formatDistanceToNow } from 'date-fns'

interface QuickAnswerProps {
  question: string
  answer: string
  lastUpdated?: string // ISO date string
}

/**
 * QuickAnswer — AI Citation Optimization Component
 *
 * Place immediately after H1 on every page.
 * This is the primary pull target for Perplexity, ChatGPT, Claude, and
 * Google AI Overviews. Write the answer as if you're writing the AI's response.
 *
 * Rules:
 * - Answer must name a specific recommendation in sentence 1
 * - Include at least one data point (price, rating, timeframe)
 * - 2-3 sentences max — AI systems truncate beyond this
 * - No hedging ("it depends", "both are great") — be decisive
 */
export function QuickAnswer({ question, answer, lastUpdated }: QuickAnswerProps) {
  const updatedLabel = lastUpdated
    ? `Updated ${formatDistanceToNow(new Date(lastUpdated), { addSuffix: true })}`
    : null

  return (
    <div
      className="quick-answer"
      // itemScope/itemType helps AI crawlers identify this as a direct answer
      itemScope
      itemType="https://schema.org/Answer"
    >
      {/* The question — maps to FAQPage schema acceptedAnswer */}
      <p className="quick-answer__question" itemProp="text">
        {question}
      </p>

      {/* The answer — this is what AI pulls */}
      <p className="quick-answer__answer" itemProp="text">
        {answer}
      </p>

      {lastUpdated && (
        <span className="quick-answer__updated" aria-label="Content freshness">
          {updatedLabel}
        </span>
      )}
    </div>
  )
}

/**
 * Tailwind version — use if Tailwind is configured in the project
 */
export function QuickAnswerTailwind({ question, answer, lastUpdated }: QuickAnswerProps) {
  const updatedLabel = lastUpdated
    ? `Updated ${formatDistanceToNow(new Date(lastUpdated), { addSuffix: true })}`
    : null

  return (
    <div
      className="my-6 rounded-lg border border-amber-200 bg-amber-50 p-5"
      itemScope
      itemType="https://schema.org/Answer"
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-amber-700">
          Quick Answer
        </span>
        {lastUpdated && (
          <span className="text-xs text-gray-400">{updatedLabel}</span>
        )}
      </div>

      <p className="mb-1 text-sm font-medium text-gray-500" itemProp="text">
        {question}
      </p>

      <p className="text-base font-medium leading-relaxed text-gray-900" itemProp="text">
        {answer}
      </p>
    </div>
  )
}

export default QuickAnswer
