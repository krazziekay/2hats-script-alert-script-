import React, {useState} from 'react';
import Header from './Header';
import Body from './Body';
import {createMuiTheme} from '@material-ui/core/styles';
import {MuiThemeProvider} from "@material-ui/core";
import moment from "moment";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6100ee',
    },
  },
});

const App = () => {
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  return (<>
    <MuiThemeProvider theme={theme}>
      <Header changeDate={setDate} currentDate={date} />
      <Body currentDate={date} />
    </MuiThemeProvider>
  </>)
};

export default App;
