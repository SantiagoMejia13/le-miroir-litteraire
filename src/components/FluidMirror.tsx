import type { QuizChoiceKey } from '../data/museumData';

interface FluidMirrorProps {
  step: number;
  lastChoice: QuizChoiceKey | null;
  completed: boolean;
}

export function FluidMirror({ step, lastChoice, completed }: FluidMirrorProps) {
  const rotationDeg = step * 35 + (completed ? 45 : 0);
  const scaleFactor = completed ? 1.06 : 1 + step * 0.025;

  const accentTint =
    lastChoice === 'A'
      ? '#268d7c'
      : lastChoice === 'B'
      ? '#c2ffb4'
      : lastChoice === 'C'
      ? '#1b6b5c'
      : '#268d7c';

  return (
    <div
      data-testid="fluid-mirror"
      aria-hidden="true"
      className="relative flex items-center justify-center w-52 h-52 sm:w-60 sm:h-60 mx-auto select-none pointer-events-none"
    >
      {/* Filtre SVG Gooey (feGaussianBlur + feColorMatrix) */}
      <svg className="absolute w-0 h-0" focusable="false">
        <defs>
          <filter id="miroir-fluide-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Halo extérieur discret du miroir */}
      <div
        className="absolute inset-1.5 rounded-full border border-[#268d7c]/35 dark:border-[#c2ffb4]/30 transition-transform duration-700 ease-out"
        style={{ transform: `rotate(${rotationDeg}deg) scale(${scaleFactor})` }}
      />
      <div className="absolute inset-4 rounded-full border border-[#113320]/20 dark:border-[#268d7c]/40" />

      {/* Surface du Miroir Fluide */}
      <div
        className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-full overflow-hidden bg-[#0A1C12] border-2 border-[#268d7c]/60 dark:border-[#c2ffb4]/50 shadow-2xl transition-transform duration-700 ease-out"
        style={{ transform: `scale(${scaleFactor})` }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center transition-transform duration-700"
          style={{
            filter: 'url(#miroir-fluide-goo)',
            transform: `rotate(${rotationDeg}deg)`
          }}
        >
          <div className="mirror-blob-a absolute w-32 h-32 rounded-full bg-[#113320]" />
          <div
            className="mirror-blob-b absolute w-28 h-28 rounded-full transition-colors duration-700"
            style={{ backgroundColor: accentTint }}
          />
          <div className="mirror-blob-c absolute w-20 h-20 rounded-full bg-[#c2ffb4]/80" />
          <div className="mirror-blob-a absolute w-24 h-24 rounded-full bg-[#268d7c]/90" />
        </div>

        {/* Reflet vitreux du miroir */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#0A1C12]/40 via-transparent to-white/15" />
      </div>
    </div>
  );
}
