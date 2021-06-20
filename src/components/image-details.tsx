import React, { FC, useContext } from 'react';
import { Photo } from '../model/flickr-response';
import { AppContext } from '../context';
import style from './image-details.module.css';

export const ImageDetailsComponent: FC<Photo> = (photo) => {
  const { dispatch } = useContext(AppContext);

  const handleFavorite = (photo: Photo) => {
    if (!photo.favorite) {
      dispatch({ type: 'ADD_TO_FAVORITES', payload: { photo } });
      return;
    }
    dispatch({ type: 'REMOTE_FROM_FAVORITES', payload: { photo } });
  };

  return (
    <>
      <div className={style.detailsContainer}>
        <div className={style.title}>{photo.title}</div>
        <button
          className={`${style.btn} ${photo.favorite ? style.favorite : ''}`}
          onClick={() => handleFavorite(photo)}
        >
          Favourite
        </button>
      </div>
    </>
  );
};
