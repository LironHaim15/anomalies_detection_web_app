class CorrelatedFeatures {
    constructor(f1,f2,corr,line,threshold,cx,cy,at) {
        this.feature1 =f1;
        this.feature2 =f2;
        this.correlation=corr;
        this.line_reg=line;
        this.threshold=threshold;
        this.cx=cx;
        this.cy=cy;
        this.anomalyType=at;
    }
}
module.exports = CorrelatedFeatures;