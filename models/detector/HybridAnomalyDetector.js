let SimpleAnomalyDetector = require('./SimpleAnomalyDetector')
let smallCircle = require ('smallest-enclosing-circle');
let CorrelatedFeatures = require('./CorrelatedFeatures')
let Point = require('./Point')

class HybridAnomalyDetector extends SimpleAnomalyDetector{

    constructor() {
        super();
    }

    learnHelper(p, f1, f2, Points, length) {
        super.learnHelper(p, f1, f2, Points, length);

        if(p>0.5 && p<this.threshold) {
            let cl = smallCircle(Points);
            let c = new CorrelatedFeatures(f1,f2,p,cl,cl.r*1.1,cl.x,cl.y,"Min Circle");
            this.cf.push(c);
        }
    }

    dist(a,b){
        let x1=(a.x - b.x)*(a.x - b.x);
        let y1=(a.y - b.y)*(a.y - b.y);
        return Math.sqrt(x1+y1);
    }

    isAnomalous(x, y, c) {
        return ((c.correlation>=this.threshold && super.isAnomalous(x,y,c))
            || (c.correlation>0.5 && c.correlation<this.threshold
                && this.dist(new Point(c.cx,c.cy),new Point(x,y))>c.threshold ))
    }
}
module.exports=HybridAnomalyDetector;