import React from 'react';
import './style.css';
import iconoLoading from '../../assets/loading.svg';
function Loading() {
        return(
            <div className="loading" >
                <div className="loading__img" >
                    <img src={iconoLoading} alt="Loading..." />
                </div>
                <div className="loading__txt" >
                Loading...
                </div>                
            </div>
        );
}
export default Loading;