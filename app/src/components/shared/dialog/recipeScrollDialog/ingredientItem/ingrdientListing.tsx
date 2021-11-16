import React, { useState } from "react";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import './styles.css'

export default function IngredientListing({ ingredient, personCount, originalPersonCount, ...props }) {

    console.log('Fandt origianl person count : ', personCount, originalPersonCount);
    
    const quantity = typeof ingredient.quantity == 'number' ? ingredient.quantity / originalPersonCount * personCount : "";

    const [checked, setChecked] = useState(false);

    return (

        <div style={{
            display: 'flex',
            margin: '5px 0 0 0'
        }} >
            <input style={{
                cursor: 'pointer',
                margin: '12px 10px 0 0'
            }}
                type="checkbox" id={ingredient.name} name={ingredient.name} value={ingredient.name}
                checked={checked}
                onChange={() => setChecked(!checked)}
            />
            <li>


                <label
                    style={{
                        textDecoration: checked ? 'line-through' : undefined,
                        //margin: '0 0 0 12px'
                    }}
                >
                    {`${quantity} ${ingredient.unit ? ingredient.unit.replace("*", '') : ''} ${ingredient.name}`.trimLeft()}</label>
            </li></div>
    )
}