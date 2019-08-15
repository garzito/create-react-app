import { UPDATE_CONFIG } from './reducer';

export const getConfig = importPath => async (dispatch, getState) => {
  const { config } = getState();
  let url = '/api/config/v1/sso'

  if (!config.components) {
    if (config.appConfigUrl && config.appConfigUrl === 'local') {
      url = '/appConfig.json';
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch({
        type: UPDATE_CONFIG,
        data,
      });
    } catch (err) {
      console.error(`There was an error reading the application configuration: ${err}`);
    }
  }
};
