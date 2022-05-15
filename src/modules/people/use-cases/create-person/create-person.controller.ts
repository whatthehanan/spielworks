import { Body, Controller, Post, Response } from "@nestjs/common";
import { BaseController } from "src/shared/infra/http/base-controller";
import { Response as Res } from 'express';
import { CreatePersonDTO } from "./create-person.dto";
import { CreatePersonUseCase } from "./create-person.use-case";

@Controller({ path: "/people", version: "v1" })
export class CreatePersonController extends BaseController {

    constructor(private readonly createPersonUseCase: CreatePersonUseCase) {
        super()
    }

    @Post("/")
    async createPerson(@Body() dto: CreatePersonDTO, @Response() res: Res) {
        const person = await this.createPersonUseCase.execute(dto);

        return res.location(`/people/${person.id}`).status(201).json({
            status: "success",
            message: "person created successfully!"
        })
    }
}
