import React from 'react';
import '../containers/App.css'

const Char = (props) => {
    return(
        <div className = "tmw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
            <h1 className='char'>
            {props.char}</h1>
        </div>
    )
}

export default Char