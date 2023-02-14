import * as vscode from "vscode";
import { HelloWorldPanel } from "./HelloWorldPanel";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const config = vscode.workspace.getConfiguration("chatgpt");
  console.log("Config fetched from manifest file: ", config);

  const commandExplain = vscode.commands.registerCommand(
    "chatgpt.explain",
    () => {
      vscode.window.showInformationMessage("Explaining code with chatgpt!");
      console.log("Extension URI: ", context.extensionUri);
      HelloWorldPanel.createOrShow(context.extensionUri);
      const editor = vscode.window.activeTextEditor;
      const selection = editor?.selection;
      const text = editor?.document.getText(selection);
      if (text?.length) {
        console.log("This is the selection text: ", text);
      }
    }
  );

  const commandRefresh = vscode.commands.registerCommand(
    "chatgpt.refresh",
    () => {
      HelloWorldPanel.kill();
      HelloWorldPanel.createOrShow(context.extensionUri);
      setTimeout(() => {
        vscode.commands.executeCommand(
          "workbench.action.webview.openDeveloperTools"
        );
      }, 500);
    }
  );

  context.subscriptions.push(commandExplain, commandRefresh);
}

// This method is called when your extension is deactivated
export function deactivate() {}
