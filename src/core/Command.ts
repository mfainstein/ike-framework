export interface Command {
    addSubCommand(command: Command): void;

    getSubCommands():Command[];

    execute(...args: any[]): Promise<void>;

    getDefaultName(): string;

}