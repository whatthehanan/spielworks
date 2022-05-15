import { Controller, Get } from "@nestjs/common";
import { BaseController } from "src/shared/infra/http/base-controller";
import { GetPersonsUseCase } from "./get-people.use-case";

@Controller({ path: "/people", version: "v1" })
export class GetPersonsController extends BaseController {

    constructor(private readonly getPersonsUseCase: GetPersonsUseCase) {
        super()
    }

    @Get("/")
    async getPersons() {

        return {
            status: "success",
            data: await this.getPersonsUseCase.execute()
        }
    }
}
