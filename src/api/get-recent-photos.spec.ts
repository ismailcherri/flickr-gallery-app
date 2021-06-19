import { renderHook } from '@testing-library/react-hooks';
import { useGetRecentPhotosEffect } from './get-recent-photos';
import { FlickrResponse } from '../model/flickr-response';

describe('useGetRecentPhotosEffect', () => {
  it('should return empty array if no response', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(
      () =>
        Promise.resolve({
          json: () => Promise.resolve({} as FlickrResponse),
        }) as Promise<Response>,
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useGetRecentPhotosEffect({}),
    );
    await waitForNextUpdate();

    expect(result.current).toStrictEqual({
      isLoading: false,
      photo: [],
      isError: false,
    });
  });

  it('should return array of photos', async () => {
    const mockResponse: FlickrResponse = {
      photos: {
        photo: [
          { id: '', server: '', secret: '', title: '', owner: '' },
          { id: '', server: '', secret: '', title: '', owner: '' },
          { id: '', server: '', secret: '', title: '', owner: '' },
        ],
        page: 0,
        perpage: 0,
        total: 0,
        pages: 0,
      },
      stat: 'ok',
    };

    jest.spyOn(global, 'fetch').mockImplementation(
      () =>
        Promise.resolve({
          json: () => Promise.resolve(mockResponse),
        }) as Promise<Response>,
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useGetRecentPhotosEffect({}),
    );
    await waitForNextUpdate();

    expect(result.current).toStrictEqual({
      isLoading: false,
      photo: mockResponse.photos.photo,
      isError: false,
    });
  });

  it('should return isError true in case of error', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(
      () =>
        Promise.resolve({
          json: () => Promise.reject('Error!'),
        }) as Promise<Response>,
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useGetRecentPhotosEffect({}),
    );
    await waitForNextUpdate();

    expect(result.current).toStrictEqual({
      isLoading: false,
      photo: [],
      isError: true,
    });
  });
});
