import type { BookId, QuizChoiceKey } from '../data/museumData';

export interface QuizScores {
  'harry-potter': number;
  'jardin-papillons': number;
  'arpenteurs-monde': number;
}

export interface QuizState {
  currentQuestionIndex: number;
  scores: QuizScores;
  answers: QuizChoiceKey[];
  lastChoice: QuizChoiceKey | null;
  completed: boolean;
  winningBookId: BookId | null;
}

const CHOICE_TO_BOOK: Record<QuizChoiceKey, BookId> = {
  A: 'harry-potter',
  B: 'jardin-papillons',
  C: 'arpenteurs-monde'
};

const ROOM_PRIORITY: BookId[] = [
  'harry-potter',
  'jardin-papillons',
  'arpenteurs-monde'
];

export function createInitialQuizState(): QuizState {
  return {
    currentQuestionIndex: 0,
    scores: {
      'harry-potter': 0,
      'jardin-papillons': 0,
      'arpenteurs-monde': 0
    },
    answers: [],
    lastChoice: null,
    completed: false,
    winningBookId: null
  };
}

export function determineWinningBookId(
  scores: QuizScores,
  lastChoice: QuizChoiceKey | null
): BookId {
  const maxScore = Math.max(
    scores['harry-potter'],
    scores['jardin-papillons'],
    scores['arpenteurs-monde']
  );

  const tiedLeaders = ROOM_PRIORITY.filter(
    (bookId) => scores[bookId] === maxScore
  );

  if (tiedLeaders.length === 1) {
    return tiedLeaders[0];
  }

  if (lastChoice) {
    const lastBookId = CHOICE_TO_BOOK[lastChoice];
    if (tiedLeaders.includes(lastBookId)) {
      return lastBookId;
    }
  }

  return tiedLeaders[0];
}

export function applyAnswer(
  state: QuizState,
  choice: QuizChoiceKey,
  totalQuestions: number = 3
): QuizState {
  if (state.completed) {
    return state;
  }

  const targetBook = CHOICE_TO_BOOK[choice];
  const updatedScores: QuizScores = {
    ...state.scores,
    [targetBook]: state.scores[targetBook] + 1
  };
  const updatedAnswers = [...state.answers, choice];
  const nextIndex = state.currentQuestionIndex + 1;
  const isCompleted = nextIndex >= totalQuestions;

  return {
    currentQuestionIndex: isCompleted ? state.currentQuestionIndex : nextIndex,
    scores: updatedScores,
    answers: updatedAnswers,
    lastChoice: choice,
    completed: isCompleted,
    winningBookId: isCompleted
      ? determineWinningBookId(updatedScores, choice)
      : null
  };
}

export function formatFrenchRating(rating: number): string {
  return `${rating.toFixed(1).replace('.', ',')} / 5`;
}
