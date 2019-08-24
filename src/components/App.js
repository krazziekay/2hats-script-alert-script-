import React from 'react';
import Header from './Header';
import Body from './Body';
import {createMuiTheme} from '@material-ui/core/styles';
import {MuiThemeProvider} from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6100ee',
    },
  },
});

const App = () =>
  <>
    <MuiThemeProvider theme={theme}>
      <Header/>
      <Body/>
    </MuiThemeProvider>
  </>;

export default App;
