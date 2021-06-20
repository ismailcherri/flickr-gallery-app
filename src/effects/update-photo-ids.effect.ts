import { useContext, useEffect } from 'react';
import { AppContext } from '../context';
import { Photo } from '../model/flickr-response';

export default function useUpdatePhotoIds() {
  const { state, dispatch } = useContext(AppContext);
  const { photos, photoIds } = state;
  useEffect(() => {
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
  }, [photos, photoIds, dispatch]);
}
