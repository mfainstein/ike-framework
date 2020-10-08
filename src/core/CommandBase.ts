import {Command} from "./Command";
import {CommandOption} from "./CommandOption";
import * as Commander from 'commander';
import "reflect-metadata";

export abstract class CommandBase implements Command {
    commanderCommand?: Commander.Command;

    buildArguments(...args: any): Map<string, string> {
        let argumentsMap: Map<string, string> = new Map();
        let i: number = 0;
        let commandArguments: string[] = Reflect.getMetadata("ike:requiredArguments", this.constructor) || [];
        for (let argument of commandArguments) {
            let value: string = args[i];
            argumentsMap.set(argument, value);
            i++;
        }
        return argumentsMap;
    }

    buildOptions(...args: any): Map<string, string> {
        let optionsMap: Map<string, string> = new Map();
        let commandArguments: string[] = Reflect.getMetadata("ike:requiredArguments", this.constructor) || [];
        let declaredOptions: CommandOption[] = Reflect.getMetadata("ike:options", this.constructor) || [];
        let commanderOptions: any = args[commandArguments.length];
        for (let option of declaredOptions) {
            //TODO: this is dangerous, actually the command name should be derived from the "flag"
            //TODO: see this same comment under CommandOption
            optionsMap.set(option.name, commanderOptions[option.name]);
        }
        return optionsMap;

    }

    async setCommanderCommand(commanderCommand: Commander.Command): Promise<void> {
        this.commanderCommand = commanderCommand;
        await this.afterCommanderCommandSet();
    }

    execute(...args: any): void {
        let argumentsMap: Map<string, string> = this.buildArguments(...args);
        let optionsMap: Map<string, string> = this.buildOptions(...args);
        this.doExecute(argumentsMap, optionsMap);
    }

    abstract doExecute(argumentValues: Map<string, string>, optionValues: Map<string, string>): void;

    async afterCommanderCommandSet(): Promise<void> {
        //will be overridden - TODO: is this needed?
    }

    getDefaultName():string {
        return this.constructor.name.toLowerCase().replace("command", "");
    }
}

//============================================== Decorators ============================================================

export function requiredArgs(args: string[]): (target: any) => any {
    return (target) => {
        Reflect.defineMetadata("ike:requiredArguments", args, target);
        return target;
    }

}

export function options(options: CommandOption[]): (target: any) => any {
    return (target) => {
        Reflect.defineMetadata("ike:options", options, target);
        return target;
    }
}

export function usage(usageText: string): (target: any) => any {
    return (target) => {
        Reflect.defineMetadata("ike:usage", usageText, target);
        return target;
    }
}

export function description(descriptionText: string): (target: any) => any {
    return (target) => {
        Reflect.defineMetadata("ike:description", descriptionText, target);
        return target;
    }
}

export function commandName(name: string): (target: any) => any {
    return (target) => {
        Reflect.defineMetadata("ike:commandName", name, target);
        return target;
    }
}