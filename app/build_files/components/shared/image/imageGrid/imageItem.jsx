"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
function ImageGridItem({ imageSrcString, style }) {
    const height = 65;
    const width = 100;
    const styles = {
        maxHeight: height,
        width: width
    };
    return (<Grid_1.default item>
            <img style={style} src={imageSrcString}/>
        </Grid_1.default>);
}
exports.default = ImageGridItem;
