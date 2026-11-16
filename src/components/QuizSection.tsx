import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import {
  BOOKS,
  QUIZ_QUESTIONS,
  QUIZ_RESULTS,
  type BookId,
  type QuizChoiceKey
} from '../data/museumData';
import { BOOK_ARTWORK } from '../data/artworkAssets';
import { applyAnswer, createInitialQuizState } from '../utils/quizLogic';
import { FluidMirror } from './FluidMirror';

interface QuizSectionProps {
  onEnterRoom: (bookId: BookId) => void;
}

export function QuizSection({ onEnterRoom }: QuizSectionProps) {
  const [quizState, setQuizState] = useState(() => createInitialQuizState());
  const [imgError, setImgError] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[quizState.currentQuestionIndex];
  const winningResult = quizState.winningBookId
    ? QUIZ_RESULTS[quizState.winningBookId]
    : null;
  const winningBook = quizState.winningBookId
    ? BOOKS.find((b) => b.id === quizState.winningBookId) ?? null
    : null;

  const handleSelectOption = (choiceKey: QuizChoiceKey) => {
    setQuizState((prev) => applyAnswer(prev, choiceKey, QUIZ_QUESTIONS.length));
  };

  const handleReset = () => {
    setImgError(false);
    setQuizState(createInitialQuizState());
  };

  return (
    <section
      aria-labelledby="quiz-section-title"
      className="relative max-w-5xl mx-auto px-4 sm:px-8 py-8 lg:py-10"
    >
      {/* En-tête solennel de l'expérience */}
      <div className="text-center max-w-2xl mx-auto space-y-2 mb-5">
        <p className="text-xs font-medium tracking-widest text-[#268d7c] dark:text-[#c2ffb4]">
          Parcours introspectif · Le Miroir Fluide
        </p>
        <h1
          id="quiz-section-title"
          className="font-serif text-3xl sm:text-4xl font-bold text-[#113320] dark:text-[#F1F5F3] text-balance"
        >
          L’expérience interactive
        </h1>
        <p className="text-sm text-[#113320]/75 dark:text-[#F1F5F3]/75">
          Observez le miroir fluide et répondez à ces trois interrogations afin de révéler la salle littéraire qui reflète votre rapport à l’identité.
        </p>
      </div>

      {/* Miroir Fluide central */}
      <div className="relative flex flex-col items-center">
        <div className="mb-5">
          <FluidMirror
            step={quizState.answers.length}
            lastChoice={quizState.lastChoice}
            completed={quizState.completed}
          />
        </div>

        {/* Questionnaire ou Cartel final d'identité */}
        <div className="w-full max-w-3xl">
          <AnimatePresence mode="wait">
            {!quizState.completed && currentQuestion ? (
              <motion.div
                key={`question-${currentQuestion.id}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="rounded-xl border border-[#113320]/15 dark:border-[#268d7c]/50 bg-white/90 dark:bg-[#113320]/90 p-6 sm:p-10 shadow-lg"
              >
                {/* Indicateur de progression */}
                <div className="flex items-center justify-between gap-4 border-b border-[#113320]/10 dark:border-[#268d7c]/30 pb-4 mb-6">
                  <span className="text-xs font-semibold tracking-wider text-[#268d7c] dark:text-[#c2ffb4]">
                    {currentQuestion.title}
                  </span>
                  <span
                    aria-label={`Question ${quizState.currentQuestionIndex + 1} sur ${QUIZ_QUESTIONS.length}`}
                    className="text-xs font-semibold tabular-nums text-[#113320]/70 dark:text-[#F1F5F3]/80"
                  >
                    Question {quizState.currentQuestionIndex + 1} / {QUIZ_QUESTIONS.length}
                  </span>
                </div>

                {/* Barre de progression discrète */}
                <div
                  className="w-full h-1 bg-[#113320]/10 dark:bg-[#0A1C12] rounded-full overflow-hidden mb-7"
                  aria-hidden="true"
                >
                  <div
                    className="h-full bg-gradient-to-r from-[#268d7c] to-[#c2ffb4] transition-all duration-300"
                    style={{
                      width: `${((quizState.currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%`
                    }}
                  />
                </div>

                {/* Énoncé de la question */}
                <h2 className="font-serif text-2xl sm:text-[1.75rem] font-semibold leading-snug text-[#113320] dark:text-[#F1F5F3] mb-7">
                  {currentQuestion.prompt}
                </h2>

                {/* Choix A, B, C */}
                <div className="space-y-3.5" role="group" aria-label={currentQuestion.title}>
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => handleSelectOption(option.key)}
                      className="group w-full text-left p-4 sm:p-5 rounded-lg border border-[#113320]/18 dark:border-[#268d7c]/45 bg-[#F8FAF9] dark:bg-[#0A1C12]/70 hover:border-[#268d7c] dark:hover:border-[#c2ffb4] hover:bg-[#268d7c]/8 dark:hover:bg-[#268d7c]/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#268d7c] transition-all duration-200 cursor-pointer flex items-start gap-4"
                    >
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-md shrink-0 text-xs font-bold bg-[#113320] text-white dark:bg-[#268d7c] dark:text-white group-hover:bg-[#268d7c] dark:group-hover:bg-[#c2ffb4] dark:group-hover:text-[#113320] transition-colors">
                        {option.key}
                      </span>
                      <span className="text-sm sm:text-base leading-relaxed text-[#113320] dark:text-[#F1F5F3]">
                        {option.key}) {option.text}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : winningResult && winningBook ? (
              <motion.div
                key="quiz-result"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl border border-[#268d7c]/45 dark:border-[#c2ffb4]/45 bg-white/95 dark:bg-[#113320] p-6 sm:p-10 shadow-xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  {/* Vignette muséale de l'œuvre correspondante */}
                  <div className="md:col-span-4">
                    <div className="aspect-[3/4] rounded-lg overflow-hidden border border-[#113320]/20 dark:border-[#268d7c]/50 bg-[#0A1C12] relative">
                      {!imgError ? (
                        <img
                          src={BOOK_ARTWORK[winningBook.id]}
                          alt={`Œuvre associée : ${winningBook.title}`}
                          referrerPolicy="no-referrer"
                          onError={() => setImgError(true)}
                          className="w-full h-full object-cover scale-[1.08]"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#113320] to-[#0A1C12]" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1C12] via-[#0A1C12]/35 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <p className="text-[11px] font-semibold tracking-wider text-[#c2ffb4]">
                          {winningBook.roomLabel} · {winningBook.themeLabel}
                        </p>
                        <p className="font-serif text-lg font-bold leading-tight">
                          {winningBook.title}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Cartel critique de l'identité */}
                  <div className="md:col-span-8 space-y-5">
                    <div className="space-y-1 border-b border-[#113320]/12 dark:border-[#268d7c]/30 pb-4">
                      <p className="text-xs font-semibold tracking-wider text-[#268d7c] dark:text-[#c2ffb4]">
                        Cartel de votre identité littéraire
                      </p>
                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#113320] dark:text-[#F1F5F3]">
                        {winningBook.roomLabel} — {winningBook.themeLabel}
                      </h2>
                    </div>

                    <p className="font-serif text-xl sm:text-2xl italic leading-relaxed text-[#113320] dark:text-[#F1F5F3]">
                      « {winningResult.critiqueText} »
                    </p>

                    <p className="text-sm text-[#113320]/75 dark:text-[#F1F5F3]/80">
                      Œuvre de référence : <span className="font-semibold">{winningBook.title}</span> de {winningBook.author}.
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onEnterRoom(winningBook.id)}
                        className="inline-flex items-center gap-2.5 px-6 py-3 rounded-md bg-gradient-to-b from-[#268d7c] to-[#113320] text-white text-sm font-semibold shadow-sm hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#268d7c] transition-opacity cursor-pointer whitespace-nowrap"
                      >
                        <span>{winningResult.ctaLabel}</span>
                        <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                      </button>

                      <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-[#113320]/25 dark:border-[#268d7c]/60 text-[#113320] dark:text-[#c2ffb4] text-sm font-medium hover:bg-[#113320]/5 dark:hover:bg-[#0A1C12]/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#268d7c] transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <RotateCcw className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>Recommencer l’expérience</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
