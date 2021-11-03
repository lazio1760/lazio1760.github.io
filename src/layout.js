import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Main from './main';

const useStyles = makeStyles((theme) => ({
    page: { 
        width: 900, 
        backgroundColor: "white", 
        margin: "auto", 
        boxShadow: "5px 5px 10px #AAA" 
    },
    header: {
        backgroundColor: "#DDD",
        display: "flex",
        alignItems: "center",
        fontSize: "0.9em",
        padding: 20,
    },
    body: {
        display: "flex",
    },
    content: {
        flex: 1,
    },
    sidebar: {
        width: 200,
        height: 300,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    circle: {
        width: 30,
        height: 30,
        backgroundColor: "#ff5200",
        borderRadius: 15,
    },
    tvShow: {
        width: 170,
        height: "100%",
        backgroundColor: "#DDD",
        letterSpacing: 5,
        wordBreak: "break-all",
        fontSize: "6em",
        lineHeight: 1,
    },
    footer: {
        borderTop: "solid 2px #ccc",
        paddingTop: 15,
        margin: 30,
    },
    footerSection: {
        fontSize: "0.7em",
    },
    footerSectionTop: {
        marginBottom: 10,
        "& > span": {
            color: "#ff5200"
        }
    },
    footerSectionBase: {

    },
    footerSectionL1: {

    },
    footerSectionL2: {

    },
    footerSectionL3: {

    },
}));

const Layout = () => {
    const classes = useStyles();
    const [ titleShow, setTitleShow ] = useState("");
    const [ titleSeason, setTitleSeason ] = useState("");

    return (
        <div className={classes.page}>
            <div className={classes.header}>{ !!titleShow ? `${titleShow} | ${titleSeason}` : "TV SHows" }</div>
            <div className={classes.body}>
                <div className={classes.content}>
                    <Main 
                        setTitleShow={(t) => setTitleShow(t)} 
                        setTitleSeason={(t) => setTitleSeason(t)} 
                    />
                    <div className={classes.footer}>
                        <div style={{ fontWeight: "bold", marginBottom: 20 }}>Contact us</div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div className={classes.footerSection}>
                                <div className={classes.footerSectionTop}><span>Address</span> | Mailing</div>
                                <div className={classes.footerSectionBase}>
                                    <div className={classes.footerSectionL1}>Primary Address Line</div>
                                    <div className={classes.footerSectionL2}>Secondary Address Line</div>
                                    <div className={classes.footerSectionL3}>12345 Postal Code</div>
                                </div>
                            </div>
                            <div className={classes.footerSection}>
                                <div className={classes.footerSectionTop}><span>Phone</span> | Ring! Ring!</div>
                                <div className={classes.footerSectionBase}>
                                    <div className={classes.footerSectionL1}>Headline</div>
                                    <div className={classes.footerSectionL2}>+1 123 456 789</div>
                                </div>
                            </div>
                            <div className={classes.footerSection}>
                                <div className={classes.footerSectionTop}><span>E-mail</span> | Swoosh!</div>
                                <div className={classes.footerSectionBase}>
                                    <div className={classes.footerSectionL1}>email@email.com</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.sidebar}>
                    <div className={classes.circle}></div>
                    <div className={classes.tvShow}>TVSHOW</div>
                </div>
            </div>
        </div>
    )
}

export default Layout;