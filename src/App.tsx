import React, { useContext } from 'react';
import { AppContext } from './context';
import { PhotoComponent } from './components/photo';
import style from './app.module.css';
import InfiniteScrollComponent from './components/infinite-scroll';

function App() {
  const { state } = useContext(AppContext);
  const { currentPhotos } = state;

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
