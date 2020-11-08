import {CommandOption} from "./CommandOption";
import "reflect-metadata";
import {CommandMetadata} from "./CommandMetadata";
import {Command} from "./Command";

export abstract class CommandBase implements Command {
    private subCommands: Command[];
    public executionMode: string = "unknown";
    private static COMMAND_SUFFIX: string = "command";

    constructor() {
        this.subCommands = [];
    }

    buildRequiredArguments(...args: any[]): Map<string, string> {
        let argumentsMap: Map<string, string> = new Map();
        let i: number = 0;
        let commandArguments: string[] = Reflect.getMetadata(CommandMetadata.RequiredArgs, this.constructor) || [];
        for (let argument of commandArguments) {
            let value: string = args[i];
            argumentsMap.set(argument, value);
            i++;
        }
        return argumentsMap;
    }

    buildOptions(...args: any[]): Map<string, string> {
        let optionsMap: Map<string, string> = new Map();
        let commandArguments: string[] = Reflect.getMetadata(CommandMetadata.RequiredArgs, this.constructor) || [];
        let declaredOptions: CommandOption[] = Reflect.getMetadata(CommandMetadata.Options, this.constructor) || [];
        let commanderOptions: any = args[commandArguments.length];
        for (let option of declaredOptions) {
            //TODO: this is dangerous, actually the command name should be derived from the "flag"
            //TODO: see this same comment under CommandOption
            optionsMap.set(option.name, commanderOptions[option.name]);
        }
        return optionsMap;

    }

    getDefaultName(): string {
        return this.constructor.name.toLowerCase().replace(CommandBase.COMMAND_SUFFIX, "");
    }

    addSubCommand(command: Command): void {
        this.subCommands.push(command);
    }

    getSubCommands(): Command[] {
        return this.subCommands;
    }

    async setup(): Promise<void> {
        //will be overridden if needed
    }
}

//============================================== Decorators ============================================================

export function requiredArgs(args: string[]): (target: any) => any {
    return (target) => {
        Reflect.defineMetadata(CommandMetadata.RequiredArgs, args, target);
        return target;
    }

}

export function options(options: CommandOption[]): (target: any) => any {
    return (target) => {
        Reflect.defineMetadata(CommandMetadata.Options, options, target);
        return target;
    }
}

export function usage(usageText: string): (target: any) => any {
    return (target) => {
        Reflect.defineMetadata(CommandMetadata.Usage, usageText, target);
        return target;
    }
}

export function description(descriptionText: string): (target: any) => any {
    return (target) => {
        Reflect.defineMetadata(CommandMetadata.Description, descriptionText, target);
        return target;
    }
}

export function commandName(name: string): (target: any) => any {
    return (target) => {
        Reflect.defineMetadata(CommandMetadata.Name, name, target);
        return target;
    }
}