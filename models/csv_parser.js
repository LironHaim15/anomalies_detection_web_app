let simpleDetector = require('./detector/SimpleAnomalyDetector');
let hybridDetector = require('./detector/HybridAnomalyDetector');

function getFileData(learnFile, testFile, algoType){

    let learnJs = Parser(learnFile);
    let testJs = Parser(testFile);

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

function Parser(file){

    let jArray= [];
    let data = file.data.toString()

    let arr= data.split("\n");

    let keys=arr[0].split(',');
    let rows=arr.length;
    let cols=keys.length;

    let obj = {};

    let i=0,j=0;
    for (i = 1; i < rows-1; i++) {
        let myNewLine = arr[i].split(',');
        for (j = 0; j < cols; j++) {

            let headerText =keys[j].substring(0, keys[j].length);
            let value = parseFloat(myNewLine[j]);
            if (!obj[headerText]){
                obj[headerText] = [];
            }
            obj[headerText].push(value);
        }
    }
    jArray.push(obj);
    return obj;

}
module.exports.getFileData=getFileData;