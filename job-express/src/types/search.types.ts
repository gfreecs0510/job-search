import { paths } from './api';

export type searchRequest =
  paths['/search']['post']['requestBody']['content']['application/json'] & {
    debug?: boolean;
  };
export type searchResponse =
  paths['/search']['post']['responses']['200']['content']['application/json'];
export type esResults = searchResponse['result'];
