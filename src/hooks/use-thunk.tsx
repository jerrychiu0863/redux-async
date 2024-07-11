import { SerializedError, AsyncThunkAction, ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

type AsyncThunkActionCreator<R, T> = (arg: T) => AsyncThunkAction<R, T, object>;

function useThunk<R, T>(
  thunk: AsyncThunkActionCreator<R, T>,

): [(arg: T) => Promise<unknown>, boolean, SerializedError | null] {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<SerializedError | null>(null);
  const dispatch = useDispatch<ThunkDispatch<object, object, AnyAction>>();

  const runThunk = useCallback((arg: T) => {
    setIsLoading(true);
    // dispatch thunk function returns a promise that doesn't work in tradiontional way
    // using unwrap to return a new promise that can use then and catch methods
    return dispatch(thunk(arg))
      .unwrap()
      .catch(e => setError(e))
      .finally(() => setIsLoading(false));
  }, [dispatch, thunk]);

  return [runThunk, isLoading, error];
}

export { useThunk };