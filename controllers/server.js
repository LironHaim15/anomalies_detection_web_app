const express = require('express');
const fileUpload = require('express-fileupload');
const parser = require('../models/csv_parser');
const json2html = require('node-json2html');
const fetch = require('node-fetch');
const bodyparser = require('body-parser');
const FormData = require('form-data');
const path = require('path');
const lineReader = require('n-readlines');

const app = express();
app.use(bodyparser.text());
app.use(bodyparser.json());
app.use(express.urlencoded({extended: false}));
app.use(fileUpload({limits: {type: 'csv'}}));
app.use(express.static('views'));

//handle each request type
app.get('/', (req,res)=>{
    //send home page
    res.sendFile('index.html', { root: path.join(__dirname, '../views') });
})

app.post('/detect', (req,res)=>{

    //handle cases where not both files were uploaded.
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).sendFile('errorNoFiles.html', { root: path.join(__dirname, '../views') });
    }
    if (Object.keys(req.files).length === 1) {
        return res.status(400).sendFile('errorOneFile.html', { root: path.join(__dirname, '../views') });
    }
    // check file extension
    let extension1 = req.files.learnCSV.name.substring(req.files.learnCSV.name.lastIndexOf('.') + 1);
    let extension2 = req.files.testCSV.name.substring(req.files.testCSV.name.lastIndexOf('.') + 1);
    if ( extension1.toUpperCase() !== 'CSV' || extension2.toUpperCase() !== 'CSV' ){
        return res.status(400).sendFile('errorNotCSV.html', { root: path.join(__dirname, '../views') });
    }

    //send the received data in post request to '/' and get a JSON fle with the result.
    const formData = new FormData();
    formData.append("learnCSV",req.files.learnCSV.data)
    formData.append("testCSV",req.files.testCSV.data)
    formData.append("algorithmSelect",req.body.algorithmSelect)
    fetch(('http://localhost:8080/'),{
        method: 'POST',
        body: formData
    }).then(response => response.json())

        // parse the result and inject it to result.html and send it.
        .then((reports)=>{

            const liner = new lineReader(path.join(__dirname, '../views/results.html'));

            let line=liner.next()
            for (let i = 0; i < 24; i++) {
                res.write(line);
                line=liner.next();
            }

            let template =
                        {"<>":"tr","html":[
                                {"<>":"td","html":"${description}"},
                                {"<>":"td","style":"text-align: center","html":"${timeStep}"},
                                {"<>":"td","style":"text-align: center","html":"${anomalyType}"}
                            ]}

            let resultsTable = json2html.render(reports,template);

            res.write(resultsTable);
            while (line=liner.next())
                res.write(line);

            res.end()
        })
})

app.post('/', (req,res)=>{

    //call parser to parse the data, learn it and detect anomalies. then send back the results in JSON.
    let result = parser.getFileData(req.files.learnCSV,req.files.testCSV,req.body.algorithmSelect)
    res.contentType('application/json')
    res.send(JSON.stringify(result))
    res.end()
})

app.listen(8080);