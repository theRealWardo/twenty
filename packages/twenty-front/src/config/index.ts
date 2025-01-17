declare global {
  interface Window {
    _env_?: Record<string, string>;
    __APOLLO_CLIENT__?: any;
  }
}

const getDefaultUrl = () => {
  if (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
  ) {
    // In development environment front and backend usually run on seperate ports
    // we set the default value to localhost:3000.
    // It dev context, we use env vars to overwrite it
    return 'http://localhost:3000';
  } else {
    // Outside of localhost we assume that they run on the same port
    // because the backend will serve the frontend
    // It prod context, we use env-config.js + window var to ovewrite it
    return `${window.location.protocol}//${window.location.hostname}${
      window.location.port ? `:${window.location.port}` : ''
    }`;
  }
};

export const REACT_APP_SERVER_BASE_URL =
  window._env_?.REACT_APP_SERVER_BASE_URL ||
  process.env.REACT_APP_SERVER_BASE_URL ||
  getDefaultUrl();

export const REACT_APP_SERVER_AUTH_URL =
  window._env_?.REACT_APP_SERVER_AUTH_URL ||
  process.env.REACT_APP_SERVER_AUTH_URL ||
  REACT_APP_SERVER_BASE_URL + '/auth';

export const REACT_APP_SERVER_FILES_URL =
  window._env_?.REACT_APP_SERVER_FILES_URL ||
  process.env.REACT_APP_SERVER_FILES_URL ||
  REACT_APP_SERVER_BASE_URL + '/files';
