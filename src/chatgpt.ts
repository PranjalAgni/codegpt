import { ChatGPTAPI } from "chatgpt";

const main = async (apiKey: string) => {
  const api = new ChatGPTAPI({
    apiKey
  });

  const response = await api.sendMessage("Hello world how are you?");

  console.log("ChatGPT says ", response);
};

main("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");
