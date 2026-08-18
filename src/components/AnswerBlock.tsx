import type { ReactNode } from 'react';

interface AnswerBlockProps {
  question: string;
  answer: ReactNode;
  source?: string;
  sourceUrl?: string;
}

export function AnswerBlock({ question, answer, source, sourceUrl }: AnswerBlockProps) {
  return (
    <section className="mb-8 rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900/50">
      <h2 className="mb-2 text-lg font-bold text-slate-900 dark:text-slate-100">{question}</h2>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{answer}</p>
      </div>
      {source && (
        <div className="mt-4 flex items-center text-sm text-slate-500 dark:text-slate-400">
          <span className="mr-2">Source:</span>
          {sourceUrl ? (
            <a href={sourceUrl} className="text-blue-600 hover:underline dark:text-blue-400">{source}</a>
          ) : (
            <span>{source}</span>
          )}
        </div>
      )}
    </section>
  );
}
