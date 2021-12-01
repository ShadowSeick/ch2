const { TestWatcher } = require('@jest/core');
const { PasswordVerifier1 } = require('../password-verifier1');

const makeVerifier = () => new PasswordVerifier1();
const passingRule = (input) => ({passed: true, reason: ''});

const makeVerifierWithPassingRule = () => {
    const verifier = makeVerifier();
    verifier.addRule(passingRule);
    return verifier;
};

const makeVerifierWithFailedRule = (reason) => {
    const verifier = makeVerifier();
    const fakeRule = input => ({passed: false, reason});
    verifier.addRule(fakeRule);
    return verifier;
}

// NESTED DESCRIBE FOR READABLITY
describe('v8 PasswordVerifier', () => {
    describe('with a failing rule', () => {
        it('has an error message based on the rule.reason', () => {
            const verifier = makeVerifierWithFailedRule('fake reason');
            const errors = verifier.verify('any input');
            expect(errors[0]).toContain('fake reason');
        });
        it('has exactly one error', () => {
            const verifier = makeVerifierWithFailedRule('fake reason');
            errors = verifier.verify('any input');
            expect(errors.length).toBe(1);
        });
    });
    describe('with a passing rule', () => {
        it('has no errors', () => {
            const verifier = makeVerifierWithPassingRule();
            const errors = verifier.verify('any input');
            expect(errors.length).toBe(0);
        });
    });
    describe('with failing and a passing rule', () => {
        it('has one error', () => {
            const verifier = makeVerifierWithFailedRule('fake reason');
            verifier.addRule(passingRule);
            const errors = verifier.verify('any input');
            expect(errors.length).toBe(1);
        });
        it('error text belongs to failed rule', () => {
            const verifier = makeVerifierWithFailedRule('fake reason');
            verifier.addRule(passingRule);
            const errors = verifier.verify('any input');
            expect(errors[0]).toContain('fake reason');
        });
    });
});

// DESCRIBE-LESS TESTS FOR STRUCTURE CLARITY
test('pass verifier, with failed rule,' + 'has an error message based on the rule.reason', () => {
    const verifier = makeVerifierWithFailedRule('fake reason');
    const errors = verifier.verify('any input');
    expect(errors[0]).toContain('fake reason');
});
test('pass verifier, with failed rule, has exactly one error', () => {
    const verifier = makeVerifierWithFailedRule('fake reason');
    const errors = verifier.verify('any input');
    expect(errors.length).toBe(1);
});
test('pass verifier, with passing rule, has no errors', () => {
    const verifier = makeVerifierWithPassingRule();
    const errors = verifier.verify('any input');
    expect(errors.length).toBe(0);
});
test('pass verifier, with passing and failing rules, ' + ' error text belongs to failed rule', () => {
    const verifier = makeVerifierWithFailedRule('fake reason');
        verifier.addRule(passingRule);
        const errors = verifier.verify('any input');
        expect(errors[0]).toContain('fake reason');
});

test('verify, with no rules, throws exception', () => {
    const verifier = makeVerifier();
    expect(() => verifier.verify('any input')).toThrowError(/no rules configured/);
});