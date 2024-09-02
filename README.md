# CreateClass README

This is a VSCode extension that is aimed primarily at C++ developers but may be useful
for other languages. What I was looking for is a way to easily create class header and 
source files from templates. A quick google didn't turn anything up, and I was interested
in learning how to create VSCode extensions, so here you go.

## Features

### Create Class Command
Adds a new command Create Class that requests the name of the class to be created.
Create Class uses the [npm mustache module](https://www.npmjs.com/package/mustache) to
expand variables in file templates to create the output files. Template file names can 
contain template variables to guide file naming.
The output folder will be the folder selected in the file explorer tree.

The command can also be executed from the context menu when a folder is selected.

I always put a space between words in my class name and use camel case or pascal case.
The Create Class command will create variables with spaces removed and with spaces
replaced with underscores. These can be used in file names and in the header and source
files. If the class name is entered without spaces, it is available as entered.

The "view" used by mustache to render the template is provided in the configuration (templateVars object).

The following values are added to the view by the command:
* `CLASS_NAME`: The class name string entered with whitespace removed.
* `CLASS_NAME_UNDER`: The class name string entered with whitespace replaced with underscores.
* `CLASS_NAME_UPPER`: CLASS_NAME_UNDER converted to uppercase (useful for include guards).
* `CLASS_NAME_LOWER`: CLASS_NAME_UNDER converted to lowercase (useful for file names).
* `TODAYS_DATE`: Today's date as a string. 


## Requirements

I used [these instructions](https://vscode-docs.readthedocs.io/en/stable/tools/yocode/) to create the extension project.

I added the mustache module like so:
```
npm i --save-dev @types/mustache
```
## Extension Settings

This extension contributes the following settings:

* `create_class.templatePath`: Path (or URI) to folder containing template files. All files in
the given folder will be expanded. The folder path can be relative to the workspace. Example
templates are provided in the cpp_templates folder. 
* `create_class.templateVars`: This is the view object that will be passed to mustache. Example
values are provided as defaults.

## Known Issues

This work is incomplete and largely un-tested, but I wanted to get it into source control. There is 
minimal error reporting. If the template folder can't be accessed, for instance, you'll get a nasty
traceback. Need to fix that.

## Release Notes

### 0.1.0

Initial effort. It appears to work, but is largely un-tested.


## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
