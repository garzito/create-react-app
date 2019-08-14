import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  setAuditInit,
  setAuditPoint,
  setAuditFinal,
  saveAuditData,
  saveAudit,
} from './actions';

const Audit = props => {
  const basePayload = {
    severity: props.severity,
    appId : props.applicationId,
    sessionId : props._sessionId,
    entityName: props.entityName,
    entityId: props.entityId,
    version: props.version
  };
  const saveAuditText = text => props.saveAudit({
    ...basePayload,
    message: text,
  });
  const setInit = value => props.setAuditInit({ entityName: props.entityName, value });
  const setPoint = (id, value) => props.setAuditPoint({ entityName: props.entityName, id, value });
  const setFinal = value => props.setAuditFinal({ entityName: props.entityName, value });
  const saveAuditData = () => props.saveAuditData(basePayload);
  
  return props.children({
    saveAuditText: saveAuditText,
    setAuditInit: setInit,
    setAuditPoint: setPoint,
    setAuditFinal: setFinal,
    saveAuditData
  });
}

Audit.defaultProps = {
  severity: 'INFO',
  applicationId: '',
  sessionId: '',
  entityName: '',
  entityId: '',
  version: '1.0.0',
  setAuditInit: () => {},
  setAuditPoint: () => {},
  setAuditFinal: () => {},
  saveAudit: () => {},
};

Audit.propTypes = {
  children: PropTypes.func,
  severity: PropTypes.oneOf(['INFO', 'NOTICE', 'WARN', 'CRITIAL', 'EMERGENCY']).isRequired,
  applicationId: PropTypes.string.isRequired,
  sessionId: PropTypes.string.isRequired,
  entityName: PropTypes.string.isRequired,
  entityId: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
  setAuditInit: PropTypes.func.isRequired,
  setAuditPoint: PropTypes.func.isRequired,
  setAuditFinal: PropTypes.func.isRequired,
  saveAudit: PropTypes.func.isRequired,
};

export default connect(
  null,
  {
    setAuditInit,
    setAuditPoint,
    setAuditFinal,
    saveAuditData,
    saveAudit,
  }
)(Audit);
