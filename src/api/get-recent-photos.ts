import { FlickrResponse } from '../model/flickr-response';
import { toQueryParams } from '../helper/query-builder';
import { FlickrRequest } from '../model/flickr-request';

const queryParams = (params: FlickrRequest) => {
  return `${
    process.env.REACT_APP_API_URL
  }?method=flickr.photos.getRecent&api_key=${
    process.env.REACT_APP_API_KEY
  }&${toQueryParams(params)}`;
};

const api = async (params: FlickrRequest) => {
  const response = await fetch(queryParams(params));
  return (await response.json()) as FlickrResponse;
};

export const getRecentPhotos = (params: FlickrRequest) => api(params);
