import { combineReducers } from 'redux';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import setSortMethod from '../reducers/setSortMethod';
import setDataSet from '../reducers/setDataSet';
import setFilterMethod from '../reducers/setFilterMethod';

const reducer = combineReducers({
  dataSet: setDataSet,
  sortMethod: setSortMethod,
  filters: setFilterMethod
})

export const store = configureStore({ reducer });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
