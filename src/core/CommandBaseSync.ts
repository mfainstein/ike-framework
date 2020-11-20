import {CommandBase} from "./CommandBase";
import {CommandSync} from "./CommandSync";
import {CommandStage} from "./CommandStage";
import {CommandMetadata} from "./CommandMetadata";

export class CommandBaseSync extends CommandBase implements CommandSync {

    public executionMode = "Sync";

    protected executeStage(stage: CommandStage,
                                     argumentValues: Map<string, string>,
                                     optionValues: Map<string, string>): void {
        this.spinner.setText(stage.spinnerText);
        // @ts-ignore
        this[stage.methodName](argumentValues, optionValues); //TODO: apply?
        this.spinner.clear();
    }

    execute(...args: any[]): void {
        let argumentsMap: Map<string, string> = this.buildRequiredArguments(...args);
        let optionsMap: Map<string, string> = this.buildOptions(...args);

        let stages: CommandStage[] = Reflect.getMetadata(CommandMetadata.Stages, this.constructor) || [];

        this.spinner.start();

        if (stages.length != 0) {
            for (let stage of stages){
                this.executeStage(stage, argumentsMap, optionsMap);
            }
            this.spinner.clear();
        } else { //no stages, use the overridden doExecute method.
            this.doExecute(argumentsMap, optionsMap);
        }
    }

    doExecute(argumentValues: Map<string, string>, optionValues: Map<string, string>): void {
        throw new Error("Please override doExecute in derived class or use the @stage annotation.");
    }
}
