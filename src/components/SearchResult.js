import React, { useState } from 'react';
import moment from 'moment';
import { makeStyles } from "@material-ui/core/styles";

const SearchResult = ({ show, onClick }) => {
    const [ hover, setHover ] = useState(false);
    const [ season, setSeason ] = useState({});
    const [ episode, setEpisode ] = useState({});

    const useStyles = makeStyles((theme) => ({
        searchSection: {
            position: "relative",
        },
        searchResult: {
            fontSize: "0.8em",
            padding: 10,
            backgroundColor: hover ? "#eee" : "#fff",
            display: "flex",
            flexDirection: "row",
            cursor: "default",
            // justifyContent: "space-between",
            "& > span": {
                // flex: 1,
            }
        }
    }))

    const classes = useStyles();


    return (
        <div 
            className={classes.searchResult} 
            onMouseEnter={() => setHover(true)} 
            onMouseLeave={() => setHover(false)}
            onClick={() => onClick(show)}
        >
            <span style={{ fontWeight: hover ? "bold" : "normal", width: 200 }}>{ show.title }</span>
            <span style={{ opacity: 0.5, width: 190 }}>premiered on { moment(show.premiereDate).format("MMM DD, YYYY") }</span>
            <span style={{ textAlign: "right", paddingRight: 20 }}>Rating: { show.rating || "Unknown" }</span>
        </div>
    )
}

export default SearchResult;