import { createContext, Dispatch, FC, useEffect, useReducer } from 'react';
import { Photo } from './model/flickr-response';
import { FlickrRequest } from './model/flickr-request';
import { fromParams } from './helper/query-builder';
import { Action, reducer } from './reducer';
import { getRecentPhotos } from './api/get-recent-photos';

export type InitialState = {
  isLoading: boolean;
  isError: boolean;
  photos: Photo[];
  photoIds: { [key: string]: string };
  currentPhotos: Photo[];
  favoritePhotos: Photo[];
  params: FlickrRequest;
};

const initialState: InitialState = {
  isLoading: false,
  isError: false,
  photos: [],
  photoIds: {},
  currentPhotos: [],
  favoritePhotos: [],
  params: fromParams({ page: 1 }),
};
export const AppContext = createContext<{
  state: InitialState;
  dispatch: Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export const AppProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    getRecentPhotos(state.params).then((flickerResponse) => {
      if (!flickerResponse?.photos?.photo) {
        return;
      }

      dispatch({
        type: 'IMAGES_LOADED',
        payload: { photos: flickerResponse.photos.photo },
      });
    });
  }, [state.params]);

  useEffect(() => {
    const photos = state.photos;
    const photoIds = state.photoIds;
    const photosToAdd: Photo[] = [];

    photos.forEach((photo) => {
      if (photoIds[photo.id]) {
        return;
      }

      photoIds[photo.id] = photo.id;
      photosToAdd.push(photo);
    });

    dispatch({
      type: 'UPDATE_PHOTO_IDS',
      payload: { photos: photosToAdd, photoIds: photoIds },
    });
  }, [state.photos, state.photoIds]);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
