import { useCallback, useEffect, useMemo, useState } from 'react';
import { FlickrResponse, Photo } from '../model/flickr-response';
import { FlickrRequest } from '../model/flickr-request';
import { toQueryParams } from '../helper/query-builder';

export function useGetRecentPhotosEffect(params: FlickrRequest) {
  const [photoIds, setPhotoIds] = useState<string[]>([]);
  const [photo, setPhoto] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const queryParams = useMemo(() => {
    return `${
      process.env.REACT_APP_API_URL
    }?method=flickr.photos.getRecent&api_key=${
      process.env.REACT_APP_API_KEY
    }&${toQueryParams(params)}`;
  }, [params]);

  const api = useCallback(async () => {
    const response = await fetch(queryParams);
    return (await response.json()) as FlickrResponse;
  }, [queryParams]);

  const addPhotos = useCallback(
    (photos: Photo[]) => {
      photos.forEach((item) => {
        if (photoIds.includes(item.id)) {
          return;
        }
        photoIds.push(item.id);
        photo.push(item);
      });
      setPhoto(photo);
      setPhotoIds(photoIds);
    },
    [photo, photoIds],
  );

  useEffect(() => {
    api()
      .then((flickerResponse) => {
        if (flickerResponse.photos?.photo?.length) {
          addPhotos(flickerResponse.photos.photo);
        }
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [queryParams, api, addPhotos]);
  return { photo, isLoading, isError };
}
