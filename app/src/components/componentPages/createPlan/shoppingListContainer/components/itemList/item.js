import React, { useState, useEffect } from "react";


export default function item({ sale }) {

    return (
        <div
            style={{
                margin: '8px'
            }}
        >
            <img style={{
                maxHeight: 80,
                maxWidth: 80,
            }} src={sale.img} />
        </div>
    )
}