import {CommandBase} from "./CommandBase";
import {CommandSync} from "./CommandSync";

export abstract class CommandBaseSync extends CommandBase implements CommandSync {

    public executionMode = "Sync";

    execute(...args: any): void {
        let argumentsMap: Map<string, string> = this.buildRequiredArguments(...args);
        let optionsMap: Map<string, string> = this.buildOptions(...args);
        this.doExecute(argumentsMap, optionsMap);
    }

    abstract doExecute(argumentValues: Map<string, string>, optionValues: Map<string, string>): void;
}