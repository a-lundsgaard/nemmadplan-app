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


    const height = 65;
    const width = 100
    const styles = {
         maxHeight: height, 
         width: width 
        }
    return (
        <Grid
            item
           // style={style}
        >
            <img
                style={
                    style
                }
                src={imageSrcString}
            //src={"https://images.arla.com/recordid/96f498c04e7743fc9e8ca6ea0042c0d8/rejepaella.jpg?crop=(0,1258,0,-524)&w=1269&h=715&ak=6826258c&hm=d1853743"}
            />
        </Grid>
    )
}