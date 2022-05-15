import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DomainException } from "src/shared/core/DomainException";
import { Repository } from "typeorm";
import { PersonModel } from "../../infra/database";
import { PersonMap } from "../../mappers/peopleMapper";
import { CreatePersonDTO } from "./create-person.dto";

@Injectable()
export class CreatePersonUseCase {
    constructor(
        @InjectRepository(PersonModel)
        private personRepo: Repository<PersonModel>
    ) { }

    async execute(dto: CreatePersonDTO) {
        try {
            const person = PersonMap.toDomain(dto);
            await this.personRepo.save(PersonMap.toPersistence(person));
            return true;

        } catch (err) {
            if (err instanceof DomainException) {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
            }
        }
    }
}