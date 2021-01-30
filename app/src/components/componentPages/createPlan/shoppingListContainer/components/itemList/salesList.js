import React, { useState, useEffect } from "react";
import SaleItem from './item';


export default function salesList({ sales, open }) {

    const style = {
        marginTop: '20px',
        height: '100%',
        opacity: open ? 0 : 0.4,
        transition: "opacity 0.8s ease-in-out"
    }

    return (
        <div style={style}>{
                sales.map((sale, index) => {
                    return sale.img && <SaleItem sale={sale} key={index} />
                })
            }
        </div>
    )
}