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
const styles_1 = require("@material-ui/core/styles");
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
const colors_1 = require("@material-ui/core/colors");
const Favorite_1 = __importDefault(require("@material-ui/icons/Favorite"));
const Share_1 = __importDefault(require("@material-ui/icons/Share"));
const ExpandMore_1 = __importDefault(require("@material-ui/icons/ExpandMore"));
const MoreVert_1 = __importDefault(require("@material-ui/icons/MoreVert"));
const scrollDialog_jsx_1 = __importDefault(require("../dialog/scrollDialog.jsx"));
const MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
const Menu_1 = __importDefault(require("@material-ui/core/Menu"));
const react_router_dom_1 = require("react-router-dom");
const Divider_1 = __importDefault(require("@material-ui/core/Divider"));
const Edit_1 = __importDefault(require("@material-ui/icons/Edit"));
const DeleteForever_1 = __importDefault(require("@material-ui/icons/DeleteForever"));
const PostAdd_1 = __importDefault(require("@material-ui/icons/PostAdd"));
const Clear_1 = __importDefault(require("@material-ui/icons/Clear"));
const Cached_1 = __importDefault(require("@material-ui/icons/Cached"));
//import recipes from "../../HTTP/queries/recipes";
const useStyles = styles_1.makeStyles((theme) => ({
    card: {
        maxWidth: 245,
        minWidth: 245
        //  height: 200,
        //  width: 245,
    },
    span: {
        cursor: 'pointer'
    },
    control: {
        padding: theme.spacing(2),
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: colors_1.red[500],
    },
}));
// test
function ReceiptCard({ clikedDish, dialogOpen, recipe, customDate, ...props }) {
    function prettifyDate(date) {
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
        if (props.visitFromCreatePlanMealList) {
            console.log(date);
        }
        //
        let dateArr = date.split('-');
        let year = dateArr[0];
        const monthNumber = Number(dateArr[1]);
        let month = months[monthNumber];
        let day = dateArr[2];
        const dayMatch = day.match(/.+(?=T)/);
        if (dayMatch) {
            day = dayMatch[0];
        }
        return `${day}. ${month} ${year}`;
    }
    const classes = useStyles();
    const [scrollDialogOpen, setScrollDialogOpen] = react_1.default.useState(false);
    const [anchorEl, setAnchorEl] = react_1.default.useState(null);
    const settingsOpen = Boolean(anchorEl);
    const [expanded, setExpanded] = react_1.default.useState(false);
    const handleAddReceipeToFoodPlan = () => {
        // sending recipe to recipe component
        clikedDish(recipe);
        // waiting a bit before removing dialog when add recipe btn is clicked
        /*     setTimeout(
              () => dialogOpen(false),
              50
            ); */
        dialogOpen(false);
    };
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    react_1.useEffect(() => {
        console.log('The state of set scrolldialog changed: ' + scrollDialogOpen);
    }, [scrollDialogOpen]);
    const navStyle = {
        textDecoration: "none",
        color: "inherit"
    };
    //const {recipe} = recipe;jjs
    // test
    return (<>
      <scrollDialog_jsx_1.default boolean={scrollDialogOpen} text={recipe.text} ingredients={recipe.ingredients} title={recipe.name} image={recipe.image} onChange={(bool) => setScrollDialogOpen(bool)} key={1}/>

      <Card_1.default className={classes.card}>
        <CardHeader_1.default avatar={<Avatar_1.default aria-label="recipe" className={classes.avatar}>
              R
        </Avatar_1.default>} action={props.visitFromCreatePlanMealList ?
        <IconButton_1.default aria-label="settings" onClick={() => clikedDish(recipe.listId)}>
                <Clear_1.default />
              </IconButton_1.default> :
        <>
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
                  <MenuItem_1.default onClick={handleClose}><Edit_1.default /></MenuItem_1.default>
                  <Divider_1.default />
                  <react_router_dom_1.NavLink to="/receipts" style={navStyle} onClick={() => { console.log('Recept settings clicked'); }}>
                    <MenuItem_1.default onClick={handleClose}><DeleteForever_1.default /></MenuItem_1.default>
                  </react_router_dom_1.NavLink>
                </Menu_1.default>
              </>} title={recipe.name} subheader={prettifyDate(customDate ? customDate : recipe.createdAt)}/>


        <span className={classes.span} onClick={() => setScrollDialogOpen(!scrollDialogOpen)}>

          <CardMedia_1.default className={classes.media} image={recipe.image || "https://images.arla.com/recordid/96f498c04e7743fc9e8ca6ea0042c0d8/rejepaella.jpg?crop=(0,1258,0,-524)&w=1269&h=715&ak=6826258c&hm=d1853743"} title="Paella dish"/>
        </span>

        <CardContent_1.default>
          <Typography_1.default variant="body2" color="textSecondary" component="p">
            Nice cheap paella
          </Typography_1.default>
        </CardContent_1.default>
        <CardActions_1.default disableSpacing>

          {props.visitFromCreatePlanMealList ?
        <> {props.children}
              <IconButton_1.default aria-label="add to favorites"> <Cached_1.default onClick={() => dialogOpen(true)}/></IconButton_1.default>
            </> :
        <IconButton_1.default aria-label="add to favorites"> <Favorite_1.default /></IconButton_1.default>}

          {props.visitFromCreatePlan && <><IconButton_1.default aria-label="add dish to plan" onClick={handleAddReceipeToFoodPlan} title={'Tilføj ret til madplan'}>
            <PostAdd_1.default />
          </IconButton_1.default>
            <IconButton_1.default aria-label="share">
              <Share_1.default />
            </IconButton_1.default>
          </>}



          <IconButton_1.default className={clsx_1.default(classes.expand, {
        [classes.expandOpen]: expanded,
    })} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
            <ExpandMore_1.default />
          </IconButton_1.default>
        </CardActions_1.default>
        <Collapse_1.default in={expanded} timeout="auto" unmountOnExit>
          <CardContent_1.default>
            <i>Det skal du bruge:</i>
            {recipe.ingredients.map((ingredient, index) => <p key={index}>
                {`${ingredient.quantity || ""} ${ingredient.unit ? ingredient.unit.replace("*", '') : ''} ${ingredient.name}`.trimLeft()}
              </p>)}
          </CardContent_1.default>
        </Collapse_1.default>
      </Card_1.default>
    </>);
}
exports.default = ReceiptCard;
