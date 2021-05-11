let Line= require ('./Line');

function  avg(xArray, size){
    let sum=0;
    for (let i = 0; i < size; i++) {
        sum+=xArray[i];
    }
        return sum/size;
    }

  function variance(xArray, size){
        let average=avg(xArray,size);
        let sum =0;
        xArray.forEach((x)=>{sum+=x*x;});
        return (sum/size - average*average);
    }

  function  cov(xArray,yArray, size){
        let sum = 0;
        for (let i = 0; i < size; i++) {
            sum+=xArray[i]*yArray[i];
        }
        sum/=size;
        return sum - (avg(xArray,size)*avg(yArray,size));
    }

  function pearson(xArray,yArray, size){
        return (cov(xArray,yArray,size)/(Math.sqrt(variance(xArray,size))*Math.sqrt(variance(yArray,size))))
    }


function linear_reg(points, size){
        let xArray=[];
        let yArray=[];
        for (let i = 0; i < size; i++) {
            xArray.push(points[i].x);
            yArray.push(points[i].y);
        }
        let a=cov(xArray,yArray,size)/variance(xArray,size);
        let b=avg(yArray,size)- a*avg(xArray,size);
        return new Line(a,b)
    }

    function dev(p,points, size){
        let l = linear_reg(points,size);
        return dev(p,l);
}
function dev(p,l){
    return Math.abs(p.y - l.f(p.x));
}

module.exports.avg=avg;
module.exports.variance=variance;
module.exports.cov=cov;
module.exports.linear_reg=linear_reg;
module.exports.pearson=pearson;
