import React, { useState, useEffect } from 'react';
import './style.css'

interface Props {
    src: string
    alt: string
    onChange: React.ChangeEventHandler<HTMLInputElement>
}

export default function ImageContainer({src, alt, onChange, ...props}: Props) {
    return (
        <div className={"container"}>
            <img
                src={src}
                alt={alt}
                className={"image"}
            />
            <div className={"middle"}>
                <label className={"text"} htmlFor="img">+</label>
                <input
                    type="file"
                    id="img"
                    name="productImage"
                    accept="image/*,image/HEIC"
                    hidden
                    onChange={onChange}
                    value={''} // for detecting change when uploading same file twice
                />
            </div>
        </div>

    );
}


