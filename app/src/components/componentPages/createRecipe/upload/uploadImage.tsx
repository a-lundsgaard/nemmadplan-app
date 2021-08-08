import React, { useState, useEffect } from "react";
import './style.css'

import placeholder from './placeholder.png';



export default function UploadImage({ onImageUpload, ...props }) {


    const [{ alt, src }, setImg] = useState({
        src: placeholder,
        alt: 'Upload an Image'
    });

    useEffect(() => {
        if (props.src) {
            setImg({
                alt: alt,
                src: props.src,
            });
        }
        if (!props.src) {
            setImg({
                src: placeholder,
                alt: 'Upload an Image'
            });
        }
    }, [props.src])


    useEffect(() => {
        if (src !== placeholder) onImageUpload(src)
    }, [src])


    const handleImg = (e) => {
        if (e.target.files[0]) {
            setImg({
                src: URL.createObjectURL(e.target.files[0]),
                alt: e.target.files[0].name
            });
        }
    }

    return (
        <div className={"container"}>
            <img src={src} alt={alt} className={"image"} />

            <div className={"middle"}>
                <label className={"text"} htmlFor="img">+</label>
                <input
                    type="file"
                    id="img"
                    name="img"
                    accept="image/*"
                    hidden
                    onChange={handleImg}
                />
            </div>
        </div>
    )
}

