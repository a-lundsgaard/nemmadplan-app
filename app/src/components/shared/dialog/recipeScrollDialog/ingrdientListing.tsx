import React, { useState } from "react";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


export default function IngredientListing({ ingredient, personCount, originalPersonCount, ...props }) {

    // test
    const quantity = Number(ingredient.quantity) ? ingredient.quantity/originalPersonCount*personCount : "";

    return (
        <div>
            <input style={{
                cursor:'pointer'
            }} 
            type="checkbox" id={ingredient.name} name={ingredient.name} value={ingredient.name} />
            <label> {`${quantity} ${ingredient.unit ? ingredient.unit.replace("*", '') : ''} ${ingredient.name}`.trimLeft()}</label>
        </div>
    )
}