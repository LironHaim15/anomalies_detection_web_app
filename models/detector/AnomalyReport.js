class AnomalyReport{
    constructor(description, timeStep,anomalyType) {
        this.description = description;
        this.timeStep = timeStep;
        this.anomalyType = anomalyType;
    }
}
module.exports = AnomalyReport;