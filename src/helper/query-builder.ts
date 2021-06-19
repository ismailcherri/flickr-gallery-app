import { FlickrRequest } from '../model/flickr-request';

export function toQueryParams<T extends Object>(query: T): string {
  const searchParams = new URLSearchParams();
  Object.entries(query).forEach(
    (entry) => entry[1] && searchParams.append(entry[0], entry[1] as string),
  );
  return searchParams.toString();
}

export function fromParams(params: FlickrRequest): FlickrRequest {
  params.page = params.page ?? 0;
  params.per_page = params.per_page ?? 20;
  params.format = params.format ?? 'json';
  params.nojsoncallback = params.nojsoncallback ?? 1;

  return Object.assign({} as FlickrRequest, params);
}
