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
const Avatar_1 = __importDefault(require("@material-ui/core/Avatar"));
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const CssBaseline_1 = __importDefault(require("@material-ui/core/CssBaseline"));
const TextField_1 = __importDefault(require("@material-ui/core/TextField"));
const FormControlLabel_1 = __importDefault(require("@material-ui/core/FormControlLabel"));
const Checkbox_1 = __importDefault(require("@material-ui/core/Checkbox"));
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
const Box_1 = __importDefault(require("@material-ui/core/Box"));
const LockOutlined_1 = __importDefault(require("@material-ui/icons/LockOutlined"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const styles_1 = require("@material-ui/core/styles");
const Container_1 = __importDefault(require("@material-ui/core/Container"));
const react_hook_form_1 = require("react-hook-form");
const react_router_dom_1 = require("react-router-dom");
const auth_1 = __importDefault(require("../../components/auth/auth"));
const snackbar_1 = __importDefault(require("../../components/shared/snackbar/snackbar"));
const react_router_dom_2 = require("react-router-dom");
const routes_1 = __importDefault(require("../../constants/routes"));
const http_1 = __importDefault(require("../../HTTP/http"));
function Copyright() {
    return (<Typography_1.default variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <react_router_dom_1.Link color="inherit" to="https://material-ui.com/">
        Your Website
      </react_router_dom_1.Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography_1.default>);
}
const useStyles = styles_1.makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
function SignIn() {
    const history = react_router_dom_2.useHistory();
    const classes = useStyles();
    const { register, handleSubmit, errors, watch } = react_hook_form_1.useForm();
    const [input, setInput] = react_1.useState({ email: '', password: '' });
    const [message, setMessage] = react_1.useState({});
    const onSubmit = async () => {
        const requestBody1 = `query {
        login(email: "${input.email}", password:"${input.password}") {
          token
          userId
          tokenExpiration
        } 
      }`;
        const requestBody = http_1.default.user.signInAndReturnFields('token userId tokenExpiration', { email: input.email, password: input.password });
        console.log(requestBody);
        auth_1.default.login(requestBody, user => {
            setMessage({ msg: 'Login succesfull', type: 'success', key: Math.random() });
            history.push('/home');
        }, error => {
            setMessage({ msg: error, type: 'error', key: Math.random() });
        });
    };
    return (<Container_1.default component="main" maxWidth="xs">
      <CssBaseline_1.default />
      <div className={classes.paper}>
        <Avatar_1.default className={classes.avatar}>
          <LockOutlined_1.default />
        </Avatar_1.default>
        <Typography_1.default component="h1" variant="h5">
          Sign in
        </Typography_1.default>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField_1.default variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus onChange={(event) => setInput({ ...input, email: event.target.value })}/>
          <TextField_1.default variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" onChange={(event) => setInput({ ...input, password: event.target.value })}/>
          <FormControlLabel_1.default control={<Checkbox_1.default value="remember" color="primary"/>} label="Remember me"/>
          <Button_1.default type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Sign In
          </Button_1.default>
          <Grid_1.default container>
            <Grid_1.default item xs>
              <react_router_dom_1.Link to="#" variant="body2">
                Forgot password?
              </react_router_dom_1.Link>
            </Grid_1.default>
            <Grid_1.default item>
              <react_router_dom_1.Link to={routes_1.default.SIGNUP} variant="body2">
                {"Don't have an account? Sign Up"}
              </react_router_dom_1.Link>
            </Grid_1.default>
          </Grid_1.default>
        </form>
      </div>
      <Box_1.default mt={8}>
        <Copyright />
      </Box_1.default>


      {message.msg ? <snackbar_1.default key={message.key} type={message.type} message={message.msg}/> : null}

    </Container_1.default>);
}
exports.default = SignIn;
