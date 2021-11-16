import React, { useState } from "react";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import IngredientListing from "./ingredientItem/ingrdientListing";
import NumberPicker from "../../pickers/number/numberPicker1/numberPicker";

export default function IngredientList({ ingredients, originalPersonCount, ...props }) {

    const [personCount, setPersonCount] = useState(originalPersonCount || 4)
    // test
    return (
        <div style={{
            // margin: "35px 0 30px 0",
            alignItems: "center"
        }} >
            <div
                className={'numPickerContainer'}
                style={{
                    margin: "35px 0 30px 0",
                    display: 'flex'
                }}
            >
                <NumberPicker
                    name="numPicker"
                    onChange={(value: number) => setPersonCount(value)}
                    value={originalPersonCount} // when editing af recipe
                />
            </div>
            <ul
                className={'ingredientList'}
                style={{
                    listStylePosition: 'outside',
                    listStyleType: 'none',
                    paddingLeft: 12,
                    //margin: '0 0 0 8px'
                }}>
                {ingredients.map((ingredient, index) =>
                    <IngredientListing key={index} ingredient={ingredient} personCount={personCount} originalPersonCount={originalPersonCount} />
                )}
            </ul>
        </div>
    )
}