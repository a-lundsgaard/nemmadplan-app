"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const salesItem2_1 = __importDefault(require("./salesItem2"));
function SalesList3({ sales, id }) {
    const hej = 1;
    return (<section style={{ overflow: 'scroll', maxHeight: 500, zIndex: '2' }}>
        {sales.map((item, index) => (<span key={index}>
            {index ? <hr /> : null}
            <salesItem2_1.default key={index} item={item} id={id}/>
            </span>))}
      </section>);
}
exports.default = SalesList3;
