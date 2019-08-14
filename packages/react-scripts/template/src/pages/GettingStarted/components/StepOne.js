/* Structural Modules */
import React from 'react';

export const StepOne = () => (
  <div>
    <h1>Navigation</h1>
    <p>The 'Getting Started' tab is an example of how to present two-level navigation</p>
    <p>modify your '-app' html page to add or remove tabs to your navigation</p>
    <h1>Things you should be doing</h1>
    <ul>
      <li>Design your UI/UX with your team and the Iconics UI/UX design team</li>
      <li>Design your UI security with roles and permissions and then use the <a href="https://policy-manager-ui-devint.cld.dtveng.net" target="_blank">Policy Manager UI</a> to set up your application permissions/roles. contact the Iconics team for access to this tool.</li>
      <li>Design your UI auditing scheme and then add Auditing to your UI using the <a href="https://developer-ui-devint.cld.dtveng.net/node_modules/@ovp/dfw-audit/index.html" target="_blank">audit web component</a></li>
      <li>To configure you're environment for deploying and building, modify the <a href="https://egconfluence.cld.dtveng.net/display/DKA/Web+Application+Configuration" target="_blank">UI CICD files</a></li>
    </ul>
  </div>
);

export default StepOne;