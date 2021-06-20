import React, { useContext } from 'react';
import { AppContext } from './context';
import { PhotoComponent } from './components/photo';
import style from './app.module.css';
import InfiniteScrollComponent from './components/infinite-scroll';
import useGetRecentPhotos from './effects/get-recent-photos.effect';
import useUpdatePhotoIds from './effects/update-photo-ids.effect';
import useGetStoredPhotos from './effects/get-stored-photos.effect';
import useUpdateFavoritePhotos from './effects/update-favorite-photos.effect';

function App() {
  const { state } = useContext(AppContext);
  const { currentPhotos } = state;

  useGetRecentPhotos();
  useUpdatePhotoIds();
  useGetStoredPhotos();
  useUpdateFavoritePhotos();

  return (
    <>
      <div className={style.main}>
        <h2>Flicker Gallery</h2>
        <div className={style.photoContainer}>
          {currentPhotos.map((photoItem) => {
            return <PhotoComponent photo={photoItem} key={photoItem.id} />;
          })}
        </div>
      </div>

      <InfiniteScrollComponent />
    </>
  );
}

export default App;
