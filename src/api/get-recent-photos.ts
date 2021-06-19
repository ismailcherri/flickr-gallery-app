import { useEffect, useMemo, useState } from 'react';
import { FlickrResponse, Photo } from '../model/flickr-response';
import { FlickrRequest } from '../model/flickr-request';
import { toQueryParams } from '../helper/query-builder';

export function useGetRecentPhotosEffect(params: FlickrRequest) {
  const [photo, setPhoto] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const api = async (url: string) => {
    const response = await fetch(url);
    const flickerResponse: FlickrResponse = await response.json();
    if (flickerResponse.photos?.photo?.length) {
      setPhoto(flickerResponse.photos.photo);
    }
  };

  const queryParams = useMemo(() => toQueryParams(params), [params]);

  useEffect(() => {
    api(
      `${process.env.REACT_APP_API_URL}?method=flickr.photos.getRecent&api_key=${process.env.REACT_APP_API_KEY}&${queryParams}`,
    )
      .catch(() => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, [queryParams]);
  return { isLoading, photo, isError };
}
