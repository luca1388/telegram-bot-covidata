const axiosTelegram = require("../util/axiosTelegram").axiosTelegram;
const axios = require("axios").default;

const italyCovidDataUrl = require("../util/urls").getItalyCovidDataUrl;

const handleNewMessage = async (req, res, _next) => {
  const userMessage = req.body.message;

  commandsRouter[commandsRouter[userMessage.text] ? message.text : "/unknown"](
    userMessage,
    res
  );
};

const commandsRouter = {
  "/italia": async (message, res) => {
    const response = await axios.get(italyCovidDataUrl);
    const data = response.data;

    if (!data) {
      return next(new Error("Could not find COVID-19 information"));
    }

    await sendResponseToTelegram(message, JSON.stringify(data));
    res.end();
  },
  "/unknown": async (message, res) => {
    await sendResponseToTelegram(message, "Uhmm, i cannot understand you. Please try again, maybe with the available commands?");
    res.end();
  },
};

const sendResponseToTelegram = async (senderMessage, textToSend) => {
  let parameters = {
    chat_id: senderMessage.chat.id,
    text: textToSend,
    parse_mode: "html",
  };

  await axiosTelegram.post(sendMessageUrl, parameters);
};

exports.handleNewMessage = handleNewMessage;
