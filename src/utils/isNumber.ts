/* eslint-disable no-restricted-globals */
const isNumber = (n: any) => (!isNaN(parseFloat(n)) && isFinite(n));

export default isNumber;
