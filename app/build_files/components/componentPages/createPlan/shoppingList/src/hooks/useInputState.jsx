"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
exports.default = initialValue => {
    const [value, setValue] = react_1.useState(initialValue);
    const handleChange = e => setValue(e.target.value);
    const clearValue = () => setValue('');
    return [value, handleChange, clearValue];
};
