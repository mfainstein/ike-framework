export interface Command {

    //used for type guards to tell between Sync and Async commands.
    //TODO not a good solution! probably there's a better way with emitting decorators.
    executionMode: string;

    addSubCommand(command: Command): void;

    getSubCommands(): Command[];

    getDefaultName(): string;

    setup(): Promise<void>;
}