import { Injectable } from "@nestjs/common";
import { PersonService } from "./person.service";

@Injectable()
export class CoreService {
    constructor(
        private readonly personService : PersonService
    ) {}

    async initCore() {
        await this.personService.initPerson()
    }
}