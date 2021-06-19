export interface FlickrRequest {
  per_page?: number;
  page?: number;
  format?: 'json' | 'xml';
  nojsoncallback?: 0 | 1;
}
