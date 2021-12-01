const { verifyPassword } = require('../password-verifier0');

describe('verifyPassword', () => {
    describe('with a failing rule', () => {
        it('returns errors', () => {
            const fakeRule = input => ({
                passed: false,
                reason: 'fake reason'
            });
            
            const errors = verifyPassword('anyValue', [fakeRule]);
            expect(errors[0]).toContain('fake reason');
        });
    });
});