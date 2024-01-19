import axios from 'axios';

import Client from '../src/client';
import Query from '../src/query';

jest.mock('axios');

describe('Client', () => {
  let client: Client;
  let axiosInstance: any;
  let query: Query;

  beforeEach(() => {
    axiosInstance = {
      post: jest.fn(),
    };
    jest.mock('axios', () => axiosInstance);

    client = new Client('apiKeyAuth');
    query = client.query;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create an instance of Client', () => {
    expect(client).toBeInstanceOf(Client);
  });

  it('should initialize axios instance with base URL and authorization header', () => {
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://api.twenty.com/graphql',
      headers: {
        Authorization: 'Bearer apiKeyAuth',
      },
    });
  });

  describe('executeQuery', () => {
    it('should build the query and execute the request', async () => {
      const builtQuery = 'query { id name email }';
      const variables = { id: 1, name: 'John' };
      const responseData = { data: 'response data' };

      jest.spyOn(query, 'build').mockReturnValue(builtQuery);
      jest.spyOn(query, 'getVariables').mockReturnValue(variables);
      axiosInstance.post.mockResolvedValue({ data: responseData });

      const result = await client.executeQuery();

      expect(query.build).toHaveBeenCalled();
      expect(query.getVariables).toHaveBeenCalled();
      expect(axiosInstance.post).toHaveBeenCalledWith('/', {
        query: builtQuery,
        variables,
      });
      expect(result).toBe(responseData);
    });

    it('should throw an error if the request fails', async () => {
      const error = new Error('Request failed');

      jest.spyOn(query, 'build').mockReturnValue('query { id name email }');
      jest
        .spyOn(query, 'getVariables')
        .mockReturnValue({ id: 1, name: 'John' });
      axiosInstance.post.mockRejectedValue(error);

      await expect(client.executeQuery()).rejects.toThrow(error);
    });
  });
});
