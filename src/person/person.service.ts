import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from 'src/entity/person.entity';
import { PersonDto } from './person.dto';

@Injectable()
export class PersonService {

    constructor(@InjectRepository(Person) private personRepository : Repository<Person>) {}

    async getPersons() : Promise<Person[]> {
        // return await this.personRepository.find();
        return await this.personRepository.createQueryBuilder('a').getMany()
    }

    async getPersonById(id : number) {
        // const personById = await this.personRepository.findOneBy({  id : id  });
        // return personById;
        return this.personRepository
        .createQueryBuilder('person')
        .where("person.id = :id", { id: id })
        .getOne()
    
    }

    async createPerson(body : PersonDto){
        // const person = this.personRepository.create(body);
        // return await this.personRepository.save(person);
        return await this.personRepository
        .createQueryBuilder()
        .insert()
        .into(Person)
        .values(body)
        .execute()
    }

    async deletePersonById(id: number) {
        // return await this.personRepository.delete(id);
        return await this.personRepository
        .createQueryBuilder()
        .delete()
        .from(Person)
        .where("id = :id", { id: id })
        .execute()
    }

    async updatePersonById(id : number, body : any) : Promise<any> {
        // const personById = await this.personRepository.findOne({ where : { id : id } });
        
        // const data = this.personRepository.save({
        //     ...personById,
        //     ...body 
        //   });
        // return data;
        return await this.personRepository
        .createQueryBuilder()
        .update(Person)
        .set(body)
        .where("id = :id", { id: id })
        .execute()
    }
}
