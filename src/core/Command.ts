export interface Command {

    executionMode: string; //TODO not a good solution!

    addSubCommand(command: Command): void;

    getSubCommands(): Command[];

    getDefaultName(): string;
}