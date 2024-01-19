import { Client } from 'twenty-sdk';

export type Script = {
  name: string;
  author: string;
  description: string;
};

export type ApiKey = string;

export type Context = {
  client: Client;
};
