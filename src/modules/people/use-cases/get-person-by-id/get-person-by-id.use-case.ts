import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DomainException } from "src/shared/core/DomainException";
import { Repository } from "typeorm";
import { PersonModel } from "../../infra/database";
import { PersonDTO, PersonMap } from "../../mappers/peopleMapper";

@Injectable()
export class GetPersonsByIdUseCase {
    constructor(
        @InjectRepository(PersonModel)
        private personRepo: Repository<PersonModel>
    ) { }

    async execute(id: string): Promise<PersonDTO> {
        try {
            const personObj = await this.personRepo.findOne({
                where: {
                    personId: id
                }
            })

            if (!personObj) {
                throw new HttpException(`Person with id '${id}' does not exist`, HttpStatus.NOT_FOUND)
            }

            return PersonMap.toDTO(PersonMap.toDomain(personObj))
        } catch (err) {
            if (err instanceof DomainException) {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
            }

            throw err;
        }
    }
}