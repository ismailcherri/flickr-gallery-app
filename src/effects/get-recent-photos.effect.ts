import { useContext, useEffect } from 'react';
import { getRecentPhotos } from '../api/get-recent-photos';
import { AppContext } from '../context';

export default function useGetRecentPhotos() {
  const { state, dispatch } = useContext(AppContext);
  const { params } = state;
  useEffect(() => {
    getRecentPhotos(params).then((flickerResponse) => {
      if (!flickerResponse?.photos?.photo) {
        return;
      }

      dispatch({
        type: 'IMAGES_LOADED',
        payload: { photos: flickerResponse.photos.photo },
      });
    });
  }, [params, dispatch]);
}
