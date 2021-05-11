let Utility = require('./AnomalyDetectorUtility')
let Point = require('./Point')
let AnomalyReport = require('./AnomalyReport')
let CorrelatedFeatures = require('./CorrelatedFeatures')

class SimpleAnomalyDetector{

    constructor() {
        this.threshold = 0.9;
        this.cf = [];
    }

    findThreshold(Points, len, regLine){
        let max=0;
        for (let i = 0; i < len; i++) {
            let d=Math.abs(Points[i].y - regLine.f(Points[i].x));
            if(d>max)
                max=d;
        }
        return max;
    }

    learnNormal(ts){
        let atts = [];
        let vals = [];

        Object.entries(ts).forEach(([key, value]) => {
            atts.push(key);
            vals.push(value);
        });

        let len = vals[0].length
        for (let i = 0; i < atts.length-1; i++) {
            let f1 = atts[i];
            let max=0;
            let jmax=0;
            for (let j = i+1; j < atts.length; j++) {
                let p = Math.abs(Utility.pearson(vals[i],vals[j],len));
                if (p>max){
                    max=p;
                    jmax=j;
                }
            }
            let f2 = atts[jmax];
            let Points = [];
            for (let j = 0; j < len; j++) {
                Points.push(new Point(vals[i][j],vals[jmax][j]));
            }
            this.learnHelper(max,f1,f2,Points,len);
        }
    }

    learnHelper(p,f1,f2,Points,length){
        if(p>this.threshold){
            let cl=Utility.linear_reg(Points,length);
            let cr = new CorrelatedFeatures(f1,f2,p,cl,this.findThreshold(Points,length,cl) * 1.1,0,0,"Regression");
            this.cf.push(cr);
        }
    }

    isAnomalous(x,y,c){
        return (Math.abs(y - c.line_reg.f(x)) > c.threshold);
    }

    detect(ts){
        let v=[];
        this.cf.forEach((c)=>{
            let x = ts[c.feature1];
            let y = ts[c.feature2];
            for (let i = 0; i < x.length; i++) {
                if(this.isAnomalous(x[i],y[i],c)){
                    let d = c.feature1 + "  -------  " + c.feature2;
                    v.push(new AnomalyReport(d,i+1,c.anomalyType));
                }
            }
        })
        return v;
    }
}

module.exports=SimpleAnomalyDetector;