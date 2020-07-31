import React, { useContext } from "react";
import { MovieContext } from "../../context/movie-context";
import iconClose from '../../assets/close-x.png';
import noImage from '../../assets/no-image.jpg';
import './style.css';

const Modal = () => {
    // Subscribe to `movies` state and access dispatch function
    const [state,dispatch] = useContext(MovieContext);
    const className = state.modal?"modal modal--show":"modal modal--hide";
    const setClose = () => {
        dispatch({
            type: "MODAL",
            payload: false
        });
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
            return 'http://image.tmdb.org/t/p/w185' + item;
    }    
    if (!state.modal){
        return null;
    } else {
        return (
            <div className={className} >
                <div className="modal__close" >
                  <div className="modal__close-x" >
                    <img src={iconClose} className="modal__close-img" 
                    onClick={setClose}
                    alt="Close" title="Close" />
                  </div>  
                </div>
                <div className="movie" >
                  <div className="movie__img" >
                    <img src={getImage(state.current_movie.poster_path)} onError={failImg} alt={state.current_movie.title} />
                  </div>
                  <div className="movie__info" >
                    <div className="movie_title">{state.current_movie.title}</div>
                    <div className="movie_release_date">Release: {state.current_movie.release_date}</div>
                    <div className="movie_overview">{state.current_movie.overview}</div>
                    <div className="movie_rating">Rating {state.current_movie.vote_average}</div>
                  </div>
                </div>
            </div>
        );
    }

};

export default Modal;