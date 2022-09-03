import { Injectable } from "@nestjs/common";
import { CoreService } from "./core/services/core.service";

@Injectable()
export class SeederService {
	constructor(
		private readonly coreService: CoreService,
	) {}

	async initializeData() {
        await this.coreService.initCore();
        return true;
	}
}
