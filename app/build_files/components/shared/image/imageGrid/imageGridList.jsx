"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
const imageItem_1 = __importDefault(require("./imageItem"));
const Los_Cardos_logo_no_bkgd_1_png_1 = __importDefault(require("./Los-Cardos-logo_no-bkgd-1.png"));
function ImageGrid({ imageArray }) {
    const filledArray = imageArray;
    if (filledArray.length < 4) {
        while (filledArray.length < 5)
            filledArray.push(Los_Cardos_logo_no_bkgd_1_png_1.default);
    }
    const height = 65;
    const width = 120;
    return (<Grid_1.default container>
            {filledArray
            .slice(0, 4)
            .map((imageSrcString, index) => {
            const style = index % 2 ?
                {
                    maxHeight: height,
                    width: width
                } : {
                marginRight: 5,
                maxHeight: height,
                width: width
            };
            return <imageItem_1.default imageSrcString={imageSrcString} style={style} key={index}/>;
        })}
        </Grid_1.default>);
}
exports.default = ImageGrid;
