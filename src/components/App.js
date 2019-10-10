import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { pink } from '@material-ui/core/colors';
import EndpointsRoute from '../routes/endpoints';
import LoginRoute from '../routes/login';
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1976d2'
    },
    secondary: pink
  },
  overrides: {
    MuiListItem: {
      gutters: {
        paddingLeft: 25
      }
    },
    MuiContainer: {
      root: {
        marginTop: 20
      }
    },
    MuiTypography: {
      h6: {
        fontWeight: 400
      }
    }
  }
});

const isAuthenticated = () => {
  // TODO: is token exists in localStorage and valid
  return true;
};

const ProtectedRoute = props => (
  isAuthenticated() === true ? 
    <Route {...props} /> : 
    <Redirect to="/" />
);

const App = () => {
  const basename = window.location.pathname.startsWith('/emnify-dashboard/') ?
  '/emnify-dashboard': '';

  return (
    <Router basename={basename}>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/" exact component={LoginRoute} />
          <ProtectedRoute path="/endpoints" exact component={EndpointsRoute} />
        </Switch>
      </ThemeProvider>
    </Router>
  );
};

export default App;
