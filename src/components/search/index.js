import React, { useContext, useState } from "react";
import { MovieContext } from "../../context/movie-context";
import {getSearchMovies,myTrim} from "../utilities/utils";
import './style.css';

const Search = () => {
    const [movie, setText] = useState("");
    const minsearchlength = 1;
    let placeHolderText = "Movie search, " + minsearchlength + " letters at least"; //we could do a search with a minimal text length
    placeHolderText = "Search for a movie..."; //I like this placeholder for 1 letter search length

    // Subscribe to `movies` state and access dispatch function
    const [state,dispatch] = useContext(MovieContext);

    const setLoading = (param) => {
        dispatch({type: "LOADING", payload:param});
    }
    const setError = (param) => {
        dispatch({type: "ERROR", payload:param});
    }
    const changeText = (e) => {
        setText(e.target.value);
        search(e.target.value);
    }
    const search = async (text) => {
        try{
                let resultset;
                if (myTrim(text) === ""){                    
                    dispatch({type: "SET_DISCOVERY"});
                } else if (myTrim(text).length >= minsearchlength){
                    setLoading(true);
                    resultset = await getSearchMovies(text);

                    if (resultset.data && resultset.data.results !== undefined){
                        dispatch({
                            type: "FILL_MOVIES",
                            payload: {
                                'movies':resultset.data.results
                            }
                        });
                    } else {
                        setError(true);
                    }
                    setLoading(false);
                                    
                }            

        } catch(err){
            console.log('error on search',err);
            setLoading(false);
            setError(true);
        }
    }  
  
    return (
        <div className="mainsearch" >
            <div className='search' >
                <div className="search_text">
                    <input id="text" className="inputSearch" type="text" onChange={changeText} value={movie} placeholder={placeHolderText} />
                </div>
            </div>
        </div>
    );    

};

export default Search;