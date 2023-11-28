export default function evaluateDSLCondition(conditionObj, data) {
  const operator = this.resolveOperator(conditionObj.op);
  switch (operator) {
    case 'lessThan':
      return data[conditionObj.property] < conditionObj.value;
    case 'greaterThan':
      return data[conditionObj.property] > conditionObj.value;
    case 'equals':
      return data[conditionObj.property] === conditionObj.value;
    case 'notEquals':
      return data[conditionObj.property] !== conditionObj.value;
    case 'lessThanOrEqual':
      return data[conditionObj.property] <= conditionObj.value;
    case 'greaterThanOrEqual':
      return data[conditionObj.property] >= conditionObj.value;
    case 'and':
      return conditionObj.conditions.every(cond => this.evaluateDSLCondition(cond, data));
    case 'or':
      return conditionObj.conditions.some(cond => this.evaluateDSLCondition(cond, data));
    case 'not':
      return !this.evaluateDSLCondition(conditionObj.condition, data);
    default:
      return false;
  }
}