import React, { useState } from 'react'
import ZipForm from './ZipForm';
import { withStyles } from '@material-ui/styles';
import ZoneInfoList from './ZoneInfoList';

const styles = {
    root: {
        marginTop: '2rem',
        display: 'flex',
        justifyContent: 'space-around',
        margin: "auto"
    }
};

function HardinessZipLookup(props) {
    const { classes } = props;

    const [zoneInfo, setZoneInfo] = useState([]);
    const [loading, setLoading] = useState(false)

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
         setLoading(true);
        const parsedArr = parseStrings(codeArray);
        const promises = parsedArr.map(zipCode => {
             return fetch(`https://c0bra.api.stdlib.com/zipcode-to-hardiness-zone/?zipcode=${zipCode}`
            ).then(resp => resp.json()).then(data => {

                return Promise.resolve(data);
            }).catch(e => Promise.reject(new Error(e)))
        })

        Promise.all(promises).then(value => {
            setZoneInfo(value); 
            setLoading(false);
        });
    };

    
    return (
        <div className={classes.root}>
            <ZipForm fetchZoneInfo={fetchZoneInfo} loading={loading} />
            <ZoneInfoList loading={loading} zipZones={zoneInfo} />
        </div>
    )
}

export default withStyles(styles)(HardinessZipLookup)
