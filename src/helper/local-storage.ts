import { Photo } from '../model/flickr-response';

const LOCAL_STORAGE_KEY = 'flickr_favorites';

export function getStoredFavorites(): Photo[] | undefined {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) {
    return;
  }
  return JSON.parse(stored);
}

export function storeFavorites(photos: Photo[]): void {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(photos));
}
