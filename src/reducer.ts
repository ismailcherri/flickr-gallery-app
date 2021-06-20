import { FlickrRequest } from './model/flickr-request';
import { Photo } from './model/flickr-response';
import { InitialState } from './context';

export type Action =
  | { type: 'LOAD_IMAGES'; payload: FlickrRequest }
  | { type: 'LOADING'; payload: boolean }
  | { type: 'ERROR'; payload: boolean }
  | {
      type: 'IMAGES_LOADED';
      payload: { photos: Photo[] };
    }
  | {
      type: 'UPDATE_PHOTO_IDS';
      payload: { photoIds: { [key: string]: string }; photos: Photo[] };
    };

export const reducer = (state: InitialState, action: Action) => {
  if (action.type === 'LOAD_IMAGES') {
    return {
      ...state,
      isLoading: true,
      isError: false,
      params: action.payload,
    };
  }

  if (action.type === 'IMAGES_LOADED') {
    return {
      ...state,
      photos: action.payload.photos,
      isLoading: false,
    };
  }

  if (action.type === 'UPDATE_PHOTO_IDS') {
    return {
      ...state,
      photoIds: action.payload.photoIds,
      currentPhotos: [...state.currentPhotos, ...action.payload.photos],
    };
  }

  if (action.type === 'LOADING') {
    return {
      ...state,
      isLoading: action.payload,
    };
  }

  if (action.type === 'ERROR') {
    return {
      ...state,
      isError: action.payload,
    };
  }

  throw new Error('invalid actions');
};
