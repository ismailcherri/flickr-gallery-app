import React, { FC } from 'react';
import { Photo } from '../model/flickr-response';
import style from './photo.module.css';
import { FlickrImageComponent } from './flickr-image';
import { ImageDetailsComponent } from './image-details';

export const PhotoComponent: FC<{ photo: Photo }> = ({ photo }) => {
  return (
    <>
      <div className={style.photo}>
        <FlickrImageComponent {...photo} />
        <ImageDetailsComponent {...photo} />
      </div>
    </>
  );
};
