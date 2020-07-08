import React from 'react';
import '../containers/App.css'
import {Input} from '@material-ui/core'

const CharInput = () => { 
    return (
            <Input placeholder="Start typing here..." inputProps={{ 'aria-label': 'description' }} />
    )
}

export default CharInput