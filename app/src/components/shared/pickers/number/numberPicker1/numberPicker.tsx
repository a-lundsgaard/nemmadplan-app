import React, { useEffect, useState } from 'react';
import './style.css'

interface Props {
    label: string,
    onChange: (value: number) => number
    value: number
}

function NumberPicker({  onChange = () => 1, value, label }: Props) {

    const [count, setCount] = useState(1);
    //const str = count < 2 ? 'person' : 'persons';

    const style = {
        content: 'hi'
    }

    const decrementCount = () => {
        if (count < 2) return false;
        setCount(prevCount => prevCount - 1)
        //onChange(count)
    }

    const incrementCount = () => {
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCount(parseInt(e.target.value))
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
