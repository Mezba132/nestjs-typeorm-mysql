import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import entities from "src/entity";

const config : TypeOrmModuleOptions = {
    type : 'mysql',
    host : 'localhost',
    port : 3306,
    username : 'root',
    password : '',
    database : 'crud',
    entities,
    synchronize : true,
}

export default config;