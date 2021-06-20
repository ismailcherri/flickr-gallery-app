import { FlickrResponse } from '../model/flickr-response';
import { FlickrRequest } from '../model/flickr-request';
import { getRecentPhotos } from '../api/get-recent-photos';

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

describe('getRecentPhotos', () => {
  let fetchSpy: jest.SpyInstance;

  beforeEach(() => {
    fetchSpy = jest.spyOn(global, 'fetch');
  });

  it('should accept FlickrRequest', async () => {
    const expectedResponse = getInitialResponse();

    fetchSpy.mockImplementation(
      () =>
        Promise.resolve({
          json: () => Promise.resolve(expectedResponse),
        }) as Promise<Response>,
    );

    const req: FlickrRequest = { page: 1, per_page: 20 };
    const result = await getRecentPhotos(req);

    expect(result).toStrictEqual(expectedResponse);
  });

  it('should return FlickrResponse', async () => {
    const expectedResponse = getInitialResponse();

    fetchSpy.mockImplementation(
      () =>
        Promise.resolve({
          json: () => Promise.resolve(expectedResponse),
        }) as Promise<Response>,
    );

    const result = await getRecentPhotos({ page: 1 });

    expect(result).toStrictEqual(expectedResponse);
  });
});
