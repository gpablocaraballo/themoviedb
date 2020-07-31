import React, { Fragment, useEffect, useContext } from "react";
import { MovieContext } from "../../context/movie-context";
import Header from "../common/header";
import Search from "../search";
import Stars from "../stars";
import Modal from "../modal";
import List from "../list";
import Footer from "../common/footer";
import Error from "../error";
import { getMovies } from '../utilities/utils';
import backgroundImg from '../../assets/search-background.jpg';
import './style.css';

const Main = () => {
  // Subscribe to `movies` state and access dispatch function
  const [state, dispatch] = useContext(MovieContext);
    const setLoading = (param) => {
        dispatch({type: "LOADING", payload:param});
    }
    const setError = (param) => {
        dispatch({type: "ERROR", payload:param});
    }    
    const getList = async () => {
        try{
            setLoading(true);
            let resultset = await getMovies(1); //the first time in the app, i ask/load page 1
            if (resultset.data && resultset.data.results !== undefined){
                dispatch({
                    type: "FILL_DISCOVERY",
                    payload: {
                        'movies':resultset.data.results
                    }
                  });
            } else {
                setError(true);
            }
            setLoading(false);
        } catch(err){
            console.log('error in getList',err);
            setLoading(false);
            setError(true);
        }
    }

    /*
    The Hook useEffect is the equivalent to:
    componentDidMount, componentDidUpdate and componentWillUnmount combined.  
    */

    //componentDidMount like...
    useEffect(() => {    
        getList();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
   
    if (state.error){
        return (
            <Error></Error>
        );
    } else  {

        return (
            <div className="container"  style={{backgroundImage: `url(${backgroundImg})`, backgroundRepeat:'no-repeat'}} >
                <Header></Header> 
                <div className="container__movie">                
                    <Fragment>
                        <Search></Search>
                        <Stars />
                        <List></List>
                    </Fragment>
                </div>
                <Footer></Footer>
                <Modal />
            </div>
        );

    }
};
export default Main;