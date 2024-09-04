// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import Mustache from 'mustache'; // https://www.npmjs.com/package/mustache

// Disable HTML escaping:
Mustache.escape = function(text: string) {return text;};

// The command is Create Class and it asks for a class name
// If a folder is selected from context menu, the class file(s) will be created there, if one is 
// selected in the explorer it will be used.

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    console.log("Run once: 3");
    // Register the command and the code to run when the command is executed.
    let disposable = vscode.commands.registerCommand('pstoaks.CreateClass', async (dest_folder) => {
		// The code you place here will be executed every time your command is executed.
        // Could put just a function call here.

        // Get the configuration for this extension
        // TODO: Look at some good example extension implementations for best
        // practices with regard to extension names, identifiers, etc. 
        const config = vscode.workspace.getConfiguration('create_class');

		// Display a message box to the user
        const className = await vscode.window.showInputBox({
            prompt: "Enter the class name: "
        });

        let outputFolder = await getDestinationFolder(dest_folder);

        if (className && outputFolder) {
            try {
                // Get the template variable list
                const templateVarsC = config.get('templateVars') as { [key: string]: string };
                let templateVars = Object.assign({}, templateVarsC); // deep copy of templateVarsC
                // If the given class name has a space, remove it, and create a version with an underscore.
                templateVars['CLASS_NAME'] = className.replace(/\s+/g, ''); // Remove any spaces
                templateVars['CLASS_NAME_UNDER]'] = className.replace(/\s+/g, '_'); // Replace spaces with underscores.
                templateVars['CLASS_NAME_UPPER'] = templateVars['CLASS_NAME_UNDER]'].toUpperCase();
                templateVars['CLASS_NAME_LOWER'] = templateVars['CLASS_NAME_UNDER]'].toLowerCase();
                templateVars['TODAYS_DATE'] = getTodayDateString();

                // Get the templates
                const workspaceFolder = getWorkspaceFolder();
                const templatesFolderC = config.get('templatePath') as string;
                const templatesFolder = getAbsolutePathOrUri(templatesFolderC, workspaceFolder);
                const templates = await listFilesInFolder(templatesFolder);
//              const extensionPath = context.extensionPath; // Not using this

                templates.forEach(template => renderTemplate(template, outputFolder, templateVars));
            } catch (error) {
                vscode.window.showErrorMessage("Unable to access templates in folder: " + error);
                console.error('Error listing templates:', error);
            }
        }
    });

    context.subscriptions.push(disposable);
}

// Return today's date as a string.
function getTodayDateString(): string {
    const today = new Date();
    return today.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

function getWorkspaceFolder(): string {
    // @TODO: What if there are multiple workspace folders? This just returns the first.
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
        throw new Error('No workspace folder found');
    }

    return workspaceFolder?.uri.fsPath;
}

function getAbsolutePathOrUri(configPath: string, workspaceFolder: string): vscode.Uri {
    if (configPath.startsWith('file:') || configPath.startsWith('vscode:')) {
        // It's already a URI
        return vscode.Uri.parse(configPath);
    } else {
        // Resolve the path relative to the workspace root
        const absolutePath = path.resolve(workspaceFolder, configPath);
        return vscode.Uri.file(absolutePath);
    }
}

async function listFilesInFolder(uri: vscode.Uri): Promise<vscode.Uri[]> {
    const stat = await vscode.workspace.fs.stat(uri);
    if (stat.type === vscode.FileType.Directory) {
        const entries = await vscode.workspace.fs.readDirectory(uri);
        return entries
            .filter(([_, type]) => type === vscode.FileType.File)
            .map(([name, _]) => vscode.Uri.joinPath(uri, name));
    } else {
        throw new Error('The provided path is not a directory');
    }
}

async function getDestinationFolder(command_arg: vscode.Uri): Promise<string | undefined> {
    // If command_arg is filled in, the command was executed from a context menu and our job
    // is done.
    if (command_arg) {
        return command_arg.fsPath;
    }

    // If the destination folder was not provided, then check to see if a folder was
    // selected in the Explorer view.
    // Attempt to copy the 'selected' thing. This is the only way we could find
    // to get the selected folder.
    await vscode.commands.executeCommand('copyFilePath');

    let dest_folder = await vscode.env.clipboard.readText();  // returns a string
    // TODO: What to do if multiple items were selected? This only works if one folder 
    // was selected.

    // If the thing selected is a folder, use it, if the thing selected is a file, use
    // the parent folder. The assumption is that the newly created class files should go
    // in the same folder as the selected file.
    if ( fs.existsSync(dest_folder) ) {
        const stats = fs.statSync(dest_folder);
        
        if (stats.isDirectory()) {
            // It's a folder, nothing to do
        } else if (stats.isFile()) {
            // It's a file, get the parent folder
            dest_folder = path.dirname(dest_folder);
        }
    }
    else {
        return undefined;
    }

    return dest_folder;
}

async function renderTemplate(template: vscode.Uri, destPath: string, templateVars: { [key: string]: string }) {
    let templateContent = await readFileContents(template);
    // Render the template
    let output = Mustache.render(templateContent, templateVars);
    // Render the file name
    let fileName = Mustache.render(path.basename(template.fsPath), templateVars);

    fs.writeFileSync(path.join(destPath, fileName), output);
}

async function readFileContents(uri: vscode.Uri): Promise<string> {
    if (uri.scheme === 'file') {
        // For file system paths
        return fs.promises.readFile(uri.fsPath, 'utf8');
    } else {
        // For non-file URIs (e.g., vscode: scheme)
        const content = await vscode.workspace.fs.readFile(uri);
        return new TextDecoder().decode(content);
    }
}
