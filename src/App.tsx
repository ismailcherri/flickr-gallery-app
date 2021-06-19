import React, { useState } from 'react';
import { useGetRecentPhotosEffect } from './api/get-recent-photos';
import { fromParams } from './helper/query-builder';

function App() {
  const [page, setPage] = useState(1);

  const { photo, isLoading } = useGetRecentPhotosEffect(
    fromParams({ per_page: 20, page: page }),
  );
  return (
    <>
      <div onClick={() => setPage(page + 1)}>
        Flicker Gallery
        {!isLoading &&
          photo.map((photoItem) => {
            return (
              <div
                key={photoItem.id + photoItem.secret}
                style={{ border: '1px solid red', margin: '10px 0' }}
              >
                <span>{photoItem.id + photoItem.secret}</span>&nbsp;
              </div>
            );
          })}
      </div>
    </>
  );
}

export default App;
