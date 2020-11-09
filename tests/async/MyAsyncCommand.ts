import {CommandBaseAsync} from "../../src/core/CommandBaseAsync";
import {commandName, stage} from "../../src/core/CommandBase";

export class MyAsyncCommand extends CommandBaseAsync {

    @stage("doSomething...")
    public async doSomething(): Promise<void> {
        console.log("doSomething!");
    }

    @stage("doMore...!")
    public async doMore(): Promise<void> {
        console.log("doMore!");
    }

}
