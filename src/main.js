import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { 
    FormControl, Select, MenuItem, Button, Typography, TextField,
    InputAdornment, 
} from "@material-ui/core";
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import SelectSearch from 'react-select-search';
import { shows } from './data';
import SearchResult from './components/SearchResult';

const useStyles = makeStyles((theme) => ({
    searchSection: {
        position: "relative",
    },
    searchResults: {
        position: "absolute",
        width: "100%",
        maxHeight: 100,
        overflow: "hidden",
        marginTop: -3,
        paddingTop: 15,
        backgroundColor: "white",
        border: "solid 1px #ccc",
        boxSizing: "border-box",
        borderTop: "none",
        borderRadius: "0 0 4px 4px", 
        zIndex: 5,
        "&:hover": {
            overflow: "overlay",
        }
    },
    sectionTitle: {
        fontSize: "0.8em",
    },
    input: {
        fontSize: "0.8em",
    }
}))

const Main = ({ setTitleShow, setTitleSeason }) => {
    const classes = useStyles();
    const [ tvShows, setTvShows ] = useState(shows);
    const [ notFound, setNotFound ] = useState(false);
    const [ tvShow, setTvShow ] = useState({});
    const [ tvShowName, setTvShowName ] = useState("");
    const [ season, setSeason ] = useState({});
    const [ episode, setEpisode ] = useState({});
    const [ searching, setSearching ] = useState(false);

    const _setTvShowName = (val) => {
        const shows_ = [ ...shows ];
        const regy = new RegExp(val, "gi");

        setTvShowName(val);
        if(!!val.length) {
            const filtered = shows_.filter(sh => sh.title.search(regy) !== -1);
            setNotFound(!filtered.length);
            setTvShows(filtered);
            setSearching(true);
        } else {
            setNotFound(false);
            setTvShows(shows_);
            setSearching(false);
        }
    }

    const _selectShow = (val) => {
        setTvShow(val);
        // alert(val.title)
        setTvShowName(val.title);
        setTitleShow(val.title);
        setSearching(false);
        setSeason({});
    }

    const _selectSeason = (val) => {
        const seas_ = tvShow.seasons.find(ss => ss.id === val);
        setSeason({ ...seas_ });
        setTitleSeason(seas_.title);
    }

    return (
        <div style={{ padding: "20px 30px", }}>
            <div style={{ width: 500 }}>
                <div className={classes.searchSection}>
                    <FormControl fullWidth>
                        <Typography gutterBottom className={classes.sectionTitle} style={{ color: notFound ? "#ff5200" : "inherit" }}>
                            Search TV Shows { notFound ? "Please enter a valid date" : "" }
                        </Typography>
                        <TextField
                            id="standard-disabled"
                            defaultValue="Hello World"
                            variant="outlined"
                            size="small"
                            fullWidth
                            classes={{
                                root: classes.input,
                                input: classes.input,
                            }}
                            style={{ fontSize: "0.8em" }}
                            value={ tvShowName }
                            onChange={(e) => _setTvShowName(e.target.value) }
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        { !searching && (
                                            <SearchIcon style={{ color: "#999", fontSize: 18 }} /> 
                                        )}
                                        { searching && !notFound && (
                                            <CancelIcon 
                                                style={{ color: "#999", fontSize: 18, cursor: "pointer" }} 
                                                onClick={() => _setTvShowName("")} 
                                            /> 
                                        )}
                                    </InputAdornment>
                                ),
                            }}
                        />
                        { searching && !notFound && <div style={{ position: "relative" }}><div className={classes.searchResults}>
                            { tvShows.map(show => <SearchResult key={show.id} show={show} onClick={(sel) => _selectShow(sel)} />) }
                        </div></div> }
                    </FormControl>
                    <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
                        <Button 
                            variant="outlined" 
                            style={{ textTransform: "none", visibility: notFound ? "visible" : "hidden" }}
                            onClick={() => _setTvShowName("")}
                        >Clear</Button>
                    </div>
                </div>
                <div style={{ marginBottom: 30 }}>
                    <div style={{ fontWeight: "bold", marginBottom: 10 }}>{ tvShow?.title }</div>
                    <div>{ tvShow?.summary }</div>
                </div>
                <div style={{ marginBottom: 80 }}>
                    { !!tvShow?.seasons && (
                        <FormControl fullWidth size="small">
                            <Typography gutterBottom className={classes.sectionTitle}>
                                Seasons
                            </Typography>
                            <Select
                                variant="outlined"
                                fullWidth
                                size="small"
                                placeholder="Select form screen"
                                classes={{
                                root: classes.select,
                                }}
                                value={ season?.id || "choose"}
                                onChange={(e) => _selectSeason(e.target.value)}
                            >
                                <MenuItem value="choose" selected disabled>Select show season</MenuItem>
                                { tvShow?.seasons.map(season => (
                                    <MenuItem key={season.id} value={season.id}>{season.title}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                </div>
            </div>
            { !!season?.episodes?.length && (
                <div style={{ marginBottom: 150, position: "relative" }}>
                    <div style={{ width: "100%", height: 5, border: "solid 1px #ccc", borderRadius: 3 }}></div>
                    <div style={{ position: "absolute", top: -1, display: "flex", justifyContent: "space-between", width: "100%" }}>
                        { season?.episodes.map(epi => (
                            <div style={{ position: "relative" }}>
                                <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "#ff5200", boxShadow: "1px 1px 2px #999" }}></div>
                                <div style={{ fontSize: "0.6em", width: 40, textAlign: "center", position: "absolute", left: -15 }}>{ epi.title }</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Main;