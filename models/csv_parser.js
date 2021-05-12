let simpleDetector = require('./detector/SimpleAnomalyDetector');
let hybridDetector = require('./detector/HybridAnomalyDetector');

function getFileData(learnFile, testFile, algoType){

    //parse both files
    let learnJs = Parser(learnFile);
    let testJs = Parser(testFile);

    //call detector according the chosen detector.
    if (algoType === "simple"){
        let simple = new simpleDetector();
        simple.learnNormal(learnJs);
        return simple.detect(testJs);
    }
    else if(algoType === "hybrid"){
        let hyb = new hybridDetector();
        hyb.learnNormal(learnJs);
        return hyb.detect(testJs);
    }
}

//parse csv file to JSON object. first line contains the name of the columns.
function Parser(file){

    let data = file.data.toString()

    let arr= data.split("\n");

    let keys=arr[0].split(',');
    let rows=arr.length;
    let cols=keys.length;

    let obj = {};

    let i,j=0;
    for (i = 1; i < rows-1; i++) {
        let line = arr[i].split(',');
        for (j = 0; j < cols; j++) {

            let header =keys[j].substring(0, keys[j].length);
            let value = parseFloat(line[j]);
            if (!obj[header]){
                obj[header] = [];
            }
            obj[header].push(value);
        }
    }

    return obj;

}
module.exports.getFileData=getFileData;