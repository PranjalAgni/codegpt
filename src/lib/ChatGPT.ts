import { ChatGPTAPI } from "chatgpt";

class ChatGPT {
  private static instance: ChatGPT;
  private apiKey: string;
  private client: ChatGPTAPI;

  static getInstance() {
    if (!ChatGPT.instance) {
      ChatGPT.instance = new ChatGPT();
    }

    return ChatGPT.instance;
  }

  public setApiKey(apiKey: string) {
    this.apiKey = apiKey;
    console.log("Setting API key: ", this.apiKey);
    this.initalizeApiClient();
  }

  private initalizeApiClient() {
    this.client = new ChatGPTAPI({
      apiKey: this.apiKey
    });

    console.log("Api client: ", this.client);
  }
}

export default ChatGPT.getInstance();
