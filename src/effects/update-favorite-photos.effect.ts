import { useContext, useEffect } from 'react';
import { AppContext } from '../context';
import { getStoredFavorites, storeFavorites } from '../helper/local-storage';

export default function useUpdateFavoritePhotos() {
  const { state, dispatch } = useContext(AppContext);
  const { favoritePhotos } = state;
  useEffect(() => {
    if (favoritePhotos.length === 0) {
      const photos = getStoredFavorites();

      if (!photos || photos.length === 0) {
        return;
      }
    }

    storeFavorites(favoritePhotos);
  }, [favoritePhotos, dispatch]);
}
