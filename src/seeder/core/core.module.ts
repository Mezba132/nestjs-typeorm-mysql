import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Person } from "src/entity/person.entity";
import { PersonService } from "./services/person.service";

const services = [
    PersonService
]

@Module({
	imports: [
		TypeOrmModule.forFeature([Person]),
	],
	exports: [...services],
	controllers: [],
	providers: [...services],
})
export class CoreModule {}