import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const config = vscode.workspace.getConfiguration("chatgpt");
  console.log(" Config fetched from manifest file: ", config);

  const commandExplain = vscode.commands.registerCommand(
    "chatgpt.explain",
    () => {
      vscode.window.showInformationMessage("Explaining code with chatgpt");
    }
  );

  context.subscriptions.push(commandExplain);
}

// This method is called when your extension is deactivated
export function deactivate() {}
