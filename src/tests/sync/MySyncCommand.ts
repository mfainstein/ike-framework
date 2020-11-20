import {stage} from "../../core/CommandBase";
import {CommandBaseSync} from "../../core/CommandBaseSync";

export class MySyncCommand extends CommandBaseSync {
    @stage("do... A... Thing...!")
    public doAThing(): void {
        console.log("wowow... doing a Thing!");
    }

}
