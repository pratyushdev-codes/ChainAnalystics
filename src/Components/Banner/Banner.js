import { makeStyles } from 'tss-react/mui'
import { Container } from '@mui/system';
import React from 'react'
import { Typography } from '@mui/material';
import Carousel from './Carousel';

const useStyles = makeStyles()(() => ({
    banner: {
        backgroundImage: "url(./banner2.png)",
        width: "100%",
        height: "auto",
        backgroundSize: "100% auto",
        backgroundPosition: "center",
        borderRadius: "200px" // border radius set to a large value to make it round
    },
    bannerContent: {
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around"
    },
    tagline: {
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
    }
}));

const Banner = () => {

    const { classes } = useStyles();

    return (
        <div className={`rounded-full ${classes.banner}`}>
            <Container maxWidth={false} disableGutters>
                <div className={classes.bannerContent}>
                    <div className={classes.tagline}>
                        <Typography variant="h2"
                            style={{
                                fontWeight: "bold",
                                marginBottom:15,
                                color:"White",
                                fontFamily: "Montserrat "
                            }}>
                            CHAIN ANALYTICS
                        </Typography>

                        <Typography variant="subtitle2"
                            style={{
                                color: `linear-gradient(#4776E6,#8E54E9)`,
                                textTransform: "capitalize",
                                fontFamily: "Montserrat",
                                
                            }}>
                            Track your crypto, seize the opportunities.<br/> Get all the info of all your favourite Crypto Coins!
                        </Typography>
                    </div>
                    
                </div>
                
            </Container>
        </div>
    )
}
export default Banner;
