import React, { useContext, useState, useEffect } from "react";
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
        //
        //console.log('text ' + e.target.value + ' movie ' + movie);
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
    
    /*
    The Hook useEffect is the equivalent to:
    componentDidMount, componentDidUpdate and componentWillUnmount combined.  
    */

    //componentDidUpdate like... 
    useEffect(() => {

        /*
        little fix for asynchronism: 
        ¿what happen if the response take too long and you clean the input text just in the middle?
        well, the "movie-discovery" data take the priority always on blank text.
        so... we must ask if the movie text search is "" before the final fill.
        Another "valid" solution could be, disable the input while loading a ajax request.
        or add a "Search" button to only do the search thing with the click button event.

        The button "Go/Search": Putting a button to search for movies maybe is the cleanest solution.
        I dont use it for this challenge, but... for asynchronism or slow key event with states its the best solution (its just my opinion).
        */        

        //the movie search input is filled?, then i trigger ajax request
        if (myTrim(movie) !== ""){
            search(movie);
        } else {

            /*            
            for fix asynchronism, on blank input, i dont do an ajax request (there is no need) so...
            i dont often use setTimeout... i dont like it but well, here it is...
            there is a lot of info in stackoverflow with input change problems and synchronism/asynchronism problems.

            For me there is no need to call ajax request for movie-discovery over and over, 
            i called once (when the app starts) and then i use it locally.
            */

            setTimeout(()=>{
                //on empty input, i reset to discovery movie, with my client side data.
                dispatch({type: "SET_DISCOVERY"});
            },200);
        
        }
        // eslint-disable-next-line
    }, [movie]);

    return (
        <div className="mainsearch" >
            <div className='search' >
                <div className="search_text">
                    <input id="text" className="inputSearch" type="text" onChange={changeText} onKeyUp={changeText} value={movie} placeholder={placeHolderText} />
                </div>
            </div>
        </div>
    );    

};

export default Search;