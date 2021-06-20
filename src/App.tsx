import React, { useContext } from 'react';
import { AppContext } from './context';

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
      <h2>Flicker Gallery</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {currentPhotos.map((photoItem) => {
          return (
            <div
              key={photoItem.id + photoItem.secret}
              style={{
                border: '1px solid red',
                margin: '.5rem',
                height: '5rem',
                width: '30%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <span>{photoItem.id + photoItem.secret}</span>&nbsp;
            </div>
          );
        })}
      </div>
      <button onClick={() => handleDispatch()}>Get More Photos</button>
    </>
  );
}

export default App;
