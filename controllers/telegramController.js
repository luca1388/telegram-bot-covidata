const axiosTelegram = require("../util/axiosTelegram").axiosTelegram;
const axios = require("axios").default;

const italyCovidDataUrl = require("../util/urls").getItalyCovidDataUrl;
const getAllCovidDataUrl = require("../util/urls").getAllCovidDataUrl;
const telegramSendMessagePath = require("../util/constants").telegramSendMessagePath;

const handleNewMessage = async (req, res, _next) => {
  const userMessage = req.body.message;
  console.log(userMessage);

  commandsRouter[commandsRouter[userMessage.text] ? userMessage.text : "/unknown"](
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

    let responseText = `<strong>Casi totali: </strong> ${data.cases}\n<strong>Deceduti totali: </strong> ${data.deaths}\n<strong>Malati attuali: </strong> ${data.active}\n<strong>Casi di oggi: </strong> ${data.todayCases}\n<strong>Deceduti di oggi: </strong> ${data.todayDeaths}`;

    await sendResponseToTelegram(message, responseText);
    res.end();
  },
  "/mondo": async (message, res) => {
      const response = await axios.get(getAllCovidDataUrl);
      const data = response.data;
  
      if (!data) {
        return next(new Error("Could not find COVID-19 information"));
      }
  
      let responseText = `<strong>Casi totali: </strong> ${data.cases}\n<strong>Deceduti totali: </strong> ${data.deaths}\n<strong>Malati attuali: </strong> ${data.active}\n<strong>Casi di oggi: </strong> ${data.todayCases}\n<strong>Deceduti di oggi: </strong> ${data.todayDeaths}`;
  
      await sendResponseToTelegram(message, responseText);
      res.end();
  },
  "/unknown": async (message, res) => {
    await sendResponseToTelegram(message, "Uhmm, non ho capito prova con /italia o /mondo");
    res.end();
  },
  "/start": async (message, res) => {
    await sendResponseToTelegram(message, "Controlla gli aggiornamenti sul contagio da covid-19 in /italia oppure in tutto il /mondo");
    res.end();
  }
};

const sendResponseToTelegram = async (senderMessage, textToSend) => {
  let parameters = {
    chat_id: senderMessage.chat.id,
    text: textToSend,
    parse_mode: "html",
  };

  console.log(telegramSendMessagePath);

  await axiosTelegram.post(telegramSendMessagePath, parameters);
};

exports.handleNewMessage = handleNewMessage;
