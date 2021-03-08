"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
exports.default = (initialValue = false) => {
    const [state, setState] = react_1.useState(initialValue);
    const toggle = () => setState(!state);
    return [state, toggle];
};
