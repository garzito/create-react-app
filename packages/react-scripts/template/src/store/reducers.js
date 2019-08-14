import { authReducer as authState } from '../components/Login/reducer';
import { auditReducer as audit } from '../components/Audit/reducer';
import { configReducer as config } from './reducers/configReducer';
import { versionReducer as versionInfo } from './reducers/versionReducer';
import { connectivityReducer as online } from './reducers/connectivityReducer';

export default {
  authState,
  config,
  versionInfo,
  online,
  audit,
};