import {stage} from "../../src/core/CommandBase";
import {CommandBaseSync} from "../../src/core/CommandBaseSync";

export class MySyncCommand extends CommandBaseSync {
    @stage("do... A... Thing...!")
    public doAThing(): void {
        console.log("wowow... doing a Thing!");
    }

}
