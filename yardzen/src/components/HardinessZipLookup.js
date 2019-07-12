import React, { useState } from 'react'
import ZipForm from './ZipForm';
import { withStyles } from '@material-ui/styles';

const styles = {
    root: {
        marginTop: '2rem',
        display: 'flex',
        justifyContent: 'space-around'
    }
};

function HardinessZipLookup(props) {
    const { classes } = props;

    const [zoneInfo, setZoneInfo] = useState([]);

    function parseStrings(arr) {
        // removes spaces on submission. 
        // Would probably want to check for 
        // letters or symbol chars here
        for (let i = 0; i < arr.length; i++) {
            arr[i] = arr[i].replace(" ", "")
        }

        return arr;
    }

    function fetchZoneInfo(codeArray) {
        parseStrings(codeArray);

        codeArray.map(zipCode => {
            fetch(`https://c0bra.api.stdlib.com/zipcode-to-hardiness-zone/?zipcode=${zipCode}`
            ).then(resp => resp.json()).then(data => {
                setZoneInfo(...zoneInfo, data);
            });
        })
      
    };


    console.log(zoneInfo);
    
    return (
        <div className={classes.root}>
            <ZipForm fetchZoneInfo={fetchZoneInfo} />
            {/* RenderedList */}
        </div>
    )
}

export default withStyles(styles)(HardinessZipLookup)
