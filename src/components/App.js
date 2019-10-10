import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/" exact component={LoginRoute} />
          <Route path="/endpoints" exact component={EndpointsRoute} />
        </Switch>
      </ThemeProvider>
    </Router>
  );
};

export default App;
