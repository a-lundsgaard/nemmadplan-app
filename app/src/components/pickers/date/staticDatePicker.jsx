import React, { useState } from "react";

import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider  } from "@material-ui/pickers";

import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import { Paper, Button } from "@material-ui/core";

import format from "date-fns/format";
import daLocale from 'date-fns/locale/da';

class LocalizedUtils extends DateFnsUtils {
  getDatePickerHeaderText(date) {
      return format(date, "d MMM yyyy", { locale: this.locale });
  }
}


//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import getMuiTheme from 'material-ui/styles/getMuiTheme';


const defaultMaterialTheme = createMuiTheme({

 //   selectColor: 'red',
  //  spacing: 2,
  overrides: {
    MuiPickersToolbar: {
        toolbar: { 
          backgroundColor: '#fed8b1',
          text: 'black'
        }
    }
  }

 // background: 'red',
});


const StaticDatePicker = () => {
  const [date, changeDate] = useState(new Date());


  // prettier-ignore
  return (
    <ThemeProvider theme={defaultMaterialTheme}>

    <MuiPickersUtilsProvider utils={LocalizedUtils} locale={daLocale}>

    <Paper elevation={2} style={{ overflow: "hidden", marginBottom: 45 }}>
      <DatePicker
      disablePast
      autoOk={false}
        variant="static"
        openTo="date"
        value={date}
        onChange={changeDate}
       // onAccept= {()=> alert('changed')}
        onOpen= {()=> alert('changed')}

      />
      </Paper>
    </MuiPickersUtilsProvider>
    </ThemeProvider>

  );
};

export default StaticDatePicker;
