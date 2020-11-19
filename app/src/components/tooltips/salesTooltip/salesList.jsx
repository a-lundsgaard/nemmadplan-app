import React, { useState, useEffect } from "react";




export default function salesList({ sales }) {

  return (
    <ul style={{ overflow: 'scroll', maxHeight: 500 }}>
      {
        sales.map(item => (<div key={Math.random()}>
          <li color="inherit">{item.price}kr, {item.quantity} {item.unit}, {item.title}, {item.chain}<img style={{ maxHeight: 100 }} src={item.img} /></li>

        </div>))
      }
    </ul>
  )
}