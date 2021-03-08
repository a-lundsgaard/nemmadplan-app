"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const salesItem2_jsx_1 = __importDefault(require("./salesItem2.jsx"));
const useStyles = styles_1.makeStyles((theme) => ({
    appBar: {
        zIndex: '3'
    },
}));
// test hekko // hej2 kdk
// hej 2
function SalesList2({ sales, id }) {
    const classes = useStyles();
    const hej = 1;
    return (<section style={{ overflow: 'scroll', maxHeight: 500, zIndex: '2' }}>
      {sales.map((item, index) => (<react_1.Fragment key={index} className={classes.appBar}>
          {index ? <hr /> : null}
          <salesItem2_jsx_1.default key={index} item={item} id={id}/>
          </react_1.Fragment>))}
    </section>);
}
exports.default = SalesList2;
