import axios, { Axios } from 'axios';

import Query from './query';

export class Client {
  axiosInstance: Axios;
  query: Query;
  baseUrl: string;

  constructor(
    apiKeyAuth: string,
    baseUrl: string = 'https://api.twenty.com/graphql',
  ) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        Authorization: 'Bearer ' + apiKeyAuth,
      },
    });

    this.query = new Query();
    this.baseUrl = baseUrl;
  }

  public async executeQuery() {
    const query = this.query.build();

    try {
      const response = await this.axiosInstance.post('/', {
        query,
        variables: this.query.getVariables(),
      });

      return response.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error executing query', error);
      throw error;
    }
  }
}
