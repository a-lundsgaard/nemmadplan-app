import React, { useState } from "react";
import Grid from '@material-ui/core/Grid';

import ImageGridItem from './imageItem';


interface Props {
    imageString: string,
    imageArray: Array<string>
}

/* export default function ImageGrid({imageString }: Props ) {

    const [imgll] = useState('');

    return (
        <img
            src={imageString}
        />
    )
} */



export default function ImageGrid({ imageArray }: Props) {

    const imgString = "https://www.redwhitecellar.co.nz/wp-content/uploads/2020/07/Los-Cardos-logo_no-bkgd-1.png"
    const filledArray = imageArray;
    if (filledArray.length < 4) {
        while (filledArray.length < 5) filledArray.push(imgString)
    }

    const height = 65;
    const width = 120

    return (
        <Grid
            container
            style={{
                //border: '1px solid dimgray'
            }}
        >
            {
                /*                 Array(6)
                                  .fill(1)  */
                filledArray
                    .slice(0, 4)
                    .map((imageSrcString, index) => {
                        const style = index % 2 ?
                            {
                                maxHeight: height,
                                width: width
                            } : {
                                marginRight: 5,
                                maxHeight: height,
                                width: width
                            }
                        return <ImageGridItem
                            imageSrcString={imageSrcString}
                            style={style}
                            //imageSrcString={"https://images.arla.com/recordid/96f498c04e7743fc9e8ca6ea0042c0d8/rejepaella.jpg?crop=(0,1258,0,-524)&w=1269&h=715&ak=6826258c&hm=d1853743"}

                            key={index}
                        />
                    })
            }
        </Grid>
    )
}