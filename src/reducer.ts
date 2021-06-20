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
    }
  | { type: 'ADD_TO_FAVORITES'; payload: { photo: Photo } }
  | { type: 'REMOTE_FROM_FAVORITES'; payload: { photo: Photo } }
  | { type: 'LOAD_FAVORITES'; payload: { photos: Photo[] } };

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

  if (action.type === 'ADD_TO_FAVORITES') {
    action.payload.photo.favorite = true;
    return {
      ...state,
      favoritePhotos: [...state.favoritePhotos, action.payload.photo],
    };
  }

  if (action.type === 'REMOTE_FROM_FAVORITES') {
    const newFavorites = state.favoritePhotos.filter(
      (photo) => photo.id !== action.payload.photo.id,
    );
    const currentPhotos = state.currentPhotos.map((photo) => {
      if (photo.id === action.payload.photo.id) {
        photo.favorite = false;
      }
      return photo;
    });
    return {
      ...state,
      favoritePhotos: newFavorites,
      currentPhotos: currentPhotos,
    };
  }

  if (action.type === 'LOAD_FAVORITES') {
    return {
      ...state,
      favoritePhotos: action.payload.photos,
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
