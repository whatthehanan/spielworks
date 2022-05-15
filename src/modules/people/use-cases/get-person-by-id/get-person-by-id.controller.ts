import { Controller, Get, Param } from "@nestjs/common";
import { BaseController } from "src/shared/infra/http/base-controller";
import { GetPersonsByIdUseCase } from "./get-person-by-id.use-case";

@Controller({ path: "/people", version: "v1" })
export class GetPersonByIdController extends BaseController {

    constructor(private readonly getPersonByIdUseCase: GetPersonsByIdUseCase) {
        super()
    }

    @Get("/:id")
    async getPersons(@Param('id') id: string) {
        return {
            status: "success",
            data: await this.getPersonByIdUseCase.execute(id)
        }
    }
}
