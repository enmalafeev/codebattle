import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import { GameTypes as Types } from './Actions';
import GameStatusCodes from '../config/gameStatusCodes';
import i18n from '../../i18n';

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  gameStatus: {
    status: GameStatusCodes.initial,
    winner: {},
    checking: false,
    solutionStatus: null,
  },
  task: null,
  langs: null,
});

/* ------------- Reducers ------------- */

// FIXME: validate recieved status
const updateStatus = (state, { gameStatus }) =>
  state.merge({ gameStatus }, { deep: true });

const setTask = (state, { task }) => state.merge({ task });

const setLangs = (state, { langs }) => state.merge({ langs });

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_STATUS]: updateStatus,
  [Types.SET_TASK]: setTask,
  [Types.SET_LANGS]: setLangs,
});

/* ------------- Selectors ------------- */

export const gameStatusSelector = state => state.gameStatus.gameStatus;

export const gameStatusTitleSelector = (state) => {
  const gameStatus = gameStatusSelector(state);
  switch (gameStatus.status) {
    case GameStatusCodes.waitingOpponent:
      return i18n
        .t('State: {{state}}', { state: i18n.t('Waiting opponent') });
    case GameStatusCodes.playing:
      return i18n
        .t('State: {{state}}', { state: i18n.t('Playing') });
    case GameStatusCodes.playerWon:
      return i18n
        .t('The winner is: {{name}}', { name: gameStatus.winner.name });
    case GameStatusCodes.gameOver:
      return i18n
        .t('Game over. The winner is: {{name}}', { name: gameStatus.winner.name });
    default:
      return '';
  }
};

// FIXME: rename first-level "gameStatus" to "game"
export const gameTaskSelector = state => state.gameStatus.task;

export const gameLangsSelector = state => state.langs;