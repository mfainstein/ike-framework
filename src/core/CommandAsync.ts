import {Command} from "./Command";

export interface CommandAsync extends Command{

    execute(...args: any[]): Promise<void>;

}