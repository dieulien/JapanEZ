const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json())

const wordDatabase = [{
    word: 'AAA',
    audio: 'aaa',
    familiarity: 0
},
{
    word: 'BBB',
    audio: 'aaa',
    familiarity: 0
},
]

const charDatabase = [
    {
        char: 'あ',
        familiarity: 0
    },
    {
        char:'い',
        familiarity: 0
    },
    {
        char:'う',
        familiarity: 0
    },
    {
        char:'え',
        familiarity: 0
    },
    {
        char:'な',
        familiarity: 0
    }
]

app.get('/', (req, res) => {
    //res.send('hello world');
    res.send(charDatabase)
})

app.post('/char', (req, res) =>{
    console.log('start')
    const {charAndFamiliarityPairs} = req.body;
    console.log(charAndFamiliarityPairs)
    charDatabase.forEach(charInDatabase =>{
        console.log('char in database', charInDatabase.char)
        charAndFamiliarityPairs.forEach(itemToUpdate =>{
            if (charInDatabase.char == itemToUpdate.char){
                console.log('char in itemtoupdte', itemToUpdate.char)
                charInDatabase.familiarity += itemToUpdate.familiarityDelta
                //charInDatabase.familiarity ++
                console.log(charDatabase)
            }
        })
    })
    //return res.json(charDatabase)
    res.send(charDatabase)
})

app.put('/test', (req, res) =>{
    const {char, delta} = req.body;
    charDatabase.forEach(charInDatabase =>{
        console.log(charDatabase.char)
        if (charInDatabase.char == char){
            charInDatabase.familiarity += delta
        }
    res.send(charDatabase)
    })
})

app.listen(3000);