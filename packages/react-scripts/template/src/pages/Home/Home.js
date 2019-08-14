import React from 'react';

import classes from './Home.module.css';

export const Home = () => {
  return (
    <div className={classes.homePage}>
        <div className={classes.containerHeader}>
          <div className={classes.head}>
            <h1>ICONICS - WEB COMPONENT STARTER KIT</h1>
            <h3>Visualize your API</h3>
          </div>
        </div>
        <div className={classes.container1}>
          <div>
            <div className={classes.circle}><a href="https://www.polymer-project.org">
              <div className={`${classes.polymer} ${classes.icon}`}></div></a>
            </div>
            <div>
              <div className={classes.featureHeading}>Starter Kit</div>
              <p className={classes.paraText}>With the starter kit you can begin building your progressive
                web application right away. Develop, Design, and Test with a suite of framework
                tools and access to a large portfolio of custom and open-source web components to
                help you get started
              </p>
              <p>
                <b>Tools</b>
                </p><ul>
                  <li>
                    <a
                      className={classes.dfwAnchor}
                      href="https://www.polymer-project.org/3.0/docs/tools/polymer-cli"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Polymer CLI
                    </a>
                  </li>
                  <li>
                    <a
                      className={classes.dfwAnchor}
                      href="https://developers.google.com/web/tools/lighthouse/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Web App Auditing - Lighthouse
                    </a>
                  </li>
                  <li>
                    <a
                      className={classes.dfwAnchor}
                      href="https://github.com/Polymer/web-component-tester"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Web Tester - /test directory
                    </a>
                  </li>
                  <li>
                    <a
                      className={classes.dfwAnchor}
                      href="https://developer-ui-devint.cld.dtveng.net/styling"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      UI Starter Kit w/Navigation Layout
                    </a>
                  </li>
                  <li>
                    <a
                      className={classes.dfwAnchor}
                      href="https://egconfluence.cld.dtveng.net/display/DKA/Web+Application+Pipeline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      CICD Build/Deploy Pipeline Integration
                    </a>
                  </li>
                  <li>
                    <a
                      className={classes.dfwAnchor}
                      href="https://www.owasp.org/index.php/ESAPI_JavaScript_Readme"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      OWASP security ESAPI4JS library
                    </a>
                  </li>
                  <li>
                    <a
                      className={classes.dfwAnchor}
                      href="https://developer-ui-devint.cld.dtveng.net/node_modules/@ovp/dfw-decision/index.html#/elements/dfw-decision"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Web Component Single-Sign-On: dfw-decision, dfw-permit
                    </a>
                  </li>
                </ul>
              <p></p>
            </div>
          </div>
          <div>
            <div className={classes.circle}>
              <a
                href="http://webcomponents.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={`${classes.webcomponents} ${classes.icon}`}></div>
              </a>
            </div>
            <div>
              <div className={classes.featureHeading}>&lt;/Web Components&gt;</div>
                <p className={classes.paraText}>
                  The W3C Web Component Standards provide a way to build
                  Progressive Web UIs. And Polymer implements this standard in full to
                  support all major browsers including Internet Explorer, Firefox, Safari, Chrome
                </p>
              <div>
              <p>
                <b>
                  <a
                    className={classes.dfwAnchor}
                    href="https://www.webcomponents.org/specs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Specifications
                  </a>
                </b>
              </p>
              <ul>
                <li>
                  <a
                    className={classes.dfwAnchor}
                    href="https://www.webcomponents.org/specs#the-custom-elements-specification"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Custom Elements
                  </a>
                </li>
                <li>
                  <a
                    className={classes.dfwAnchor}
                    href="https://www.webcomponents.org/specs#the-es-module-specification"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ES Modules
                  </a>
                </li>
                <li>
                  <a
                    className={classes.dfwAnchor}
                    href="https://www.webcomponents.org/specs#the-html-template-specification"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    HTML Templates
                  </a>
                </li>
                <li>
                  <a
                    className={classes.dfwAnchor}
                    href="https://www.webcomponents.org/specs#the-shadow-dom-specification"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    shadow DOM
                  </a>
                </li>
              </ul>
            </div>
          </div>
          </div>
          <div>
            <div className={classes.circle}>
              <a
                href="https://developer-ui-devint.cld.dtveng.net"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={`${classes.showcase} ${classes.icon}`}></div>
              </a>
            </div>
            <div>
              <div className={classes.featureHeading}>#Development Showcase</div>
              <p className={classes.paraText}>
                Click on the link to access the
                <a
                  className={classes.dfwAnchor}
                  href="https://developer-ui-devint.cld.dtveng.net"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Developer UI Showcase
                </a>
              </p>
              <div>
                <p><b>Resources</b></p>
                <ul>
                  <li>
                    <a
                      className={classes.dfwAnchor}
                      href="https://www.polymer-project.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Polymer Project
                    </a>
                  </li>
                  <li>
                    <a
                      className={classes.dfwAnchor}
                      href="https://www.webcomponents.org/author/PolymerElements"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Polymer PolymerElements Catalog
                    </a>
                  </li>
                  <li>
                    <a
                      className={classes.dfwAnchor}
                      href="https://www.polymer-project.org/1.0/blog/routing"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Polymer Routing
                    </a>
                  </li>
                  <li>
                    <a
                      className={classes.dfwAnchor}
                      href="https://www.webcomponents.org"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Web Components #UseThePlatform
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className={classes.lineHr} />
    </div>
  );
};

export default Home;