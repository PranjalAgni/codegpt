class ChatGPT {
  private static instance: ChatGPT;
  private apiKey: string;

  static getInstance() {
    if (!ChatGPT.instance) {
      ChatGPT.instance = new ChatGPT();
    }

    return ChatGPT.instance;
  }

  public setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }
}

export default ChatGPT.getInstance();
// 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
