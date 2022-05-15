import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DomainException } from "src/shared/core/DomainException";
import { Repository } from "typeorm";
import { PersonModel } from "../../infra/database";
import { PersonDTO, PersonMap } from "../../mappers/peopleMapper";

@Injectable()
export class GetPersonsUseCase {
    constructor(
        @InjectRepository(PersonModel)
        private personRepo: Repository<PersonModel>
    ) { }

    async execute(): Promise<PersonDTO[]> {
        try {
            const personObjs = await this.personRepo.find({})

            return personObjs.map(r => PersonMap.toDTO(PersonMap.toDomain(r)));
        } catch (err) {
            if (err instanceof DomainException) {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
            }
        }
    }
}