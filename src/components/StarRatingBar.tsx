import { useId } from 'react';
import { formatFrenchRating } from '../utils/quizLogic';

interface StarRatingBarProps {
  rating: number;
  bookTitle?: string;
  caption?: string;
  align?: 'center' | 'left';
}

export function StarRatingBar({
  rating,
  bookTitle,
  caption = 'Note moyenne des lecteurs sur Internet',
  align = 'center'
}: StarRatingBarProps) {
  const baseId = useId();

  return (
    <div
      className={`flex flex-col gap-1.5 ${
        align === 'center' ? 'items-center text-center' : 'items-start text-left'
      }`}
    >
      <div
        className="flex items-center gap-2.5"
        role="img"
        aria-label={`Note de ${formatFrenchRating(rating)} étoiles`}
      >
        <div className="flex items-center gap-1">
          {[0, 1, 2, 3, 4].map((index) => {
            const fillFraction = Math.max(0, Math.min(1, rating - index));
            const gradId = `${baseId}-star-${index}`;
            const pct = Math.round(fillFraction * 100);

            return (
              <svg
                key={index}
                viewBox="0 0 24 24"
                className="w-5 h-5 shrink-0"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset={`${pct}%`} stopColor="#D4A017" />
                    <stop offset={`${pct}%`} stopColor="rgba(148, 163, 184, 0.35)" />
                  </linearGradient>
                </defs>
                <path
                  d="M12 2.25l2.92 5.91 6.52.95-4.72 4.6 1.11 6.49L12 17.13l-5.83 3.07 1.11-6.49-4.72-4.6 6.52-.95L12 2.25z"
                  fill={`url(#${gradId})`}
                  stroke="#B8860B"
                  strokeOpacity="0.45"
                  strokeWidth="0.9"
                />
              </svg>
            );
          })}
        </div>
        <span className="text-sm font-semibold tabular-nums text-[#113320] dark:text-[#c2ffb4]">
          {formatFrenchRating(rating)}
        </span>
      </div>

      {bookTitle && (
        <p className="font-serif text-base font-medium text-[#113320] dark:text-[#F1F5F3]">
          {bookTitle}
        </p>
      )}
      <p className="text-xs tracking-wide text-[#113320]/70 dark:text-[#F1F5F3]/70">
        {caption}
      </p>
    </div>
  );
}
