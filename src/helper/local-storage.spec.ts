import { getStoredFavorites, storeFavorites } from './local-storage';

describe('storeFavorites', () => {
  let setItemSpy: jest.SpyInstance;

  beforeEach(() => {
    setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
  });

  it('should store into localStorage', () => {
    storeFavorites([]);
    expect(setItemSpy).toHaveBeenCalled();
  });
});

describe('getStoredFavorites', () => {
  let getIemSpy: jest.SpyInstance;

  beforeEach(() => {
    getIemSpy = jest.spyOn(Storage.prototype, 'getItem');
  });

  it('should return undefined when there is not value', () => {
    getIemSpy.mockReturnValue(null);

    const result = getStoredFavorites();
    expect(getIemSpy).toHaveBeenCalled();
    expect(result).toBeUndefined();
  });

  it('should return empty array is the store is empty', () => {
    getIemSpy.mockReturnValue(JSON.stringify([]));

    const result = getStoredFavorites();
    expect(getIemSpy).toHaveBeenCalled();
    expect(result?.length).toBe(0);
  });
});
