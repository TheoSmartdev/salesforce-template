import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import ApexClassCreateGenerator from './apexclasscreategenerator';

// Loading the apex class messages.
Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('force-language-services', 'apexclass');

export default class ApexClass extends SfdxCommand {

  // Display apex class create examples.
  public static examples = [
    '$ sfdx force:apex:class:create -n MyClass',
    '$ sfdx force:apex:class:create -n MyClass -d classes'
    ];

    // Display the desceription for the help flag.
  public static description = messages.getMessage('commandDescription');

  // All flags:
  protected static flagsConfig = {
    classname: flags.string({char: 'n', description: messages.getMessage('nameFlagDescription'), required: true}),
    outputdir: flags.string({char: 'd', description: messages.getMessage('outputdir'), required: false, default: process.cwd()}),
    apiversion: flags.string({char: 'a', description: messages.getMessage('apiversion'), options: ['46.0', '45.0'], default: '45.0'}),
    template: flags.string({char: 't', description: messages.getMessage('template'), default: 'DefaultApexClass', options: ['DefaultApexClass', 'ApexException', 'ApexUnitTest', 'InboundEmailService']})
    };

    // Execute apex class create generator with flags as arguments.
    public async run(): Promise<AnyJson> {
      const apiName = this.flags.classname;
      const outputdir = this.flags.outputdir;
      const apiVersion = this.flags.apiversion;
      const template = this.flags.template;

      const yeoman = require('yeoman-environment');
      const env = yeoman.createEnv();

      env.registerStub(ApexClassCreateGenerator, 'apexclassgenerator');
      this.log('target dir =' + process.cwd() + '/' + outputdir);
      env.run('apexclassgenerator', {apiName, template, outputdir, apiVersion});
      return;
    }
}
