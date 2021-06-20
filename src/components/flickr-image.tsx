import React, { FC } from 'react';
import { Photo } from '../model/flickr-response';
import style from './flicker-image.module.css';

export const FlickrImageComponent: FC<Photo> = ({
  server,
  id,
  secret,
  title,
}) => {
  return (
    <>
      <img
        className={style.image}
        alt={title}
        src={`https://live.staticflickr.com/${server}/${id}_${secret}_w.jpg`}
      />
    </>
  );
};
