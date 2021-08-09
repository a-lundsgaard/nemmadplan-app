import React, { useState, useEffect } from "react";
import './style.css'

import placeholder from './placeholder.png';
import CancelIcon from '@material-ui/icons/Cancel';
import { IconButton } from "@material-ui/core";



export default function UploadImage({ onImageUpload, ...props }) {


    const [{ alt, src, file }, setImg] = useState({
        src: placeholder,
        alt: 'Upload an Image',
        file: null
    });

    useEffect(() => {
        if (props.src) {
            setImg({
                alt: alt,
                src: props.src,
                file: null
            });
        }
        if (!props.src) {
            setImg({
                src: placeholder,
                alt: 'Upload an Image',
                file: null
            });
        }
    }, [props.src])


    useEffect(() => {
        if (src !== placeholder) onImageUpload({ src, file })
    }, [src])


    const handleImg = (e) => {
        if (e.target.files[0]) {
            //e.target.value = ''
            console.log('Fandt fil til upload : ', e.target.files[0])
            setImg({
                src: URL.createObjectURL(e.target.files[0]),
                alt: e.target.files[0].name,
                file: e.target.files[0]
            });
        }
    }

    return (
        <div>
            { src !== placeholder ? <IconButton
                onClick={() => setImg(
                    {
                        src: placeholder,
                        alt: 'Upload an Image',
                        file: null
                    }
                )}
                style={{
                    float: 'right',
                    margin: '-24px 0 0 -20px',
                    zIndex: 1
                }}  >
                <CancelIcon />
            </IconButton> : null
            }
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
                        accept="image/*"
                        hidden
                        onChange={handleImg}
                        value={''} // for detecting change when uploading same file twice
                    />
                </div>
            </div>
        </div>
    )
}







          /*               const formdata = new FormData();
                        const serverFileName = 'IMG-' + Date.now()
                        formdata.append("productImage", e.target.files[0], serverFileName);
            
                        const requestOptions = {
                            method: 'POST',
                            body: formdata,
                            redirect: 'follow'
                        };
            
                        fetch("http://localhost:8080/uploads", requestOptions)
                            .then(response => response.json())
                            .then(result => console.log(result))
                            .catch(error => console.log('error', error));   */