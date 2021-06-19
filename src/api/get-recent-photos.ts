import { useEffect, useMemo, useState } from 'react';
import { FlickrResponse, Photo } from '../model/flickr-response';
import { FlickrRequest } from '../model/flickr-request';
import { toQueryParams } from '../helper/query-builder';

export function useGetRecentPhotosEffect(params: FlickrRequest) {
  const [photo, setPhoto] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const api = async (url: string) => {
    setIsLoading(true);
    const response = await fetch(url);
    const flickerResponse: FlickrResponse = await response.json();
    setPhoto(flickerResponse.photos.photo);
    setIsLoading(false);
  };

  const queryParams = useMemo(() => toQueryParams(params), [params]);

  useEffect(() => {
    api(
      `${process.env.REACT_APP_API_URL}&api_key=${process.env.REACT_APP_API_KEY}&${queryParams}`,
    ).catch((err) => console.log(err));
  }, [queryParams]);

  return { photo, isLoading };
}
