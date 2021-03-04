import React, {useState, useEffect} from "react";
import './style.css'


export default function uploadImage(props) {

    const [imageUrl, setImageUrl] = useState('')

    useEffect(()=>{

        setImageUrl(props.src)
    }, [props.src])



  return (
    <div className={"container"}>
        <img src={imageUrl || 'https://aosa.org/wp-content/uploads/2019/04/image-placeholder-350x350.png'} alt="Kan ikke finde billede" className={"image"}/>

        <div className={"middle"}>
        <label className={"text"} htmlFor="img">+</label>
            <input  type="file" id="img" name="img" accept="image/*" hidden/>
        </div>
    </div>
  )
}

