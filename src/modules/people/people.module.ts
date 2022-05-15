import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from "./infra/database/mysql/person.entity"
import { CreatePersonController } from './use-cases/create-person/create-person.controller';
import { CreatePersonUseCase } from './use-cases/create-person/create-person.use-case';
import { GetPersonsController } from './use-cases/get-people/get-people.controller';
import { GetPersonsUseCase } from './use-cases/get-people/get-people.use-case';
import { GetPersonByIdController } from './use-cases/get-person-by-id/get-person-by-id.controller';
import { GetPersonsByIdUseCase } from './use-cases/get-person-by-id/get-person-by-id.use-case';

@Module({
    imports: [TypeOrmModule.forFeature([Person])],
    providers: [CreatePersonUseCase, GetPersonsUseCase, GetPersonsByIdUseCase],
    controllers: [CreatePersonController, GetPersonsController, GetPersonByIdController],
})
export class PersonModule { }