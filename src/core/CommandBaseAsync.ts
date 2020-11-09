import {CommandBase} from "./CommandBase";
import {CommandAsync} from "./CommandAsync";
import {CommandMetadata} from "./CommandMetadata";
import {CommandStage} from "./CommandStage";

export class CommandBaseAsync extends CommandBase implements CommandAsync {

    public executionMode = "Async";

    protected async executeStage(stage: CommandStage): Promise<void> {
        this.spinner.setText(stage.spinnerText);
        // @ts-ignore
        await this[stage.methodName]();
        this.spinner.clear();
    }

    private promisifyStage(stage: CommandStage): Promise<void> {
        return new Promise((resolve, reject) => {
            this.executeStage(stage);
            resolve();
        });
    }

    async execute(...args: any[]): Promise<void> {
        let argumentsMap: Map<string, string> = this.buildRequiredArguments(...args);
        let optionsMap: Map<string, string> = this.buildOptions(...args);

        let stages: CommandStage[] = Reflect.getMetadata(CommandMetadata.Stages, this.constructor) || [];

        if (stages.length != 0) {

            this.spinner.start();
            for (let stage of stages) {
                //console.log("executing "+stage);
                await this.executeStage(stage);
            }
            this.spinner.stop();


        } else { //no stages, use the overridden doExecute method.
            await this.doExecute(argumentsMap, optionsMap);
        }


    }

    async doExecute(argumentValues: Map<string, string>, optionValues: Map<string, string>): Promise<void> {
        throw new Error("Please override doExecute in derived class or use the @stage annotation.");
    }
}
