export const SET_VERSION_INFO = 'SET_VERSION_INFO';

const initialVersionInfo = {
  version: '?:?:?',
  date: '??/??/????',
  story: '????',
};
export const versionReducer = (state = initialVersionInfo, action) => {
  switch (action.type) {
    case SET_VERSION_INFO: {
      return action.data;
    }
    default: {
      return state;
    }
  }
};