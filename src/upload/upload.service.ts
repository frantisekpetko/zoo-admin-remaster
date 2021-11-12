import { Injectable, Logger } from '@nestjs/common';
import { CommandsService } from '../commands/commands.service';
import { root } from "../config/paths";

@Injectable()
export class UploadService {
  private logger: Logger = new Logger(`<${UploadService.name}>`);

  constructor(private commandsService: CommandsService) {}

  runScript(scriptPath, callback) {
    const childProcess = require('child_process');

    // keep track of whether callback has been invoked to prevent multiple invocations
    let invoked = false;

    const process = childProcess.fork(scriptPath);

    // listen for errors as they may prevent the exit event from firing
    process.on('error', function (err) {
      if (invoked) return;
      invoked = true;
      callback(err);
    });

    // execute the callback once the process has finished running
    process.on('exit', function (code) {
      if (invoked) return;
      invoked = true;
      const err = code === 0 ? null : new Error('exit code ' + code);
      callback(err);
    });
  }

  async upload() {
    /*await this.runScript(root + '/../../index.js', function (err) {
      if (err) throw err;
      console.log('finished running some-script.js');
    });*/

    await this.commandsService.deleteDataFromTables();
    await this.commandsService.storeData();
    await this.commandsService.createSeeds();
  }
}
