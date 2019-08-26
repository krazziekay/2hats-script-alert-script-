import React, {useEffect, useState} from 'react';
import Header from './Header';
import Body from './Body';
import {createMuiTheme} from '@material-ui/core/styles';
import {MuiThemeProvider} from "@material-ui/core";
import moment from 'moment';
import DATA from './../constants';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6100ee',
    },
  },
});

const App = () => {
  const [data, setData] = useState(DATA);
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));

  useEffect(() => {
    console.log('CHanged', data, date);
  }, [data, date]);

  return (<>
    <MuiThemeProvider theme={theme}>
      <Header userData={data} refetch={setData} changeDate={setDate} currentDate={date}/>
      <Body userData={data} currentDate={date}/>
    </MuiThemeProvider>
  </>)
};

export default App;
