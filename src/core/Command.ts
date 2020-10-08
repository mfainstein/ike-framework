import {CommandOption} from "./CommandOption";
import * as Commander from 'commander';

export interface Command {
    commanderCommand?: Commander.Command;
    setCommanderCommand(commanderCommand: Commander.Command): Promise<void>;
    execute(...args: any[]): void;
    getDefaultName():string;
}