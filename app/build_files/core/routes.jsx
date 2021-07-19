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
const react_router_1 = require("react-router");
const routes_1 = __importDefault(require("Constants/routes"));
const welcome_1 = __importDefault(require("Pages/welcome/welcome"));
const motd_1 = __importDefault(require("Pages/motd/motd"));
const localization_1 = __importDefault(require("Pages/localization/localization"));
const undoredo_1 = __importDefault(require("Pages/undoredo/undoredo"));
const contextmenu_1 = __importDefault(require("Pages/contextmenu/contextmenu"));
const signIn_1 = __importDefault(require("../pages/signIn/signIn"));
const signUp_1 = __importDefault(require("../pages/signUp/signUp"));
const protectedRoute_1 = __importDefault(require("../components/auth/protectedRoute/protectedRoute"));
const recipies_1 = __importDefault(require("../pages/recipies/recipies"));
const createPlan_jsx_1 = __importDefault(require("../pages/createPlan/createPlan.jsx"));
const miniDrawer_1 = __importDefault(require("../components/shared/drawer/miniDrawer"));
const http_1 = __importDefault(require("../HTTP/http"));
function Routes() {
    const [state, setState] = react_1.useState({
        isAuthenticated: false,
        isLoading: true
    });
    const token = localStorage.getItem('token');
    const requestBody = http_1.default.user.verifyUserAndReturnFields('firstName', { token: token });
    react_1.useEffect(() => {
        http_1.default.post(requestBody)
            .then(response => {
            if (response.errors) {
                setState({ isAuthenticated: false, isLoading: false });
            }
            else {
                setState({ isAuthenticated: true, isLoading: false });
            }
        })
            .catch((err) => {
            console.log('Token expired');
            console.log('Verification err: ' + err);
            setState({ isAuthenticated: false, isLoading: false });
        });
    }, []);
    react_1.useEffect(() => {
        console.log('State changed');
        console.log(state);
    }, [state]);
    const LoginContainer = () => (<>
        <react_router_1.Route exact path="/" render={() => <react_router_1.Redirect to="/login"/>}/>
        <react_router_1.Route path="/login" component={signIn_1.default}/>
        <react_router_1.Route exact path={routes_1.default.SIGNUP} component={signUp_1.default}></react_router_1.Route>
      </>);
    const DefaultContainer = () => (<>
      {state.isLoading ? null : <miniDrawer_1.default key={1}/>}
        <protectedRoute_1.default exact path={routes_1.default.RECIPES} component={recipies_1.default} isAuthenticated={state.isAuthenticated} isLoading={state.isLoading}></protectedRoute_1.default>
        <protectedRoute_1.default exact path={"/home"} component={welcome_1.default} isAuthenticated={state.isAuthenticated} isLoading={state.isLoading}></protectedRoute_1.default>
        <protectedRoute_1.default exact path={"/"} component={welcome_1.default} isAuthenticated={state.isAuthenticated} isLoading={state.isLoading}></protectedRoute_1.default>
        <protectedRoute_1.default exact path={routes_1.default.CREATEPLAN} component={createPlan_jsx_1.default} isAuthenticated={state.isAuthenticated} isLoading={state.isLoading}></protectedRoute_1.default>

        <react_router_1.Route path={routes_1.default.MOTD} component={motd_1.default}></react_router_1.Route>
        <react_router_1.Route path={routes_1.default.LOCALIZATION} component={localization_1.default}></react_router_1.Route>
        <react_router_1.Route path={routes_1.default.UNDOREDO} component={undoredo_1.default}></react_router_1.Route>
        <react_router_1.Route path={routes_1.default.CONTEXTMENU} component={contextmenu_1.default}></react_router_1.Route>
      </>);
    return (<react_router_1.Switch>
        <react_router_1.Route exact path={"/(login)"} component={LoginContainer}></react_router_1.Route>
        <react_router_1.Route exact path={routes_1.default.SIGNUP} component={LoginContainer}></react_router_1.Route>
        <react_router_1.Route component={DefaultContainer}/>
      </react_router_1.Switch>);
}
exports.default = Routes;
