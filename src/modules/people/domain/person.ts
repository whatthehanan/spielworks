import { DomainException } from "src/shared/core/DomainException"
import { Guard } from "src/shared/core/Guard"
import { v4 as uuid } from "uuid"

interface PersonProps {
    firstName: string
    lastName: string
}

export class Person {

    get personId(): string {
        return this.id
    }

    get firstName(): string {
        return this.props.firstName
    }

    get lastName(): string {
        return this.props.lastName
    }

    private constructor(private props: PersonProps, private id: string = uuid()) { }

    public static create(props: PersonProps, id?: string) {

        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.firstName, argumentName: 'First name' },
            { argument: props.lastName, argumentName: 'Last name' },
        ])

        if (!guardResult.succeeded) {
            throw new DomainException(guardResult.message)
        }

        const person = new Person({
            ...props,
        }, id)

        return person;
    }
}