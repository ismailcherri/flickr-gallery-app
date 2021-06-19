import React from 'react';
import { useGetRecentPhotosEffect } from './api/get-recent-photos';
import { fromParams } from './helper/query-builder';

function App() {
  const { photo, isLoading } = useGetRecentPhotosEffect(
    fromParams({ per_page: 20 }),
  );
  return (
    <div>
      Flicker Gallery
      {!isLoading &&
        photo.map((photoItem) => {
          return (
            <div
              key={photoItem.id}
              style={{ border: '1px solid red', margin: '10px 0' }}
            >
              <span>{photoItem.owner}</span>&nbsp;
            </div>
          );
        })}
    </div>
  );
}

export default App;
