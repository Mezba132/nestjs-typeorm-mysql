import { Module } from "@nestjs/common";
import { CoreModule } from "./core/core.module";
import { CoreService } from "./core/services/core.service";
import { SeederService } from "./seeder.service";

@Module({
	imports: [
		CoreModule
	],
	providers: [SeederService, CoreService],
})
export class SeederModule {}