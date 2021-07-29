import React, { useState } from "react";
import Grid from '@material-ui/core/Grid';


interface Props {
    imageSrcString: string,
    style: Object
}

/* export default function ImageGrid({imageString }: Props ) {

    const [imgll] = useState('');

    return (
        <img
            src={imageString}
        />
    )
} */



export default function ImageGridItem({ imageSrcString, style }: Props) {

    return (
        <Grid
            item
        >
            <img
                style={
                    style
                }
                src={imageSrcString}
            />
        </Grid>
    )
}