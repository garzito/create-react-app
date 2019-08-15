export const UPDATE_CONFIG = 'UPDATE_CONFIG';

export const configReducer = (state = window.dfwPlatformUIAppConfig, action) => {
  switch (action.type) {
    case UPDATE_CONFIG: {
      return {
        ...state,
        ...action.data,
        components: { ...action.data.sso.components },
      };
    }
    default: {
      return state;
    }
  }
};