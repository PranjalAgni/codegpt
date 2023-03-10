import * as vscode from "vscode";
import { HelloWorldPanel } from "./HelloWorldPanel";
import chatGPT from "./lib/ChatGPT";

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

  const commandOpenApiKey = vscode.commands.registerCommand(
    "chatgpt.apikey",
    async () => {
      const apikey = await vscode.window.showInputBox({
        prompt: "Please provide your OpenAI API key"
      });

      if (apikey?.length) {
        console.log("Initalizing API key");
        chatGPT.setApiKey(apikey);
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

  const commandAskGpt = vscode.commands.registerCommand(
    "chatgpt.askgpt",
    async () => {
      const message = await vscode.window.showInputBox({
        prompt: "Type the message here"
      });

      if (message?.length) {
        console.log("Sending request to chatgpt");
        const response = await chatGPT.askGPT(message);
        console.log("Response: ", response);
      }
    }
  );

  context.subscriptions.push(
    commandExplain,
    commandRefresh,
    commandOpenApiKey,
    commandAskGpt
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
