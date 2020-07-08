import React from 'react'
import Char from './Char.js'
import { Grid } from '@material-ui/core'

const CharList = ({charsToRead}) => {
    const charsArrayDisplay = charsToRead.map((user, i) =>{
        return(
            <Grid item>
                <Char char={charsToRead[i].char}/>
            </Grid>
        ) 
    })
    return(
        <Grid 
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing = "1">
                {charsArrayDisplay}
        </Grid>    
    )
}

export default CharList