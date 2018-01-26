module.exports.assignToCondition = function(participant, amountOfConditions) {
    if(participant.condition===undefined) {
        participant.condition = Math.floor(Math.random() * amountOfConditions);
        return true;
    }
    return false;
}