function sum(a, b) {
    return a + b
}

exports.diff = (a, b) => {
    return a - b
}

// export const diff = (a, b) => {
//     return a - b
// }

const mul = (a, b) => {
    return a * b
}
exports.mul = mul;
exports.sum = sum;
// exports represents to our module
// we have created a object and added a property sum to it
