const express = require('express');
const fileUpload = require('express-fileupload');
const parser = require('../models/csv_parser');
const json2html = require('node-json2html');
const fetch = require('node-fetch');
const bodyparser = require('body-parser');
const FormData = require('form-data');

const app = express();
app.use(bodyparser.text());
app.use(bodyparser.json());
app.use(express.urlencoded({extended: false}));
app.use(fileUpload({limits: {type: 'csv'}}));
app.use(express.static('views'));

const theme = 'light'; // 'light' or 'dark'

app.get('/', (req,res)=>{
    res.sendFile('index.html');
})

app.post('/detect', (req,res)=>{

    let initialAnswerHtml ="<!DOCTYPE html>\n" +
        "<html lang=\"en\">\n" +
        " <head>\n" +
        "    <meta charset=\"UTF-8\">\n" +
        "    <title>Anomalies Detection Results</title>\n" +
        "    <h2 id='resultsText'>Error</h2>\n" +
        "    <link rel=\"stylesheet\" href=\"css/"+theme+".css\">\n" +
        "</head>" +
        "<body>";
    let endBodyAnswerHtml = "</body>";


    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send(initialAnswerHtml + 'No files were uploaded.' + endBodyAnswerHtml);
    }
    if (Object.keys(req.files).length === 1) {
        return res.status(400).send(initialAnswerHtml+'Please upload both Train and Test csv files.'+ endBodyAnswerHtml);
    }

    const formData = new FormData();
    formData.append("learnCSV",req.files.learnCSV.data)
    formData.append("testCSV",req.files.testCSV.data)
    formData.append("algorithmSelect",req.body.algorithmSelect)
    fetch(('http://localhost:8080/'),{
        method: 'POST',
        body: formData
    }).then(response => response.json())
        // Print the result
        .then((reports)=>{
            let resultsTable1 ="<!DOCTYPE html>\n" +
                "<html lang=\"en\">\n" +
                " <head>\n" +
                "    <meta charset=\"UTF-8\">\n" +
                "    <title>Anomalies Detection Resuflts</title>\n" +
                "    <h2 id='resultsText'>Anomalies Detection Results &ensp; ("+ req.body.algorithmSelect +" detector)</h2>\n" +
                "    <link rel=\"stylesheet\" href=\"css/"+theme+".css\">\n" +
                "</head>" +
                "<body>" +
                "<table class=\"AnomaliesTable\">\n" +
                "  <thead>\n" +
                "    <tr>\n" +
                "      <th>Descriptions</th>\n" +
                "      <th>Timesteps (Row)</th>\n" +
                "      <th>Anomaly Type</th>\n" +
                "    </tr>\n" +
                "  </thead>\n" +
                "   <tfoot>\n" +
                "      <tr>\n" +
                "        <td colSpan=\"3\" style='text-align: center'> END OF RESULTS </td> \n" +
                "     </tr>\n" +
                "  </tfoot>";
            let resultsTable2 =  "</table></body>";
            let template =
                        {"<>":"tr","html":[
                                {"<>":"td","html":"${description}"},
                                {"<>":"td","style":"text-align: center","html":"${timeStep}"},
                                {"<>":"td","style":"text-align: center","html":"${anomalyType}"}
                            ]}

            let html = json2html.render(reports,template);
            res.write(resultsTable1)
            res.write(html)
            res.write(resultsTable2)
            res.end()
        })
})

app.post('/', (req,res)=>{
    let result = parser.getFileData(req.files.learnCSV,req.files.testCSV,req.body.algorithmSelect)
    res.contentType('application/json')
    res.send(JSON.stringify(result))
    res.end()
})

app.listen(8080);