const oneUpperCaseRule = (input) => {
    return {
        passed: (input.toLowerCase() !== input),
        reason: 'at least one uppper case needed'
    };
};

module.exports = {
    oneUpperCaseRule
};