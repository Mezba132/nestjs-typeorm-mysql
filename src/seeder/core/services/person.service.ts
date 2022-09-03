import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { personObjs } from "src/common/person";
import { Person } from "src/entity/person.entity";
import { Repository } from "typeorm";

@Injectable()
export class PersonService{
    constructor(@InjectRepository(Person) private readonly personRepository : Repository<Person> ) {}

    async initPerson() {
        await this.createPerson();
        return true;
    }

    async createPerson() : Promise<boolean> {
		try {
			const divisions = [];
			for (const personObj of personObjs) {
				const personEntity : any = this.generatePerson(personObj);
				const person = this.personRepository.create(personEntity);
				await this.personRepository.save(person);
			}
		} catch (error) {
            throw new UnauthorizedException()
		}
		return true;
    }

    async generatePerson(personObj : any) {
        const stateEntity = new Person();
        stateEntity.firstName = personObj.firstName;
        stateEntity.lastName = personObj.lastName;
        stateEntity.email = personObj.email;
        stateEntity.address = personObj.address;
        return stateEntity;
    }
}