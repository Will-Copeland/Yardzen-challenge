import React from 'react'
import { Paper, Typography, List, ListItem, Divider, CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import ColdIcon from '@material-ui/icons/AcUnit';
import HotIcon from '@material-ui/icons/Whatshot';
import classnames from 'classnames';

const styles = {
    root: {
        width: "60%",
    },
    zone: {
        width: "100%"
    },
    zoneTitle: {
        display: "flex"
    },
    zoneCode: {
        marginLeft: "1.5rem"
    },
    tempRange: {
        display: "flex",
        justifyContent: "space-around",
        marginTop: "1rem"
    },
    icon: {
        width: "80px",
        height: "80px"
    },
    coldIcon: {
        color: "blue"
    },
    hotIcon: {
        color: "red"
    },
    tempIconContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
}

function ZoneInfoList(props) {
    const { classes, zipZones, loading } = props;




    function renderInfo() {
        // The whole "zone item" could be another Component,
        // but I left it here for easier reading
        const { classes } = props;
       const zipZoneTest = [
            {
              "zipcode": "94553",
              "zone": "9b",
              "trange": "25 to 30",
              "zonetitle": "9b: 25 to 30",
              "rangemin": "25",
              "rangemax": "30"
            },
            {
              "zipcode": "94523",
              "zone": "9b",
              "trange": "25 to 30",
              "zonetitle": "9b: 25 to 30",
              "rangemin": "25",
              "rangemax": "30"
            }
          ]

        if (loading) {
            return <CircularProgress />
        }
        
        return zipZones.map((zone, index) => {
            // Looks like your API returns an empty object for an
            // invalid zone
            if (Object.keys(zone).length === 0) {
                // could add logic to display the offending zip code
                return (
                <Typography>
                    Bad Error handling here to tell
                     you your Zip Code is Invalid
                </Typography>
                )
            }

            // render each zone info item/component
            return (
                <React.Fragment>
                    <ListItem className={classes.listItem}>
                        <div className={classes.zone}>
                            
                            <div className={classes.zoneTitle}>
                                <Typography 
                                    style={{
                                        borderRight: "1px solid black",
                                        marginRight: "2rem",
                                        padding: "0.25rem"
                                     }}
                                    variant="h4"
                                >
                                    #{index + 1}
                                </Typography>
                                <Typography className={classes.zipCode} variant="h4">{zone.zipcode}</Typography>
                                <Typography className={classes.zoneCode} variant="h5">{zone.zone}</Typography>
                            </div>
                            <Divider style={{ width: "100%"}} />

                            <div className={classes.tempRange}>
                                <div className={classes.tempIconContainer}>
                                    <ColdIcon className={classnames(classes.coldIcon, classes.icon)} />
                                    <Typography variant="h6">Minimum Temp: {zone.rangemin}</Typography>
                                </div>
                                <div className={classes.tempIconContainer}>
                                    <HotIcon className={classnames(classes.hotIcon, classes.icon)} />
                                    <Typography variant="h6">Maximum Temp: {zone.rangemax}</Typography>
                                </div>
                            </div>
                        </div>
                    </ListItem>
                    <Divider style={{ backgroundColor: "black", width: "50%", margin: "2rem auto 1rem"}} />
                </React.Fragment>
            )
        })
    }



    return (
        <Paper elevation={6} className={classes.root}>
            <Typography style={{ margin: "1rem"}}variant="h3">Your Zones</Typography>
            <Divider style={{height: "2px", backgroundColor: "black"}} />
            <List className={classes.list}>
                {renderInfo()}
            </List>
        </Paper>
    )
}

export default withStyles(styles)(ZoneInfoList);
