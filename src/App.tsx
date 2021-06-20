import React, { useContext } from 'react';
import { AppContext } from './context';
import { Photo } from './model/flickr-response';

function App() {
  const { state, dispatch } = useContext(AppContext);
  const { params, currentPhotos } = state;

  const handleDispatch = () => {
    const newParams = { ...params };
    newParams.page = newParams.page ? newParams.page + 1 : 1;
    dispatch({ type: 'LOAD_IMAGES', payload: newParams });
  };

  const handleFavorite = (photo: Photo) => {
    if (!photo.favorite) {
      dispatch({ type: 'ADD_TO_FAVORITES', payload: { photo } });
      return;
    }
    dispatch({ type: 'REMOTE_FROM_FAVORITES', payload: { photo } });
  };

  return (
    <>
      <h2>Flicker Gallery</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {currentPhotos.map((photoItem) => {
          return (
            <div
              key={photoItem.id}
              onClick={() => handleFavorite(photoItem)}
              style={{
                border: '1px solid red',
                margin: '.5rem',
                height: '5rem',
                width: '30%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: photoItem.favorite ? 'yellow' : '',
                cursor: 'pointer',
              }}
            >
              <span>{photoItem.title}</span>
            </div>
          );
        })}
      </div>
      <button onClick={() => handleDispatch()}>Get More Photos</button>
    </>
  );
}

export default App;
