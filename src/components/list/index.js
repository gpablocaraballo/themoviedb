import React, { Fragment, useContext, useEffect, useState } from "react";
import './style.css';
import { MovieContext } from "../../context/movie-context";
import Loading from "../loading";
import noResult from '../../assets/noresult.jpg';
import noImage from '../../assets/no-image.jpg';

export default function List() {
    // Subscribe to `movies` state and access dispatch function
    const [state, dispatch] = useContext(MovieContext);
    const [isloading, setIsLoading] = useState(true);
    const minWidthImg = 154;  //{"w92", "w154", "w185", "w342", "w500", "w780", or "original"}
    const minHeigthImg = 231;
    const getDetail = (item) => {
        dispatch({type: "SET_CURRENT_MOVIE", payload:item});
    }
    const setModal = (param) => {
        dispatch({type: "MODAL", payload:param});
    }
    const failImg = (e) => {
        //the image url maybe its a "not found" image, so...
        e.target.src = noImage;
    }    
    const getImage = (item) => {
        //{"w92", "w154", "w185", "w342", "w500", "w780", or "original"}
        if (!item)
            return noImage;
        else
            return 'http://image.tmdb.org/t/p/w' + minWidthImg + item;
    }
    /*
    The Hook useEffect is the equivalent to:
    componentDidMount, componentDidUpdate and componentWillUnmount combined.  
    */

    //componentDidUpdate like... 
    useEffect(() => {
        if (state.loading !== isloading){
            setIsLoading(state.loading);
            setModal(false);
        }
        // eslint-disable-next-line
    }, [state.loading]);

    return (
        <div className="main-movies">
            {state.loading && (
                        <Loading></Loading>
            )}
            {(!state.loading && state.movies.length > 0) && (
            <Fragment>
                <div className="main-movies__list" >
                    {state.movies.map((movie, index) => {
                        return (
                            <div className="movies__item" style={{'minWidth':minWidthImg+'px','minHeight':minHeigthImg+'px'}} key={index} onClick={() => getDetail(movie)} >
                                <div className="movies__mainvote" style={{'minWidth':minWidthImg+'px'}} >
                                    <div className="movies__vote" >
                                        <div className="movies__votenumber" >
                                            {movie.vote_average}
                                        </div>
                                    </div>                                
                                </div>
                                <img src={getImage(movie.poster_path)} onError={failImg} alt={movie.title} />
                            </div>
                        )
                    })}
                </div>
            </Fragment>
            )}
            {(!state.loading && state.movies.length === 0) && (
            <div className="main-movies__list" >
                <img src={noResult} alt="No results" />
            </div>
            )}            
        </div>
    );

}