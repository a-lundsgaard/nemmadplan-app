import React, { useEffect, useState } from 'react';
import './style.css'

function NumberPicker({ label, onChange, value }) {

    //  console.log(onChange)
    // console.log(label)

    const [count, setCount] = useState(1);
    const str = count < 2 ? 'person' : 'persons';

    const style = {
        content: 'hi'
    }

    const decrementCount = (e) => {
        if (count < 2) return false;
        setCount(prevCount => prevCount - 1)
        //onChange(count)
    }

    const incrementCount = (e) => {
        setCount(prevCount => prevCount + 1)
        // onChange(count)
    }

    useEffect(() => {
        console.log('Changed count: ' + count)
        onChange(count)
    }, [count])

     useEffect(() => {
        if(value) setCount(value) // when scraping a receipt
    }, [value]) 

    const handleChange = (e) => {
        // console.log(e.target.value)
        setCount(e.target.value)
        // onChange(count)
        console.log('Changed')
    }

    return (

        <div className="plusminus horiz">
            <button onClick={decrementCount} />
            <input onChange={handleChange}
                type="number"
                name="productQty"
                value={count}
                min="1" max="50" />
            <button onClick={incrementCount} />
        </div>

    )
}

export default NumberPicker;
