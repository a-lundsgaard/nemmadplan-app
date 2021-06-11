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
const styles_1 = require("@material-ui/core/styles");
const Drawer_1 = __importDefault(require("@material-ui/core/Drawer"));
const AppBar_1 = __importDefault(require("@material-ui/core/AppBar"));
const Toolbar_1 = __importDefault(require("@material-ui/core/Toolbar"));
const List_1 = __importDefault(require("@material-ui/core/List"));
const CssBaseline_1 = __importDefault(require("@material-ui/core/CssBaseline"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const Divider_1 = __importDefault(require("@material-ui/core/Divider"));
const IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
const Menu_1 = __importDefault(require("@material-ui/icons/Menu"));
const ChevronLeft_1 = __importDefault(require("@material-ui/icons/ChevronLeft"));
const ChevronRight_1 = __importDefault(require("@material-ui/icons/ChevronRight"));
const ListItem_1 = __importDefault(require("@material-ui/core/ListItem"));
const ListItemIcon_1 = __importDefault(require("@material-ui/core/ListItemIcon"));
const ListItemText_1 = __importDefault(require("@material-ui/core/ListItemText"));
const react_router_dom_1 = require("react-router-dom");
const Fastfood_1 = __importDefault(require("@material-ui/icons/Fastfood"));
const Schedule_1 = __importDefault(require("@material-ui/icons/Schedule"));
const Home_1 = __importDefault(require("@material-ui/icons/Home"));
const TrendingDown_1 = __importDefault(require("@material-ui/icons/TrendingDown"));
const AttachMoney_1 = __importDefault(require("@material-ui/icons/AttachMoney"));
const Receipt_1 = __importDefault(require("@material-ui/icons/Receipt"));
const searchBar1_1 = __importDefault(require("../searchBar/searchBar1"));
const http_1 = __importDefault(require("../../../HTTP/http"));
const MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
const Menu_2 = __importDefault(require("@material-ui/core/Menu"));
const AccountCircle_1 = __importDefault(require("@material-ui/icons/AccountCircle"));
const routes_json_1 = __importDefault(require("../../../constants/routes.json"));
const drawerWidth = 240;
const useStyles = styles_1.makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        background: '#c24e00',
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        padding: theme.spacing(6),
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
}));
function MiniDrawer() {
    const classes = useStyles();
    const theme = styles_1.useTheme();
    const [open, setOpen] = react_1.default.useState(false);
    const [anchorEl, setAnchorEl] = react_1.default.useState(null);
    const open1 = Boolean(anchorEl);
    const [user, setUser] = react_1.useState('');
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const navStyle = {
        textDecoration: "none",
        color: "inherit"
    };
    const findIcon = text => {
        switch (text) {
            case 'Hjem': return <Home_1.default />;
            case 'Madplaner': return <Schedule_1.default />;
            case 'Opskrifter': return <Receipt_1.default />;
            case 'Mine tilbud': return <AttachMoney_1.default />;
            case 'Søg tilbud': return <TrendingDown_1.default />;
            default: return <Fastfood_1.default />;
        }
    };
    react_1.useEffect(() => {
        const token = localStorage.getItem('token');
        const requestBody = http_1.default.user.verifyUserAndReturnFields('firstName lastName', { token: token });
        http_1.default.post(requestBody)
            .then(response => {
            if (response.errors) {
            }
            else {
                const { firstName, lastName } = response.data.verifyUser;
                setUser(firstName + ' ' + lastName.split('')[0] + '.');
            }
        })
            .catch((err) => {
            console.log('Verification err: ' + err);
        });
    });
    return (<div className={classes.root}>
      <CssBaseline_1.default />
      <AppBar_1.default position="fixed" className={clsx_1.default(classes.appBar, {
            [classes.appBarShift]: open,
        })}>
        <Toolbar_1.default>
          <IconButton_1.default color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" className={clsx_1.default(classes.menuButton, {
            [classes.hide]: open,
        })}>
            <Menu_1.default />
          </IconButton_1.default>
          <searchBar1_1.default />
          <span style={{ flex: 1 }}></span>

          <div>
              <IconButton_1.default aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit">
                <AccountCircle_1.default />
              </IconButton_1.default>
              <Menu_2.default id="menu-appbar" anchorEl={anchorEl} anchorOrigin={{
            vertical: "top",
            horizontal: "right"
        }} keepMounted transformOrigin={{
            vertical: "top",
            horizontal: "right"
        }} open={open1} onClose={handleClose}>
                <MenuItem_1.default onClick={handleClose}>Min konto</MenuItem_1.default>
                <react_router_dom_1.NavLink to="/login" style={navStyle} onClick={() => { localStorage.removeItem('token'); }}>            
                  <MenuItem_1.default onClick={handleClose}>Log ud</MenuItem_1.default>
                </react_router_dom_1.NavLink>
              </Menu_2.default>
            </div>


          <Typography_1.default variant="h6" align="right" display="block" className={classes.appBar}>
            {user}
          </Typography_1.default>

        </Toolbar_1.default>
      </AppBar_1.default>
      <Drawer_1.default variant="permanent" className={clsx_1.default(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
        })} classes={{
            paper: clsx_1.default({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            }),
        }}>
        <div className={classes.toolbar}>
          <IconButton_1.default onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRight_1.default /> : <ChevronLeft_1.default />}
          </IconButton_1.default>
        </div>
        <Divider_1.default />
        <List_1.default>
        {[
            { text: 'Hjem', url: '/home' },
            { text: 'Madplaner', url: routes_json_1.default.CREATEPLAN },
            { text: 'Opskrifter', url: '/receipts' }
        ].map((obj, index) => (<react_router_dom_1.NavLink key={index} to={`${obj.url}`} style={navStyle} activeClassName="active" onClick={handleDrawerClose}>

            <ListItem_1.default button>
              <ListItemIcon_1.default>{findIcon(obj.text)}</ListItemIcon_1.default>
              
                  <ListItemText_1.default primary={obj.text}/>
            </ListItem_1.default>
            </react_router_dom_1.NavLink>))}
        </List_1.default>
        <Divider_1.default />
        <List_1.default>
        {['Mine tilbud', 'Søg tilbud'].map((text, index) => (<ListItem_1.default button key={text}>
              <ListItemIcon_1.default>{findIcon(text)}</ListItemIcon_1.default>

              <react_router_dom_1.NavLink to='/home' style={navStyle} activeClassName="active">
                <ListItemText_1.default primary={text}/>
              </react_router_dom_1.NavLink>
              
            </ListItem_1.default>))}
        </List_1.default>
      </Drawer_1.default>

    </div>);
}
exports.default = MiniDrawer;
