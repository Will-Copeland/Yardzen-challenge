import React, { useState } from 'react'
import { Typography, TextField, List, Paper, Divider, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = {
    root: {
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        height: "fit-content"
    },
    textField: {
        margin: "1rem"
    }
}

function ZipForm(props) {
    const { classes, loading } = props;
    const [zipCodesList, setZipCodesList] = useState([]);

    function handleChange(zipCodeList) {
        // Splits list poorly. Would spend more time on this IRL.
        // Will remove spaces on actual submission to API to
        // prevent a bunch of string operations on every keystroke
        const splitList = zipCodeList.split(",");
        setZipCodesList(splitList);
    }

    //  Called "some" constraints because theres a lot more that
    // I would implement for proper ZIP validation IRL.
    function handleSomeConstraints() {
        // Simply checks if there is a full (at least 5 digits, theres a 9 digit version too)
        // string in the first array item. 

        // Doesnt check that there are no letters, or that the zip in fact
        // even exists
        if (!zipCodesList[0] || loading) {
            return true;
        } else if (zipCodesList[0].length < 5 || loading) {
            return true;
        }
        return false
    }

    function handleSubmit() {
        const { fetchZoneInfo } = props;

        fetchZoneInfo(zipCodesList);
    }
    
    return (
        <Paper className={classes.root} elevation={6}>
            <Typography>Enter Zip Code for Hardiness results</Typography>
            <Divider />
            <TextField 
                className={classes.textField}
                onChange={e => handleChange(e.target.value)}
            />
            <Button 
                onClick={() => handleSubmit()}
                disabled={handleSomeConstraints()}
            >
                {loading ? "Loading" : "Submit"}
            </Button>
            
        </Paper>
    )
}

export default withStyles(styles)(ZipForm)
