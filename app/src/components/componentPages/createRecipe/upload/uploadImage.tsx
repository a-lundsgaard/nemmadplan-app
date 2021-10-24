import React, { useState, useEffect } from "react";
import './style.css'
import placeholder from './placeholder.png';
import CancelIcon from '@material-ui/icons/Cancel';
import { IconButton } from "@material-ui/core";
import { fil } from "date-fns/locale";

import deleteConvertedImage from "../helpers"
import http from "../../../../HTTP/http";

export default function UploadImage({ onImageUpload, onClose, editPage, ...props }) {


    const [{ alt, src, file }, setImg] = useState({
        src: placeholder,
        alt: 'Upload an Image',
        file: null
    });

    const [originalImgSrc, setOriginalImgSrc] = useState(null)

    useEffect(() => {
        if (props.src) {
            setOriginalImgSrc(props.src)
        }
    }, [])
    
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
    }, [src]);


    const handleImgChange = (e) => {
        
        if(!editPage) {
            if(src.includes('productImage-')) {
                deleteConvertedImage(src)
            }
        }

        if (e.target.files[0]) {
            const file = e.target.files[0];

            if(file.type === 'image/heic') {
                console.log('Fandt fil til upload : ', file)

                const formdata = new FormData();
                const serverFileName = 'IMG-' + Date.now();
                const url = http.baseUrl + "/convertimage"

                formdata.append("productImage", file, serverFileName);
                const requestOptions = {
                    method: 'POST',
                    body: formdata,
                    redirect: 'follow'
                  };
                  
                fetch(url, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log('found result from convert:', result);
                    setImg({
                    // src: URL.createObjectURL(result.imageUrl),
                        src: result.imageUrl,
                        alt: 'pic',
                        file: null
                    });
                })
                .catch(error => console.log('error', error));

            } else {
                console.log('Fandt fil til upload : ', e.target.files[0])
                setImg({
                    src: URL.createObjectURL(e.target.files[0]),
                    alt: e.target.files[0].name,
                    file: e.target.files[0]
                });
            }
  
        }
    }

    const handleImgClose = () => {

        if(!editPage || originalImgSrc != src ) {
            if(src.includes('productImage-')) {
                deleteConvertedImage(src)
            }
        }

        setImg(
            {
                src: placeholder,
                alt: 'Upload an Image',
                file: null
            }
        )
        onClose();
    }

    return (
        <div>
            { src !== placeholder ? <IconButton
                onClick={handleImgClose}
                style={{
                    float: 'right',
                    margin: '-25px 0 0 -22px',
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
                        accept="image/*,image/HEIC"
                        hidden
                        onChange={handleImgChange}
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