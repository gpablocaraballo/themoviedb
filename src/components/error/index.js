import React from 'react';
import './style.css';

function Error() {
        return(
            <div className="error" >
                Ups, there was an error, please reload the page.
                <br /><span className="error__sorry">Sorry...</span>
            </div>
        );
}
export default Error;