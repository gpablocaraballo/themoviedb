import React, { useReducer, createContext } from "react";

export const MovieContext = createContext();
const initialState = {
  movies: [], //to put search query movies on any response.
  default:[], //necesary for stars "local" filter (if we unclick the selected star, most reset the movies.)
  discovery:[], //first time we set discovery request with this, when input search is blank / "" then we use this to reset.
  current_movie:{}, //when you click a movie and want to see more detail.
  modal:false, //when you click a movie and want to see more detail the modal is enable. When you close, modal is false.
  loading: false, //well, something is loading (the ajax request start or finish)
  error: false //something wrong happen, do you have internet?
};
const reducer = (state, action) => {
    switch (action.type) {
    //First time, the app do the request to movie-discovery.
    case "FILL_DISCOVERY":
        return {
            ...state,
            movies: action.payload.movies,
            discovery: action.payload.movies,
            default: action.payload.movies 
        };
    //When we search a movie title, the result is filled in movies and default json key.    
    case "FILL_MOVIES":
        return {
            ...state,
            movies: action.payload.movies,
            default: action.payload.movies 
        };
    //If the user type blank input text search, then we call SET_DISCOVERY to reset the movie list.
    case "SET_DISCOVERY":
        return {
            ...state,
            movies: state.discovery,
            default: state.discovery //when user type empty, then we reset movies and point to discovery values.
        };
    //When we click a star, then we must apply filter to our movies.
    case "FILTER_STARS":
        return {
            ...state,
            movies: state.movies.filter((movie) => { return (movie.vote_average > action.payload.start && movie.vote_average <= action.payload.end) })        
        };
    //When a star is selected, and the user click again on the SAME start, then we disable the stars and reset the movies.
    case "RESET_MOVIES":
        return {
            ...state,
            movies: state.default
        };
    case "SET_CURRENT_MOVIE":
        return {
            ...state,
            modal:true,
            current_movie: action.payload
        };        
    case "LOADING":
        return {
            ...state,
            loading:action.payload
        };
    case "MODAL":
        return {
            ...state,
            modal:action.payload
        };        
    case "ERROR":
        return {
            ...state,
            error:action.payload
        };
    default:
        throw new Error();
    }
};

export const MovieContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MovieContext.Provider value={[state, dispatch]}>
      {props.children}
    </MovieContext.Provider>
  );
};