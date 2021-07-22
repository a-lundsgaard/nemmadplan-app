"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
function ImageGridItem({ imageSrcString, style }) {
    return (<Grid_1.default item>
            <img onClick={() => window.print()} style={style} src={imageSrcString}/>
        </Grid_1.default>);
}
exports.default = ImageGridItem;
