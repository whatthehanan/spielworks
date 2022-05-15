import { Person } from "../domain/person";

export interface PersonDTO {
    id: string
    firstName: string
    lastName: string
}

export class PersonMap {

    public static toDTO(person: Person): PersonDTO {
        return {
            id: person.personId,
            firstName: person.firstName,
            lastName: person.lastName,
        }
    }

    public static toDomain(raw: any): Person {
        return Person.create({
            firstName: raw.firstName,
            lastName: raw.lastName
        }, raw.personId);
    }

    public static toPersistence(person: Person) {
        return {
            personId: person.personId,
            firstName: person.firstName,
            lastName: person.lastName,
        }
    }
}