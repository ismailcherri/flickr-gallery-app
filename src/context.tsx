import { createContext, Dispatch, FC, useReducer } from 'react';
import { Photo } from './model/flickr-response';
import { FlickrRequest } from './model/flickr-request';
import { fromParams } from './helper/query-builder';
import { Action, reducer } from './reducer';

export type InitialState = {
  isLoading: boolean;
  isError: boolean;
  photos: Photo[];
  photoIds: { [key: string]: string };
  params: FlickrRequest;
};

const initialState: InitialState = {
  isLoading: false,
  isError: false,
  photos: [],
  photoIds: {},
  params: fromParams({ page: 0 }),
};
export const AppContext = createContext<{
  state: InitialState;
  dispatch: Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export const AppProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
