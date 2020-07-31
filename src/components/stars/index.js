import React, { useContext, useEffect, useState } from "react";
import { MovieContext } from "../../context/movie-context";
import './style.css';
import filledStar from '../../assets/filledstar.png';
import emptyStar from '../../assets/emptystar.png';

const Stars = () => {
    const [rating, setRating] = useState(0);
    const [isloading, setIsLoading] = useState(true);
    const stars = [{start:-1,end:2},{start:2,end:4},{start:4,end:6},{start:6,end:8},{start:8,end:10}];

    // Subscribe to `movies` state and access dispatch function
    const [state,dispatch] = useContext(MovieContext);

    const setStars = (e) => {
    
        let star_number = e.target.id;
        dispatch({
            type: "RESET_MOVIES"
        });        
        if (rating === star_number){
            setRating(0);
        }else{
            setRating(star_number);
            dispatch({
                type: "FILTER_STARS",
                payload: stars[(star_number-1)]
            });
        }
    }
    const getImage = (index) => {
        if (rating  >= index)
            return  filledStar
        else    
            return emptyStar;
    }

    /*
    The Hook useEffect is the equivalent to:
    componentDidMount, componentDidUpdate and componentWillUnmount combined.  
    */

    //componentDidUpdate like... 
    useEffect(() => {
        if (state.loading !== isloading){
            setIsLoading(state.loading);
            setRating(0);
        }
        // eslint-disable-next-line
    }, [state.loading]);    

    return (
        <div className="mainstar" >
            <div className="mainstar__rating">
                Rating filter:
            </div>
            <div className="mainstar__stars">
                {stars.map((item,index) => {
                    return (
                        
                            <img id={(index+1)} key={(index+1)} src={getImage(index+1)} onClick={setStars} alt={((index+1)+" star rating")} />
                        
                    )
                })}
            </div>            
        </div>
    );    

};

export default Stars;