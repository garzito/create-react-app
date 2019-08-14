var dfwPlatformUIAppConfig = {
  appTitle: '',
  appId: 'appName',  // The appid from the policy manager
  appConfigUrl: 'local',
  guest : true,
  sso: {
    ssoHost: 'https://ssoui-cismsdc01.ds.dtveng.net/openam',
    ssoHostSessionCookieName: 'iPlanetDirectoryPro',
    ssoRealm: '/cspprodrealm',
    openamHost: 'https://ssoui-cismsdc01.ds.dtveng.net/openam/',
    openamSessionCookieName: 'iPlanetDirectoryPro',
    openamServiceGroupName: 'serviceAdminGroup',
    openamRealm: '/cspprodrealm',
    openamUserInfo: 'https://ssoui-cismsdc01.ds.dtveng.net:8443/authn-service/api/v1/authentication/users/',
    components: {
      pmApiURL: 'https://sso.ds.dtveng.net:8444/policy-management/api/v1/authorization/pap',
      apiURL: 'https://sso.ds.dtveng.net:8444/policy-management/api/v1/authorization/pap',
      policyDecisionURL: 'https://sso.ds.dtveng.net:8443/policy-decision/api/v1/authorization/pdp',
      sessionTimeoutMinutes: 1440,
      notifyMinutes: 10,
    },
  },
  components: {
    pmApiURL: 'https://sso.ds.dtveng.net:8444/policy-management/api/v1/authorization/pap',
    apiURL: 'https://sso.ds.dtveng.net:8444/policy-management/api/v1/authorization/pap',
    policyDecisionURL: 'https://sso.ds.dtveng.net:8443/policy-decision/api/v1/authorization/pdp',
    sessionTimeoutMinutes: 1440,
    notifyMinutes: 10,
  },
  notifications: {
    getAllUrl: '/api/notifications/v1/',
    deleteUrl: '/api/notifications/v1/',
    sendMessageUrl: '/api/notifications/v1/',
    eventSourceUrl: '/api',
  }
};
