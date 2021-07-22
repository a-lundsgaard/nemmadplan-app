"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
function ImageGrid({ imageArray }) {
    const height = 80;
    const width = 120;
    const styles = { height: height, width: width };
    return (<Grid_1.default container>
            {imageArray
            .slice(0, 4)
            .map((imageSrcString, index) => {
            return <Grid_1.default item key={index}>
                            <img style={styles} src={imageSrcString}/>
                        </Grid_1.default>;
        })}
        </Grid_1.default>);
}
exports.default = ImageGrid;
