import React, { useState, useEffect } from "react";

import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import { Paper, Button } from "@material-ui/core";

import format from "date-fns/format";
import daLocale from 'date-fns/locale/da';
import { set } from "lodash";
import da from "date-fns/locale/da";

class LocalizedUtils extends DateFnsUtils {
  getDatePickerHeaderText(date) {
    return format(date, "d MMM yyyy", { locale: this.locale });
  }
}

const months = {
  'januar': 0,
  'februar': 1,
  'marts': 2,
  'april': 3,
  'maj': 4,
  'juni': 5,
  'juli': 6,
  'august': 7,
  'september': 8,
  'oktober': 9,
  'november': 10,
  'december': 11
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



const paintDays2 = (meals) => {
  const calendarDays = document.querySelectorAll('.MuiPickersDay-day');
  const monthAndYearArray = document.querySelector('.makeStyles-daysSelect-24 p').innerText.split(' ');

  //const currentSelectedDate = parseInt(document.querySelector('.MuiPickersDay-daySelected').innerText);
  const month = months[monthAndYearArray[0]];
  const year = parseInt(monthAndYearArray[1]);

  meals.forEach((meal => {
    const mealDate = new Date(meal.date);
    const mealDateString = `${mealDate.getDate()} ${mealDate.getMonth()} ${mealDate.getFullYear()}`;

    calendarDays.forEach(el => {
      const dateString = `${el?.innerText} ${month} ${year}`;

      if (mealDateString === dateString) {
        el.style.background = '#90c200';
       // el.style.color ='white'
      } 

  /*     if (mealDateString !== dateString) {
        el.style.background = '';
       // el.style.color ='white'
      }  */

    })
  }))
}



const paintDays = (meals) => {
  const calendarDays = document.querySelectorAll('.MuiPickersDay-day');
  const monthAndYearArray = document.querySelector('.makeStyles-daysSelect-24 p').innerText.split(' ');

  //const currentSelectedDate = parseInt(document.querySelector('.MuiPickersDay-daySelected').innerText);
  const month = months[monthAndYearArray[0]];
  const year = parseInt(monthAndYearArray[1]);

  calendarDays.forEach((el => {
    const dateString = `${el?.innerText} ${month} ${year}`;

    meals.forEach(meal => {
      const mealDate = new Date(meal.date);
      const mealDateString = `${mealDate.getDate()} ${mealDate.getMonth()} ${mealDate.getFullYear()}`;

      if (mealDateString === dateString) {
        el.style.background = '#90c200';
       // el.style.color ='white'
      } 

/*   if (mealDateString !== dateString) {
        el.style.background = '';
       // el.style.color ='white'
      }  */

    })

    
  }))
}

const colorDaysWithASelectedMeal = (meals, fromMonthChange) => {
  if(fromMonthChange) { 
    setTimeout(() => paintDays(meals), 50) 
  } else {
    paintDays(meals);
  }
  return null;

}



function StaticDatePicker({ hasDbClicked, pickedDate, selectedMeals }) {

  const [date, setDate] = useState(new Date());
  // For opening receipts
  const [dbClick, setDbClick] = useState(false);


  const handleClick = (d) => {

    console.log(dbClick)
    if (dbClick) {
      //   let d = new Date();
      let nextDate = new Date(date);
      nextDate.setHours(+24);
      hasDbClicked(true)
      // setDate(new Date(nextDate.getFullYear(), nextDate.getMonth(), nextDate.getDate()))
      // alert('You double clicked');
      return
    }

    setDate(d);
    pickedDate(d);
    setDbClick(true);

    setTimeout(() => { // checking for double click
      setDbClick(false)
    }, 300)
  }

  /*   useEffect(() => {
      console.log(date);
  
      // paint days with selected food red 
      // mui datepickers doesnt support state yet, so it has to be done ugly and manually
      document.querySelectorAll('.MuiPickersDay-day').forEach(el => {
        console.log(el.classList.contains('MuiPickersDay-daySelected'))
  
        if (el.classList.contains('MuiPickersDay-daySelected')) {
          el.style.background = 'red'
        }
      })
  
    }, [date]) */


  useEffect(() => {

    if (selectedMeals.length) {
      console.log(selectedMeals);

      // paint days with selected food red 
      // mui datepickers doesnt support state yet, so it has to be done ugly and manually
      colorDaysWithASelectedMeal(selectedMeals);
    }


  }, [selectedMeals])

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
            onChange={date => handleClick(date)}
            onMonthChange={() => { return colorDaysWithASelectedMeal(selectedMeals, true) }}
          //onAccept= {()=> alert('changed')}
          //onOpen={() => alert('changed')}

          />
        </Paper>
      </MuiPickersUtilsProvider>
    </ThemeProvider>

  );
};

export default StaticDatePicker;
