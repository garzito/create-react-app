/* Structural Modules */
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

/* UI Modules */
import ConfigurationLoader from './components/ConfigurationLoader/ConfigurationLoader';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import GettingStarted from './pages/GettingStarted/GettingStarted'
import CssBaseline from '@material-ui/core/CssBaseline';
import { NoMatch } from './helpers/404';

/* Functional Module */
import store from './store/store';
import classes from './App.module.css';
import 'codemirror/lib/codemirror.css';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#0367ae' },
    info: { main: '#71c3e7' }, 
    success: { main: '#4ba910' }, 
    warning: { main: '#ffb71b' }, 
    error: { main: '#cf292b' }, 
  }
})

const App = () => {
  const [selectedTab, changeSelectedTab] = useState('home');

  return (
    <Provider store={store}>
      <Router>
        <MuiThemeProvider theme={theme}>
          <ConfigurationLoader />
          <CssBaseline />
          <header className={classes.header}>
            <Header />
            <Navigation onChange={changeSelectedTab} selected={selectedTab} />
          </header>
          <main className={classes.main}>
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/home" component={Home} />
              <Route path="/getting-started" component={GettingStarted} />
              <Route component={NoMatch} />
            </Switch>
          </main>
          <Footer />
        </MuiThemeProvider>
      </Router>
    </Provider>
  );
}

export default App;
