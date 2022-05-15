export class DomainException extends Error {
    public readonly message: string;

    constructor(message) {
        super(message || 'DomainError');
        Error.captureStackTrace(this, DomainException);
        this.name = 'DomainException';
        this.message = message || "DomainError"
    }
}