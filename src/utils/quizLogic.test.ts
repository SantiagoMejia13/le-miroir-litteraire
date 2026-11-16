import test from 'node:test';
import assert from 'node:assert/strict';
import {
  applyAnswer,
  createInitialQuizState,
  determineWinningBookId,
  formatFrenchRating
} from './quizLogic';

test('createInitialQuizState initializes zeroed scores and question 0', () => {
  const state = createInitialQuizState();
  assert.equal(state.currentQuestionIndex, 0);
  assert.equal(state.completed, false);
  assert.equal(state.winningBookId, null);
  assert.deepEqual(state.scores, {
    'harry-potter': 0,
    'jardin-papillons': 0,
    'arpenteurs-monde': 0
  });
});

test('applyAnswer advances through 3 questions and selects clear winner', () => {
  let state = createInitialQuizState();
  state = applyAnswer(state, 'B');
  assert.equal(state.currentQuestionIndex, 1);
  assert.equal(state.completed, false);

  state = applyAnswer(state, 'A');
  assert.equal(state.currentQuestionIndex, 2);
  assert.equal(state.completed, false);

  state = applyAnswer(state, 'B');
  assert.equal(state.completed, true);
  assert.equal(state.winningBookId, 'jardin-papillons');
  assert.equal(state.scores['jardin-papillons'], 2);
  assert.equal(state.scores['harry-potter'], 1);
});

test('applyAnswer handles all-C sequence for Les Arpenteurs du Monde', () => {
  let state = createInitialQuizState();
  state = applyAnswer(state, 'C');
  state = applyAnswer(state, 'C');
  state = applyAnswer(state, 'C');
  assert.equal(state.completed, true);
  assert.equal(state.winningBookId, 'arpenteurs-monde');
});

test('determineWinningBookId resolves 3-way tie cleanly using last answered choice', () => {
  const scores = {
    'harry-potter': 1,
    'jardin-papillons': 1,
    'arpenteurs-monde': 1
  };
  assert.equal(determineWinningBookId(scores, 'C'), 'arpenteurs-monde');
  assert.equal(determineWinningBookId(scores, 'B'), 'jardin-papillons');
  assert.equal(determineWinningBookId(scores, 'A'), 'harry-potter');
});

test('determineWinningBookId falls back to room priority when lastChoice is null or not tied', () => {
  const scores = {
    'harry-potter': 1,
    'jardin-papillons': 1,
    'arpenteurs-monde': 0
  };
  assert.equal(determineWinningBookId(scores, 'C'), 'harry-potter');
  assert.equal(determineWinningBookId(scores, null), 'harry-potter');
});

test('formatFrenchRating uses French decimal comma', () => {
  assert.equal(formatFrenchRating(4.6), '4,6 / 5');
  assert.equal(formatFrenchRating(4.1), '4,1 / 5');
  assert.equal(formatFrenchRating(3.9), '3,9 / 5');
});
