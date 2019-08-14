import _set from 'lodash/set';
export const SET_AUDIT_INIT = 'SET_AUDIT_INIT';
export const SET_AUDIT_FINAL = 'SET_AUDIT_FINAL';
export const SET_AUDIT_POINT = 'SET_AUDIT_POINT';
export const AUDIT_SAVED = 'AUDIT_SAVED';

export const auditReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_AUDIT_INIT: {
      const {
        entityName,
        value,
      } = action.data;
      const newState = { ...state };
      
      _set(newState, [entityName, 'trackInit'], value);
      _set(newState, [entityName, 'trackSave'], value);
      return newState;
    }
    case SET_AUDIT_FINAL: {
      const {
        entityName,
        value,
      } = action.data;
      const newState = { ...state };
      
      _set(newState, [entityName, 'trackSave'], value);
      return newState;
    }
    case SET_AUDIT_POINT: {
      const {
        entityName,
        id,
        value,
      } = action.data;
      const newState = { ...state };
      
      newState[entityName].trackSave = {
        ...[newState[entityName].trackSave],
        [id]: value,
      };
      return newState;
    }
    case AUDIT_SAVED: {
      const { entityName } = action.data;
      const newState = { ...state };

      _set(newState, [entityName, 'trackInit'], newState[entityName].trackSave);
      return newState;
    }
    default: {
      return state;
    }
  }
}