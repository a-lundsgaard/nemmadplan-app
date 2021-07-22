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
const clsx_1 = __importDefault(require("clsx"));
const Card_1 = __importDefault(require("@material-ui/core/Card"));
const CardHeader_1 = __importDefault(require("@material-ui/core/CardHeader"));
const CardMedia_1 = __importDefault(require("@material-ui/core/CardMedia"));
const CardContent_1 = __importDefault(require("@material-ui/core/CardContent"));
const CardActions_1 = __importDefault(require("@material-ui/core/CardActions"));
const Collapse_1 = __importDefault(require("@material-ui/core/Collapse"));
const Avatar_1 = __importDefault(require("@material-ui/core/Avatar"));
const IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const Favorite_1 = __importDefault(require("@material-ui/icons/Favorite"));
const Share_1 = __importDefault(require("@material-ui/icons/Share"));
const ExpandMore_1 = __importDefault(require("@material-ui/icons/ExpandMore"));
const MoreVert_1 = __importDefault(require("@material-ui/icons/MoreVert"));
const MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
const Menu_1 = __importDefault(require("@material-ui/core/Menu"));
const Divider_1 = __importDefault(require("@material-ui/core/Divider"));
const Edit_1 = __importDefault(require("@material-ui/icons/Edit"));
const DeleteForever_1 = __importDefault(require("@material-ui/icons/DeleteForever"));
const styles_1 = __importDefault(require("./styles"));
const http_1 = __importDefault(require("../../../../HTTP/http"));
const prompt_1 = __importDefault(require("../../dialog/prompt/prompt"));
const imageGridList_1 = __importDefault(require("../../image/imageGrid/imageGridList"));
function MealPlanCard({ mealPlan, clikedPlan: clikedDish, dialogOpen, customDate, ...props }) {
    const useStyles = styles_1.default;
    const classes = useStyles();
    const [scrollDialogOpen, setScrollDialogOpen] = react_1.default.useState(false);
    const [anchorEl, setAnchorEl] = react_1.default.useState(null);
    const settingsOpen = Boolean(anchorEl);
    const [expanded, setExpanded] = react_1.default.useState(false);
    const [agreeOnRecipeDeletePrompt, setAgreeOnRecipeDeletePrompt] = react_1.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleDeleteMealPlan = (id) => {
        const token = localStorage.getItem('token');
        const requestBody = http_1.default.mealPlans.deleteMealPlan('_id name', {
            weekPlanId: mealPlan._id,
            token: token
        });
        http_1.default.post(requestBody).then(res => {
            console.log('MEALPLAN DELETED');
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
        setAgreeOnRecipeDeletePrompt(false);
    };
    react_1.useEffect(() => {
        if (agreeOnRecipeDeletePrompt) {
            handleDeleteMealPlan(mealPlan._id);
        }
    }, [agreeOnRecipeDeletePrompt]);
    react_1.useEffect(() => {
        console.log('The state of set scrolldialog changed: ' + scrollDialogOpen);
    }, [scrollDialogOpen]);
    return (<>
      

      <Card_1.default className={classes.card}>
        <CardHeader_1.default avatar={<Avatar_1.default aria-label="recipe" className={classes.avatar}>
              R
            </Avatar_1.default>} action={<>
              <IconButton_1.default aria-label="settings" onClick={handleMenu}>
                <MoreVert_1.default />
              </IconButton_1.default>
              <Menu_1.default id="menu-appbar" anchorEl={anchorEl} anchorOrigin={{
                vertical: "top",
                horizontal: "right"
            }} keepMounted transformOrigin={{
                vertical: "top",
                horizontal: "right"
            }} open={settingsOpen} onClose={handleClose}>
                <MenuItem_1.default onClick={handleClose}>
                  <Edit_1.default />
                </MenuItem_1.default>
                <Divider_1.default />
                <MenuItem_1.default>
                  <prompt_1.default header={'Ønsker du virkelig at slette "' + mealPlan.name + '"?'} infoText={'Hvis du fortsætter slettes retten permanent. Denne handling kan ikke fortrydes.'} agree={(bool) => setAgreeOnRecipeDeletePrompt(bool)}>
                    <DeleteForever_1.default />
                  </prompt_1.default>
                </MenuItem_1.default>
              </Menu_1.default>
            </>} title={mealPlan.name} subheader={prettifyDate(customDate ? customDate : mealPlan.createdAt)}/>


        <span className={classes.span} onClick={() => setScrollDialogOpen(!scrollDialogOpen)}>
          {mealPlan.plan.length < 2 ?
            <CardMedia_1.default className={classes.media} image={mealPlan.plan[0].dish.image} title={mealPlan.name}/> :
            <imageGridList_1.default imageArray={mealPlan.plan.map((item) => item.dish.image)}/>}
        </span>

        <CardContent_1.default>
          <Typography_1.default variant="body2" color="textSecondary" component="p">
            {mealPlan.plan.reduce((a, b, index) => {
            const string = !index ? b.dish.name : ', ' + b.dish.name.toLowerCase();
            a += string;
            return a;
        }, '')}
          </Typography_1.default>
        </CardContent_1.default>

        <CardActions_1.default disableSpacing>
          <IconButton_1.default aria-label="add to favorites"> <Favorite_1.default /></IconButton_1.default>
          <IconButton_1.default aria-label="share"><Share_1.default /></IconButton_1.default>
          <IconButton_1.default className={clsx_1.default(classes.expand, {
            [classes.expandOpen]: expanded,
        })} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
            <ExpandMore_1.default />
          </IconButton_1.default>
        </CardActions_1.default>
        <Collapse_1.default in={expanded} timeout="auto" unmountOnExit>
          <CardContent_1.default>
            <i>Retter på denne plan:</i>
            {mealPlan.plan.map((plan, index) => <p key={index}>
                {prettifyDate(plan.day, true) + ': ' + plan.dish.name.toLowerCase()}
              </p>)}
          </CardContent_1.default>
        </Collapse_1.default>
      </Card_1.default>
    </>);
}
exports.default = MealPlanCard;
function prettifyDate(date, dontKeepYear) {
    const months = {
        1: 'januar',
        2: 'februar',
        3: 'marts',
        4: 'april',
        5: 'maj',
        6: 'juni',
        7: 'juli',
        8: 'august',
        9: 'september',
        10: 'oktober',
        11: 'november',
        12: 'december'
    };
    if (!date) {
        return;
    }
    let dateArr = date.split('-');
    let year = dateArr[0];
    const monthNumber = Number(dateArr[1]);
    let month = months[monthNumber];
    let day = dateArr[2];
    const dayMatch = day.match(/.+(?=T)/);
    if (dayMatch) {
        day = dayMatch[0];
    }
    if (dontKeepYear)
        return `${day}. ${month}`;
    return `${day}. ${month} ${year}`;
}
