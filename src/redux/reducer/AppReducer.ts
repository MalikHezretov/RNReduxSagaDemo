import AppState from '../state/AppState';
import { iDataState } from '../state/IState';
import IAction from '../action/IAction';
import AppAction from '../action/AppAction';
import { Transactions } from '../../model/transaction/Transaction';
import UtilAction from '../action/UtilAction';

export default class AppReducer {
  private static readonly _initialState: AppState = {
    transactions: [],
    state: iDataState.initial,
    errorMessage: '',
  };

  public static reducer(
    state: AppState = AppReducer._initialState,
    action: IAction<any, Transactions>,
  ): AppState {
    switch (action.type) {
      case AppAction.GET_TRANSACTIONS:
        return {
          ...state,
          state: iDataState.loading,
          errorMessage: '',
        };

      case AppAction.LOAD_TRANSACTIONS:
        return {
          ...state,
          transactions: action.data !== null ? action.data! : [],
          state: iDataState.loaded,
          errorMessage: '',
        };

      case AppAction.SHOW_TRANSACTION_LIST:
        return {
          ...state,
          state: iDataState.loaded,
        };

      case AppAction.SHOW_TRANSACTION_DETAIL:
        return {
          ...state,
          state: iDataState.loading,
          errorMessage: '',
        };

      case UtilAction.ERROR:
        return {
          ...state,
          state: iDataState.error,
          errorMessage: action.error,
        };
      default:
        return state;
    }
  }
}
