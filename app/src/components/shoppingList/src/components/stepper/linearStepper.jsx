import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import OpenSelect from 'Components/select/controlledOpenSelect.jsx'
//import OpenSelect from '../../../../../components/select/controlledOpenSelect'

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Chip from '@material-ui/core/Chip';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StoreMallDirectoryIcon from '@material-ui/icons/StoreMallDirectory';
import HTTP from '../../../../../HTTP/http'

import { TodosContext, DispatchContext } from '../../contexts/todos.context';

const useStyles = makeStyles((theme) => ({
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
    }
}));

function getSteps() {
    return ['Vælg hvor du vil købe ind', 'Vælg hvilen algoritme der skal bruges', 'Bekræft valg'];
}

const shoppingObj = {
    chains: ['nemlig.com', 'rema 1000'],
    algorithms: {
        'nemlig.com': ['billigste', 'økologi'],
        'rema 1000': ['billigste']
    }
}



export default function HorizontalLabelPositionBelowStepper() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    const [state, setState] = React.useState({});

    const todos = useContext(TodosContext);
    console.log(todos)


    function getStepContent(stepIndex, cb) {
        switch (stepIndex) {
            case 0:
                return <span style={{ display: 'flex' }}>
                    <OpenSelect
                        label={'Indkøbssted'}
                        optionList={shoppingObj.chains}
                        chosen={el => setState({ ...state, 'chain': el })}
                        value={state.chain}
                    />
                </span>
            case 1:
                return <OpenSelect
                    label={'Algoritme'}
                    optionList={shoppingObj.algorithms[state.chain]}
                    chosen={el => setState({ ...state, 'algorithm': el })}
                    value={state.algorithm}
                />;
            case 2:
                return <p>
                    <Chip
                        label={state.chain}
                        icon={<StoreMallDirectoryIcon />}
                        // onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                        className={classes.chip}
                    />
                    <Chip
                        icon={<ShoppingCartIcon />}
                        label={state.algorithm}
                        // onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                        className={classes.chip}
                    />
                </p>
            default:
                return 'Unknown stepIndex';
        }
    }


    const handleShopping = async () => {

        const query = {
            products: todos.map(el => {
                return el.task
            }),
            chain: state.chain,
            // products: ['vand'],
            profile: {
                price: 1, // prisniveau
                organic: '',
                form: '', // frost etc
                brand: {
                    brands: [],
                    wanted: true
                }
            }
        };


        const results = await HTTP.post(JSON.stringify(query), "shopping");
        return results;
    }


    const handleNext = () => {

        console.log(todos)


        // if no chain / website is selected
        if (!state.chain) {
            console.log(activeStep)
            return false;
        }
        // if no algoritithm is selected
        if (activeStep && !state.algorithm) {
            console.log(activeStep)
            return false;
        }

        // if step is 3, send request to shopping server
        if (activeStep === 2) {
            handleShopping();
           // alert('Køber ind')
            //return false;
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        console.log('found state')
        console.log(state)

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>All steps completed</Typography>
                        <Button onClick={handleReset}>Forfra</Button>
                    </div>
                ) : (
                        <div>
                            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                            <div>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    className={classes.backButton}
                                >
                                    Tilbage
              </Button>
                                <Button variant="contained" color="primary" onClick={handleNext}>
                                    {activeStep === steps.length - 1 ? 'Køb ind' : 'Næste'}
                                </Button>
                            </div>
                        </div>
                    )}
            </div>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

        </div>
    );
}
