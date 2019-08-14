import {
  SET_AUDIT_INIT,
  SET_AUDIT_FINAL,
  SET_AUDIT_POINT,
  AUDIT_SAVED,
} from './reducer';

export const setAuditInit = data => dispatch => dispatch({
  type: SET_AUDIT_INIT,
  data,
});

export const setAuditPoint = data => dispatch => dispatch({
  type: SET_AUDIT_POINT,
  data,
});

export const setAuditFinal = data => dispatch => dispatch({
  type: SET_AUDIT_FINAL,
  data,
});

export const saveAuditData = payload => async (dispatch, getState) => {
  const readyPayload = {
    ...payload,
    message: JSON.stringify({
      original: getState().audit[payload.entityName].trackInit,
      changed: getState().audit[payload.entityName].trackSave
    }),
  };

  dispatch(saveAudit(readyPayload));
};

export const saveAudit = payload => async dispatch => {
  const reqOpts = {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload),
  };
  
  try {
    await fetch('/api/audit/v1/log', reqOpts);
    dispatch({ type: AUDIT_SAVED, data: { entityName: payload.entityName } });
  } catch (e) {
    console.error('Failed to save audit data: ', e);
  }
};