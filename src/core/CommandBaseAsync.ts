import {CommandBase} from "./CommandBase";
import {CommandAsync} from "./CommandAsync";

export abstract class CommandBaseAsync extends CommandBase implements CommandAsync {

    public executionMode = "Async";

    async execute(...args: any): Promise<void> {
        let argumentsMap: Map<string, string> = this.buildRequiredArguments(...args);
        let optionsMap: Map<string, string> = this.buildOptions(...args);
        return await this.doExecute(argumentsMap, optionsMap);
    }

    abstract async doExecute(argumentValues: Map<string, string>, optionValues: Map<string, string>): Promise<void>;
}