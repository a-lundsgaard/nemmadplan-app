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
const Stepper_1 = __importDefault(require("@material-ui/core/Stepper"));
const Step_1 = __importDefault(require("@material-ui/core/Step"));
const StepLabel_1 = __importDefault(require("@material-ui/core/StepLabel"));
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const CircularProgress_1 = __importDefault(require("@material-ui/core/CircularProgress"));
const actions_1 = require("../../constants/actions");
const controlledOpenSelect_1 = __importDefault(require("../../../../../../shared/select/controlledOpenSelect"));
const Chip_1 = __importDefault(require("@material-ui/core/Chip"));
const ShoppingCart_1 = __importDefault(require("@material-ui/icons/ShoppingCart"));
const StoreMallDirectory_1 = __importDefault(require("@material-ui/icons/StoreMallDirectory"));
const lab_1 = require("@material-ui/lab");
const http_1 = __importDefault(require("../../../../../../../HTTP/http"));
const todos_context_jsx_1 = require("../../contexts/todos.context.jsx");
const useStyles = styles_1.makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    chip: {
        marginRight: 5
    },
    alert: {
        width: '85%'
    }
}));
function getSteps() {
    return ['Vælg hvor du vil købe ind', 'Vælg dine præferencer', 'Køb ind'];
}
const shoppingObj = {
    chains: ['nemlig.com', 'rema 1000'],
    algorithms: {
        'nemlig.com': ['billigste', 'økologi'],
        'rema 1000': ['billigste']
    }
};
function HorizontalLabelPositionBelowStepper() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = react_1.default.useState(0);
    const steps = getSteps();
    const [state, setState] = react_1.default.useState({});
    const [infoType, setInfoType] = react_1.useState('');
    const [isLoading, setIsLoading] = react_1.useState(false);
    const todos = react_1.useContext(todos_context_jsx_1.TodosContext);
    const dispatch = react_1.useContext(todos_context_jsx_1.DispatchContext);
    console.log(todos);
    const infoTextLookup = {
        'success': {
            header: false,
            infoText: 'Alle varer blev tilføjet til kurven'
        },
        'warning': {
            header: 'OBS',
            infoText: 'Kun overstregede varer kunne findes. Tjek at varen er stavet rigtigt eller forsøg at gøre den mere præcis hvis den ikke kan findes'
        }
    };
    function getStepContent(stepIndex, cb) {
        switch (stepIndex) {
            case 0:
                return <span style={{ display: 'flex' }}>
                    <controlledOpenSelect_1.default label={'Indkøbssted'} optionList={shoppingObj.chains} chosen={el => setState({ ...state, 'chain': el })} value={state.chain}/>
                </span>;
            case 1:
                return <controlledOpenSelect_1.default label={'Algoritme'} optionList={shoppingObj.algorithms[state.chain]} chosen={el => setState({ ...state, 'algorithm': el })} value={state.algorithm}/>;
            case 2:
                return <p>
                    <Chip_1.default label={state.chain} icon={<StoreMallDirectory_1.default />} className={classes.chip}/>
                    <Chip_1.default icon={<ShoppingCart_1.default />} label={state.algorithm} className={classes.chip}/>
                </p>;
            default:
                return 'Unknown stepIndex';
        }
    }
    const handleShopping = async () => {
        const query = {
            products: todos,
            chain: state.chain,
            profile: {
                algorithm: state.algorithm,
                price: 1,
                organic: '',
                form: '',
                brand: {
                    brands: [],
                    wanted: true
                }
            }
        };
        const results = await http_1.default.post(JSON.stringify(query), "shopping");
        return results;
    };
    const handleNext = async () => {
        console.log(todos);
        if (!state.chain) {
            console.log(activeStep);
            return false;
        }
        if (activeStep && !state.algorithm) {
            console.log(activeStep);
            return false;
        }
        if (activeStep === 2) {
            if (isLoading)
                return false;
            setIsLoading(true);
            const shoppedItems = await handleShopping();
            setIsLoading(false);
            if (shoppedItems.addedProducts.length === todos.length) {
                setInfoType('success');
            }
            else {
                setInfoType('warning');
            }
            shoppedItems.
                addedProducts
                .forEach(item => {
                const { id } = item;
                dispatch({ type: actions_1.COMPLETE_TODO, id });
            });
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        console.log('found state');
        console.log(state);
    };
    const handleBack = () => {
        if (isLoading)
            return false;
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleReset = () => {
        dispatch({ type: actions_1.UNCOMPLETE_TODO });
        setActiveStep(0);
    };
    return (<div className={classes.root}>
            <div>
                {activeStep === steps.length ? (<div>
                        <Typography_1.default className={classes.instructions}>
                            <lab_1.Alert severity={infoType} className={classes.alert}>
                                {infoType !== 'success' && <lab_1.AlertTitle>{infoTextLookup[infoType].header}</lab_1.AlertTitle>}
                                {infoTextLookup[infoType].infoText && infoTextLookup[infoType].infoText}
                            </lab_1.Alert>
                        </Typography_1.default>
                        <Button_1.default variant="outlined" color="primary" onClick={handleReset}>Handl igen</Button_1.default>
                    </div>) : (<div>
                            <Typography_1.default className={classes.instructions}>{getStepContent(activeStep)}</Typography_1.default>
                            <div style={{ display: 'flex' }}>
                                <Button_1.default disabled={activeStep === 0} onClick={handleBack} className={classes.backButton}>
                                    Tilbage
                                </Button_1.default>
                                <Button_1.default variant="contained" color="primary" onClick={handleNext}>
                                
                                {isLoading ? <CircularProgress_1.default color='secondary' style={{ margin: '0px 20px 0 20px' }} size={25} thickness={5}/> :
                activeStep === steps.length - 1 ? 'Køb ind' : 'Næste'}

                                </Button_1.default>

                                

                            </div>
                        </div>)}
            </div>
            <Stepper_1.default activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (<Step_1.default key={label}>
                        <StepLabel_1.default>{label}</StepLabel_1.default>
                    </Step_1.default>))}
            </Stepper_1.default>

        </div>);
}
exports.default = HorizontalLabelPositionBelowStepper;
