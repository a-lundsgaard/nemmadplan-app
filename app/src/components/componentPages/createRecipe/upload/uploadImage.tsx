import React, { useState, useEffect } from "react";
import ImageContainer from "./imageContainer";
import placeholder from './placeholder.png';
import CancelIcon from '@material-ui/icons/Cancel';
import { IconButton } from "@material-ui/core";

import deleteConvertedImage from "../helpers"
import http from "../../../../HTTP/http";
import LinearProgress from '@material-ui/core/LinearProgress';
import { useUploadForm } from "./hooks";


export default function UploadImage({ onImageUpload, onClose, editPage, ...props }) {

    const [{ alt, src, file }, setImg] = useState({
        src: placeholder,
        alt: 'Upload an Image',
        file: null
    });
    const [originalImgSrc, setOriginalImgSrc] = useState(null)

    const { uploadForm, progress } = useUploadForm(http.baseUrl + "/convertimage");

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

    const handleConvertImage = async (file: File) => {
        const formdata = new FormData();
        const serverFileName = 'IMG-' + Date.now();
        formdata.append("productImage", file, serverFileName);
        uploadForm(formdata)
            .then(({ data }) => {
                setImg({
                    src: data.imageUrl,
                    alt: 'pic',
                    file: null
                });
            })
            .catch(error => console.log('error', error));
    };

    const handleImgChange = (e: any) => {
        if (!editPage) {
            if (src.includes('productImage-')) {
                deleteConvertedImage(src)
            }
        }
        if (e.target.files[0]) {
            const file = e.target.files[0];
            if (file.type === 'image/heic') {
                handleConvertImage(file)
            } else {
                setImg({
                    src: URL.createObjectURL(file),
                    alt: file.name,
                    file: file
                });
            }
        }
    }

    const handleImgClose = () => {
        if (!editPage || originalImgSrc != src) {
            if (src.includes('productImage-')) deleteConvertedImage(src)
        }
        setImg({
            src: placeholder,
            alt: 'Upload an Image',
            file: null
        })
        onClose();
    }

    return (
        <div>
            {src !== placeholder ?
                <IconButton
                    onClick={handleImgClose}
                    style={{
                        float: 'right',
                        margin: '-25px 0 0 -22px',
                        zIndex: 1
                    }}  >
                    <CancelIcon />
                </IconButton>
                : null
            }
            {(progress != 0 && progress < 100) ?
                <LinearProgress variant="determinate" value={progress} /> :
                <ImageContainer src={src} alt={alt} onChange={handleImgChange} />
            }
        </div>
    )
}