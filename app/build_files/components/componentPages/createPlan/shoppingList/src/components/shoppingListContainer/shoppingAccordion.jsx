"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const Accordion_1 = __importDefault(require("@material-ui/core/Accordion"));
const AccordionSummary_1 = __importDefault(require("@material-ui/core/AccordionSummary"));
const AccordionDetails_1 = __importDefault(require("@material-ui/core/AccordionDetails"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const ExpandMore_1 = __importDefault(require("@material-ui/icons/ExpandMore"));
const useStyles = styles_1.makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));
function SimpleAccordion(props) {
    const classes = useStyles();
    return (<div className={classes.root}>
      <Accordion_1.default variant={'outlined'}>
        <AccordionSummary_1.default expandIcon={<ExpandMore_1.default />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography_1.default className={classes.heading}>Her kan du shoppe dine varer</Typography_1.default>
        </AccordionSummary_1.default>
        <AccordionDetails_1.default>
          {props.children}
        </AccordionDetails_1.default>
      </Accordion_1.default>
    </div>);
}
exports.default = SimpleAccordion;
