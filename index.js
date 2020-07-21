const open = require('open');
const fileSys = require('fs');
const express = require('express');
const cors = require('cors');
const app = express(); 


app.use(cors())
app.use(express.json())
app.use(express.static("react-build"));

const utf8Encoding = 'utf8'; 
const filename = process.argv[2];

app.get('/api/filetoedit', (req, res) => {

    fileSys.readFile(filename ,utf8Encoding, (err, buffer) => {
        if(err)
            res.status(404).send('No such file');
        else
            res.send(buffer);
    });
});

app.post('/api/filetoedit', (req, res) => {
    
    fileSys.writeFile(filename, req.body.fileContent, utf8Encoding, (err) => {
        if(err)
            res.status(400).send("Can't save file");
        else
            res.send('File content saved');
    });
})

app.listen(5000, () => console.log("server started on port 5000"));
open('http://localhost:5000');