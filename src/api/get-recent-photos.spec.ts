import { renderHook } from '@testing-library/react-hooks';
import { useGetRecentPhotosEffect } from './get-recent-photos';
import { waitFor } from '@testing-library/react';
import { FlickrResponse } from '../model/flickr-response';
import { FlickrRequest } from '../model/flickr-request';

function getInitialResponse(page = 1): FlickrResponse {
  return {
    photos: {
      photo: [
        { id: '1', server: '', secret: '', title: '', owner: '' },
        { id: '2', server: '', secret: '', title: '', owner: '' },
        { id: '3', server: '', secret: '', title: '', owner: '' },
      ],
      page: page,
      perpage: 0,
      total: 0,
      pages: 0,
    },
    stat: 'ok',
  };
}

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
    const mockResponse: FlickrResponse = getInitialResponse();

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

  it('should return array of unique photos based on IDs', async () => {
    const initialMockResponse: FlickrResponse = getInitialResponse();

    jest.spyOn(global, 'fetch').mockImplementation(
      () =>
        Promise.resolve({
          json: () => Promise.resolve(initialMockResponse),
        }) as Promise<Response>,
    );

    const renderResult = renderHook(
      (req: FlickrRequest) => {
        return useGetRecentPhotosEffect(req);
      },
      {
        initialProps: { page: 1 },
      },
    );
    await renderResult.waitForNextUpdate();

    expect(renderResult.result.current).toStrictEqual({
      isLoading: false,
      photo: initialMockResponse.photos.photo,
      isError: false,
    });

    const secondaryResponse: FlickrResponse = getInitialResponse(2);

    jest.spyOn(global, 'fetch').mockImplementation(
      () =>
        Promise.resolve({
          json: () => Promise.resolve(secondaryResponse),
        }) as Promise<Response>,
    );
    renderResult.rerender({ page: 2 });
    await waitFor(
      () =>
        renderResult.result.current.photo === secondaryResponse.photos.photo,
    );
    expect(renderResult.result.current).toStrictEqual({
      isLoading: false,
      photo: secondaryResponse.photos.photo,
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
