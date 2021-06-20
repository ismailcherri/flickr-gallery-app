import React, { useContext } from 'react';
import { AppContext } from './context';
import { PhotoComponent } from './components/photo';
import style from './app.module.css';

function App() {
  const { state, dispatch } = useContext(AppContext);
  const { params, currentPhotos } = state;

  const handleDispatch = () => {
    const newParams = { ...params };
    newParams.page = newParams.page ? newParams.page + 1 : 1;
    dispatch({ type: 'LOAD_IMAGES', payload: newParams });
  };

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

      <button onClick={() => handleDispatch()}>Get More Photos</button>
    </>
  );
}

export default App;
