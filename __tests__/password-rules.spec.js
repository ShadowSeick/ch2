const { oneUpperCaseRule } = require('../password-rules');
// Best way, it divides the tests in two different scenarios: One for no uppercase and two for uppercases
describe('v1 one uppercase rule', () => {
    test('given no uppercases, it fails', () => {
        const result = oneUpperCaseRule('abc');
        expect(result.passed).toEqual(false);
    });
    test.each([['Abc', true], ['aBc', true]])('given one uppercase, it passes', (input, expected) => {
        const result = oneUpperCaseRule(input);
        expect(result.passed).toEqual(expected);
    });
});


// The following are a bad case for the use of test.each from jest and for loop from vanilla js.
// Why? Because this two don't split the tests in different scenarios (input) => the main two scenarios are when input contains an uppercase and when not
describe('v3 one uppercase rule', () => {
    test.each([['Abc', true], ['aBc', true], ['abc', false]])('given %s, %s', (input, expected) => {
        const result = oneUpperCaseRule(input);
        expect(result.passed).toEqual(expected);
    });
});

describe('v5 one uppercase rule, with vanila JS test.each', () => {
    const tests = {
        'Abc': true,
        'aBc': true,
        'abc': false
    };

    for (const [input, expected] of Object.entries(tests)) {
        test(`given ${input}, ${expected}`, () => {
            const result = oneUpperCaseRule(input);
            expect(result.passed).toEqual(expected);
        });
    }
});