import { useContext, useEffect } from 'react';
import { AppContext } from '../context';
import { getStoredFavorites } from '../helper/local-storage';

export default function useGetStoredPhotos() {
  const { state, dispatch } = useContext(AppContext);
  const { currentPhotos } = state;

  useEffect(() => {
    if (currentPhotos.length !== 0) {
      return;
    }
    const photos = getStoredFavorites();

    if (!photos || photos.length === 0) {
      return;
    }

    dispatch({
      type: 'IMAGES_LOADED',
      payload: {
        photos,
      },
    });

    dispatch({
      type: 'LOAD_FAVORITES',
      payload: {
        photos,
      },
    });
  }, [currentPhotos, dispatch]);
}
