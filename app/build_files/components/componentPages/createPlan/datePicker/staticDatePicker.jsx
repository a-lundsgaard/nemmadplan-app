"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const date_fns_1 = __importDefault(require("@date-io/date-fns"));
const pickers_1 = require("@material-ui/pickers");
const styles_1 = require("@material-ui/styles");
const core_1 = require("@material-ui/core");
const core_2 = require("@material-ui/core");
const format_1 = __importDefault(require("date-fns/format"));
const da_1 = __importDefault(require("date-fns/locale/da"));
class LocalizedUtils extends date_fns_1.default {
    getDatePickerHeaderText(date) {
        return format_1.default(date, "d MMM yyyy", { locale: this.locale });
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
};
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import getMuiTheme from 'material-ui/styles/getMuiTheme';
const defaultMaterialTheme = core_1.createMuiTheme({
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
const paintDays = (meals) => {
    const calendarDays = document.querySelectorAll('.MuiPickersDay-day');
    let monthAndYearArray;
    try {
        monthAndYearArray = document.querySelector('.MuiTypography-root.MuiTypography-body1.MuiTypography-alignCenter').innerText.split(' ');
    }
    catch (error) {
        console.log('Kunne ikke læse måned og år for kalender, overvej at bruge anden selector');
        console.log(error);
        monthAndYearArray = ['januar', '2020'];
    }
    //const currentSelectedDate = parseInt(document.querySelector('.MuiPickersDay-daySelected').innerText);
    const month = months[monthAndYearArray[0]];
    const year = parseInt(monthAndYearArray[1]);
    calendarDays.forEach((el => {
        const dateString = `${el === null || el === void 0 ? void 0 : el.innerText} ${month} ${year}`;
        for (const meal of meals) {
            const mealDate = new Date(meal.date);
            const mealDateString = `${mealDate.getDate()} ${mealDate.getMonth()} ${mealDate.getFullYear()}`;
            if (mealDateString === dateString) {
                el.style.background = '#90c200';
                // el.style.color ='white'
                break;
            }
            else {
                el.style.background = '';
            }
            /*  if (mealDateString !== dateString) {
               el.style.background = '';
               // el.style.color ='white'
               
             } */
        }
        /*     meals.forEach(meal => {
              const mealDate = new Date(meal.date);
              const mealDateString = `${mealDate.getDate()} ${mealDate.getMonth()} ${mealDate.getFullYear()}`;
        
              if (mealDateString === dateString) {
                el.style.background = '#90c200';
                // el.style.color ='white'
                return
              }
        
            }) */
    }));
};
const colorDaysWithASelectedMeal = (meals, fromMonthChange) => {
    if (fromMonthChange) {
        setTimeout(() => paintDays(meals), 50);
    }
    else {
        paintDays(meals);
    }
    return null;
};
function StaticDatePicker({ hasDbClicked, pickedDate, selectedMeals }) {
    const [date, setDate] = react_1.useState(new Date());
    // For opening receipts
    const [dbClick, setDbClick] = react_1.useState(false);
    const handleClick = (d) => {
        console.log(dbClick);
        if (dbClick) {
            //   let d = new Date();
            let nextDate = new Date(date);
            nextDate.setHours(+24);
            hasDbClicked(true);
            // setDate(new Date(nextDate.getFullYear(), nextDate.getMonth(), nextDate.getDate()))
            // alert('You double clicked');
            return;
        }
        setDate(d);
        pickedDate(d);
        setDbClick(true);
        setTimeout(() => {
            setDbClick(false);
        }, 300);
    };
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
    react_1.useEffect(() => {
        if (selectedMeals.length) {
            console.log(selectedMeals);
            // alert('Meals changed')
            // paint days with selected food red 
            // mui datepickers doesnt support state yet, so it has to be done ugly and manually
            colorDaysWithASelectedMeal(selectedMeals);
        }
    }, [selectedMeals]);
    // prettier-ignore
    return (<styles_1.ThemeProvider theme={defaultMaterialTheme}>

      <pickers_1.MuiPickersUtilsProvider utils={LocalizedUtils} locale={da_1.default}>

        <core_2.Paper elevation={20} variant='outlined' style={{ overflow: "hidden" }}>
          <pickers_1.DatePicker disablePast autoOk={false} variant="static" openTo="date" value={date} onChange={date => handleClick(date)} onMonthChange={() => { return colorDaysWithASelectedMeal(selectedMeals, true); }}/>
        </core_2.Paper>
      </pickers_1.MuiPickersUtilsProvider>
    </styles_1.ThemeProvider>);
}
;
exports.default = StaticDatePicker;
