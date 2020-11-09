import {CommandBaseAsync} from "../../src/core/CommandBaseAsync";
import {commandName, stage} from "../../src/core/CommandBase";

export class MyAsyncCommand extends CommandBaseAsync {

    @stage("doSomething...")
    public async doSomething(): Promise<void> {
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                //console.log("hello");
                resolve();
            }, 10000);
        });
    }

    @stage("doMore...!")
    public async doMore(): Promise<void> {
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                //console.log("hello");
                resolve();
            }, 3000);
        });
    }

}
