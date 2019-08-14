export const ONLINE = 'ONLINE';
export const OFFLINE = 'OFFLINE';

export const connectivityReducer = (state = true, action) => {
  switch (action.type) {
    case ONLINE: {
      return true;
    }
    case OFFLINE: {
      return false;
    }
    default: {
      return state;
    }
  }
};