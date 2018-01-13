// @flow weak

// Note that NODE_ENV is set in package.json.
const API_URL = process.env.NODE_ENV == 'dev' ?
               'http://localhost:9999/graphql' :
               'https://api.blockterm.com/graphql';

export const appConfig = {
  apollo: {
    networkInterface: API_URL,
  },
};
