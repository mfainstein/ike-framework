import {Command} from "./Command";

export interface CommandSync extends Command {


    execute(...args: any[]): void;

}