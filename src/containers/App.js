import React from 'react';
import CharList from '../components/CharList.js';
import CharInput from '../components/CharInput';
import NavBar from '../components/NavBar';
import Hint from '../components/Hint'
import {Grid, Paper} from '@material-ui/core';
import './App.css'

var charsToRead = [{
    char:'あ',
    romaji:''
}, {
    char:'い',
    romaji:''
},
{
    char:'た',
    romaji:''
},
{
    char:'な',
    romaji:''
},
{
    char:'さ',
    romaji:''
},
{
    char:'ち',
    romaji:''
},
]

const App = () => {
    return (
        <div className='tc'>
            <NavBar/>
            <Grid container direction="column" justify="center" alignItems="center">
            <Paper elevation={0}/>
                <h1>Learn Hiragana on the go</h1>
                <CharInput/>
                <Grid container direction="column" justify="center" alignItems="center">
                    <Grid item>
                        <CharList charsToRead={charsToRead}/>
                    </Grid>
                    <Grid item>
                    <Paper elevation = {1}/>
                        <Hint/>
                    </Grid>
                </Grid>
                
            </Grid>
            
        </div>
    )
}

export default App