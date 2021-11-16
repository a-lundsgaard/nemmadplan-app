import React, { useState } from "react";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import IngredientListing from "./ingrdientListing";
import NumberPicker from "../../pickers/number/numberPicker1/numberPicker";

export default function IngredientList({ ingredients, originalPersonCount, ...props }) {

    const [personCount, setPersonCount] = useState(originalPersonCount || 4)
    // test
    return (
        <div>
            <div
                style={{
                    margin: "35px 0 30px 0",
                    display: 'flex'
                }}
            >
                <NumberPicker
                    name="numPicker"
                    onChange={(value: number) => setPersonCount(value)}
                    value={4} // when editing af recipe
                />
            </div>
            {ingredients.map((ingredient, index) =>
                <IngredientListing key={index} ingredient={ingredient} personCount={personCount} originalPersonCount={originalPersonCount}/>
            )}
        </div>
    )
}