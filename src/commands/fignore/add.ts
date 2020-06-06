import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import {appendFile, readFileSync, writeFileSync} from 'fs';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('fignore', 'add');

export default class Add extends SfdxCommand {

  // TODO - Fill out with all known type
  private static validMetadataTypes = [
    'ApexClass',
    'AppMenu',
    'AuraDefinitionBundle',
    //'CustomField',
    'CustomObject',
    //'CustomMetadata',
    'EmailTemplate',
    'FlexiPage',
    'Layout',
    'LightningComponentBundle',
    'NavigationMenu',
    'Network',
    'Portal',
    'Profile',
    'Role',
    'SiteDotCom',
    'StaticResource'
  ];

  public static description = messages.getMessage('commandDescription');

  public static examples = [
  `$ sfdx fignore:add -n MyRole -t Role -r
  Inserted into .forceignore: 'MyRole.role'
  `,
  `$ sfdx fignore:add -n "Custom: Sales Profile" -t Profile -r
  Inserted into .forceignore: 'Custom%3A Sales Profile.profile'
  `
  ];

  public static args = [{name: 'file'}];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: messages.getMessage('nameFlagDescription'), required: true}),
    metadatatype: flags.string({char: 'm', description: messages.getMessage('metadataTypeFlagDescription'),required :true, options: Add.validMetadataTypes}),
    //TODO add local syntax
    //local: flags.boolean({char: 'l', description: messages.getMessage('localFlagDescription'), exclusive: ['remote']}),
    remote: flags.boolean({char: 'r', description: messages.getMessage('remoteFlagDescription'), exclusive: ['local'], default:true})
  };

  protected static requiresProject = true;

  public async run(): Promise<AnyJson> {
    const fignoreFile = '.forceignore';
    let resultStr:string = '';

    const sectionComment = '# Fignore: ' + this.flags.metadatatype;

    const entryToWrite = this.encodeName() + this.suffixForMDT();

    // Check where to add the entry.
    const fileLines:Array<string> = readFileSync(fignoreFile, 'utf8').toString().split('\n');
    let entryExists:boolean = false
    let lineToInsertPos:number;
    fileLines.forEach((line, idx) => {
      if (line.trim().startsWith(entryToWrite) || entryExists ) {
        entryExists = true;
      } else {
        if (line.startsWith(sectionComment)) lineToInsertPos = idx + 1;
      }
    });

    if (entryExists) {
      resultStr = messages.getMessage('entryExists');
      this.ux.log(resultStr);
    } else {
      if (lineToInsertPos) {
        // Insert line into file and then overwrite.
        fileLines.splice(lineToInsertPos, 0, entryToWrite);
        let strToWrite:string = '';
        fileLines.forEach(line => {
          strToWrite += line + '\n';
        });
        writeFileSync(fignoreFile, strToWrite);
        resultStr = "Inserted into .forceignore: '" + entryToWrite + "'";
        this.ux.log(resultStr);
      } else {
        // Write our new line at the end, preceeded by Fignore comment
        // add a line to a lyric file, using appendFile
        appendFile(fignoreFile, '\n\n' + sectionComment + '\n' + entryToWrite, (err) => {
          if (err) {
            this.ux.error(err);
          } else {
            resultStr = "Inserted into .forceignore: '" + entryToWrite + "'";
            this.ux.log(resultStr);
          }
        });
      }
    }
    return { result: resultStr };
  }

  /**
   * Encodes the string, and re-unecodes spaces.
   */
  private encodeName():string {
    return encodeURIComponent(this.flags.name).replace(/%20/g, ' ');
  }

  private suffixForMDT():string {
    let mdt:string = this.flags.metadatatype;
    switch(this.flags.metadatatype) {
      case 'ApexClass' :
        return '.cls';
      case 'AuraDefinitionBundle':
        return ''; // This is an odd one - I have raised an issue about this.
      //case 'CustomField' :
      //  return '';
      //case 'CustomMetadata' :
      //  return '';
      case 'CustomObject' :
       return '.object';
      case 'EmailTemplate':
        return '.email';
      case 'FlexiPage' :
        return '.page';
      case 'LightningComponentBundle' :
        return '.component'
      case 'SiteDotCom' :
        return '.site';
      case 'StaticResource' :
        return '.resource';
      default :
        return '.'  + mdt.charAt(0).toLowerCase() + mdt.slice(1);
    }
  }

}
