import { Body, Controller, Post } from "@nestjs/common";
import { BaseController } from "src/shared/infra/http/base-controller";
import { CreatePersonDTO } from "./create-person.dto";
import { CreatePersonUseCase } from "./create-person.use-case";

@Controller({ path: "/people", version: "v1" })
export class CreatePersonController extends BaseController {

    constructor(private readonly createPersonUseCase: CreatePersonUseCase) {
        super()
    }

    @Post("/")
    async createPerson(@Body() dto: CreatePersonDTO) {
        await this.createPersonUseCase.execute(dto);

        return {
            status: "success",
            message: "person created successfully!"
        }
    }
}
