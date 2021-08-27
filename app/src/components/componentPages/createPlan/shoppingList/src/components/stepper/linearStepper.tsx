import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { REMOVE_TODO, TOGGLE_TODO, COMPLETE_TODO, UNCOMPLETE_TODO } from '../../constants/actions';

//import OpenSelect from 'Components/select/controlledOpenSelect'
//import OpenSelect from '../../../../shared/select/controlledOpenSelect'

import OpenSelect from '../../../../../../shared/select/controlledOpenSelect'

import Chip from '@material-ui/core/Chip';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StoreMallDirectoryIcon from '@material-ui/icons/StoreMallDirectory';
import { Alert, AlertTitle } from '@material-ui/lab';

//import HTTP from '../../../../../HTTP/http'

import HTTP from '../../../../../../../HTTP/http';


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
}



export default function HorizontalLabelPositionBelowStepper() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    const [state, setState] = React.useState({});
    const [infoType, setInfoType] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const todos = useContext(TodosContext);
    const dispatch = useContext(DispatchContext);

    console.log(todos)

    const infoTextLookup = {
        'success': {
            header: false,
            infoText: 'Alle varer blev tilføjet til kurven'
        },
        'warning': {
            header: 'OBS',
            infoText: 'Kun overstregede varer kunne findes. Tjek at varen er stavet rigtigt eller forsøg at gøre den mere præcis hvis den ikke kan findes'
        }
    }


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
            products: todos,
            chain: state.chain,
            // products: ['vand'],
            profile: {
                algorithm: state.algorithm,
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


    const handleNext = async () => {

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

            if (isLoading) return false;

            setIsLoading(true);
            const shoppedItems = await handleShopping();
            setIsLoading(false);

            if (shoppedItems.addedProducts.length === todos.length) {
                setInfoType('success')
            } else {
                setInfoType('warning')
            }

            shoppedItems.
                addedProducts
                .forEach(item => {
                    const { id } = item;
                    dispatch({ type: COMPLETE_TODO, id })
                })

            //.then((r)=> alert(JSON.stringify(r)))
            // alert('Køber ind')
            //return false;
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        console.log('found state')
        console.log(state)

    };

    const handleBack = () => {
        if (isLoading) return false;
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        dispatch({ type: UNCOMPLETE_TODO })
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>
                            <Alert severity={infoType} className={classes.alert}>
                                {infoType !== 'success' && <AlertTitle>{infoTextLookup[infoType].header}</AlertTitle>}
                                {infoTextLookup[infoType].infoText && infoTextLookup[infoType].infoText}
                            </Alert>
                        </Typography>
                        <Button variant="outlined" color="primary" onClick={handleReset}>Handl igen</Button>
                    </div>
                ) : (
                    <div>
                        <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                        <div style={{ display: 'flex' }}>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.backButton}
                            >
                                Tilbage
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleNext} >

                                {isLoading ? <CircularProgress color='secondary' style={{ margin: '0px 20px 0 20px' }} size={25} thickness={5} /> :
                                    activeStep === steps.length - 1 ? 'Køb ind' : 'Næste'
                                }

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
