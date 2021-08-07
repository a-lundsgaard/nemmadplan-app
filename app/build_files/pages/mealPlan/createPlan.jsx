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
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
const receiptSceletonLoader_1 = __importDefault(require("../../components/shared/loaders/receiptSceletonLoader"));
const createPlanDialog_1 = __importDefault(require("../../components/componentPages/createPlan/index/createPlanDialog"));
const styles_1 = __importDefault(require("./styles"));
const http_1 = __importDefault(require("../../HTTP/http"));
const mealPlanCard_1 = __importDefault(require("../../components/shared/card/mealPlanCard/mealPlanCard"));
const snackbar_jsx_1 = __importDefault(require("../../components/shared/snackbar/snackbar.jsx"));
const mealPlanCountKey = 'mealPlanCount';
function createPlan() {
    const useStyles = styles_1.default;
    const classes = useStyles();
    const [mealPlans, setMealPlans] = react_1.useState([]);
    const [isLoading, setIsLoading] = react_1.useState(false);
    const [message, setMessage] = react_1.useState({});
    const mealPlanCount = parseInt(localStorage.getItem(mealPlanCountKey)) || 0;
    react_1.useEffect(() => {
        getMealPlans();
    }, []);
    const getMealPlans = () => {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        const requestBody = http_1.default.mealPlans.getMealPlans('', {
            token: token
        });
        http_1.default.post(requestBody)
            .then(res => {
            const weekPlans = res.data.weekPlans;
            console.log(res);
            setMealPlans(weekPlans);
            localStorage.setItem(mealPlanCountKey, JSON.stringify(weekPlans.length));
            setIsLoading(false);
        })
            .catch(e => console.log(e));
    };
    return (<react_1.Fragment>
      

      <Grid_1.default container className={classes.root} justify="center">
        <Grid_1.default item xs={10}>

          <Grid_1.default container justify="center" spacing={5}>
            {isLoading ?
            Array(mealPlanCount)
                .fill(mealPlanCount)
                .map((recipe, index) => (<Grid_1.default key={index} item>
                      <receiptSceletonLoader_1.default />
                    </Grid_1.default>))
            :
                mealPlans.map((mealPlan, index) => {
                    return <Grid_1.default key={index} item>
                    <mealPlanCard_1.default mealPlan={mealPlan}/>
                  </Grid_1.default>;
                })}

          </Grid_1.default>

        </Grid_1.default>
      </Grid_1.default>


      <div className={classes.addReceiptButton}>
        <createPlanDialog_1.default />
      </div>

      {message.msg ? <snackbar_jsx_1.default key={message.key} type={message.type} message={message.msg}/> : null}


    </react_1.Fragment>);
}
exports.default = createPlan;
