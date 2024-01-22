import axios, { Axios } from 'axios';

import { Query } from './query';

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

    this.query = new Query(this);
    this.baseUrl = baseUrl;
  }
}
