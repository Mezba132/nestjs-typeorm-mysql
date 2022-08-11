import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PersonDto } from './person.dto';
import { PersonService } from './person.service';

@Controller('person')
export class PersonController {
    constructor(private readonly personService : PersonService) {} 

    @Get()
    getAllPersons() {
        return this.personService.getPersons();
    }

    @Post() 
    addPerson(@Body() body : PersonDto) {
        return this.personService.createPerson(body);
    }

    @Get(':id')
    getPersonById(@Param('id') id : number) {
        return this.personService.getPersonById(id)
    }

    @Delete(':id')
    deletePersonById(@Param('id') id : number) {
        return this.personService.deletePersonById(id);
    }

    @Put(':id')
    updatePerson(@Param('id') id : number, @Body() body : { firstName : string, lastName : string}) {
        return this.personService.updatePersonById(id, body);
    }
}
