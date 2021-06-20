import React, { useContext, useEffect, useMemo } from 'react';
import { AppContext } from './context';
import { getRecentPhotos } from './api/get-recent-photos';
import { Photo } from './model/flickr-response';

function App() {
  const { state, dispatch } = useContext(AppContext);
  const { photoIds, params, photos } = state;

  const addPhotos = useMemo(
    () => (apiPhotos: Photo[]) => {
      const newPhotos: Photo[] = [];
      const newPhotoIds = { ...photoIds };
      apiPhotos.forEach((item) => {
        if (newPhotoIds[item.id]) {
          return;
        }
        newPhotoIds[item.id] = item.id;
        newPhotos.push(item);
      });

      //dispatch({ type: 'UPDATE_PHOTO_IDS', payload: newPhotoIds });

      return { newPhotos, newPhotoIds };
    },
    [],
  );

  const handleDispatch = () => {
    if (!params.page) {
      params.page = 1;
    }
    params.page = params.page + 1;
    dispatch({ type: 'LOAD_IMAGES', payload: params });
  };

  useEffect(() => {
    getRecentPhotos(params)
      .then((flickerResponse) => {
        if (!flickerResponse?.photos?.photo) {
          return;
        }
        const { newPhotos, newPhotoIds } = addPhotos(
          flickerResponse.photos.photo,
        );
        dispatch({
          type: 'IMAGES_LOADED',
          payload: { photos: newPhotos, photoIds: newPhotoIds },
        });
        // dispatch({ type: 'UPDATE_PHOTO_IDS', payload: newPhotoIds });
      })
      .catch(() => {
        dispatch({ type: 'ERROR', payload: true });
      });
  }, [dispatch, params, params.page, addPhotos]);

  return (
    <div>
      Flicker Gallery
      {photos.map((photoItem) => {
        return (
          <div
            key={photoItem.id + photoItem.secret}
            style={{ border: '1px solid red', margin: '10px 0' }}
          >
            <span>{photoItem.id + photoItem.secret}</span>&nbsp;
          </div>
        );
      })}
      <button onClick={() => handleDispatch()}>Get More Photos</button>
    </div>
  );
}

export default App;
