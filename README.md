sfdx-sfignore-plugin
===================

Plugin to add entries to forceignore, to save folk remembering the syntax.

[![Version](https://img.shields.io/npm/v/sfdx-sfignore-plugin.svg)](https://npmjs.org/package/sfdx-sfignore-plugin)
[![CircleCI](https://circleci.com/gh/toddhalfpenny/sfdx-sfignore-plugin/tree/master.svg?style=shield)](https://circleci.com/gh/toddhalfpenny/sfdx-sfignore-plugin/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/toddhalfpenny/sfdx-sfignore-plugin?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/sfdx-sfignore-plugin/branch/master)
[![Codecov](https://codecov.io/gh/toddhalfpenny/sfdx-sfignore-plugin/branch/master/graph/badge.svg)](https://codecov.io/gh/toddhalfpenny/sfdx-sfignore-plugin)
[![Greenkeeper](https://badges.greenkeeper.io/toddhalfpenny/sfdx-sfignore-plugin.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/toddhalfpenny/sfdx-sfignore-plugin/badge.svg)](https://snyk.io/test/github/toddhalfpenny/sfdx-sfignore-plugin)
[![Downloads/week](https://img.shields.io/npm/dw/sfdx-sfignore-plugin.svg)](https://npmjs.org/package/sfdx-sfignore-plugin)
[![License](https://img.shields.io/npm/l/sfdx-sfignore-plugin.svg)](https://github.com/toddhalfpenny/sfdx-sfignore-plugin/blob/master/package.json)

Currently supported;
- Remote meta
- Subset of metadata types - being added as I come across them.

If you want a metadatatype added please raise an issue.

## Known issues
- Ignoring `CustomField` can only be done at an object-side level. Belief is that this is a limitation with the SFDX cli
- Ignoring `RecordTpe` can only be done at an object-side level. Belief is that this is a limitation with the SFDX cli
- Ignoring of custom metadata appears to have a global affect - so it's left out deliberately for the time being

## Installation & Usage

<!-- toc -->

<!-- tocstop -->
<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g sfignore
$ sfdx COMMAND
running command...
$ sfdx (-v|--version|version)
sfignore/0.0.1 linux-x64 node-v8.11.4
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`sfdx `](#sfdx-)

## `sfdx `

Add an entry to your .forceignore file

```
USAGE
  $ sfdx sfignore:add [FILE]

OPTIONS
  -m,
  --metadatatype=ApexClass|AppMenu|AuraDefinitionBundle|CustomObject|EmailTemplate|FlexiPage|Layout|LightningComponentBu
  ndle|NavigationMenu|Network|Portal|Profile|Role|SiteDotCom|StaticResource
      (required) metadata type

  -n, --name=name
      (required) name of entry

  -r, --remote
      Remote

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

EXAMPLES
  $ sfdx sfignore:add -n MyRole -t Role -r
     Inserted into .forceignore: 'MyRole.role'

  $ sfdx sfignore:add -n "Custom: Sales Profile" -t Profile -r
     Inserted into .forceignore: 'Custom%3A Sales Profile.profile'
```

_See code: [lib/commands/sfignore/add.js](https://github.com/toddhalfpenny/sfdx-sfignore-plugin/blob/v0.0.1/lib/commands/sfignore/add.js)_
<!-- commandsstop -->

## Roadmap
- Support for local file ignoring
- widcarding/directories
- vsCode support
