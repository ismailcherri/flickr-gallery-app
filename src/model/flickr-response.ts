export interface FlickrResponse {
  photos: Photos;
  stat: 'ok';
}

export interface Photos {
  photo: Photo[];
  page: number;
  pages: number;
  perpage: number;
  total: number;
}

export interface Photo {
  id: string;
  owner: string;
  secret: string;
  server: string;
  title: string;
}
