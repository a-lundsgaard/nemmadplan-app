"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
function RecipeList(props) {
    const sortedArray = props.recipies.sort((a, b) => a.date - b.date);
    return (<Grid_1.default container spacing={3}>
      {sortedArray.map((recipe) => {
        <Grid_1.default key={index} item>


          </Grid_1.default>;
    })}
    </Grid_1.default>);
}
exports.default = RecipeList;
