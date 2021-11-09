// Supports ES6
import { create, Whatsapp } from 'venom-bot';

const { NlpManager } = require('node-nlp');

const manager = new NlpManager({ languages: ['pt'], forceNER: true });
// Saudação
manager.addDocument('pt', 'boa tarde', 'SAUDACAO');
manager.addDocument('pt', 'bom dia', 'SAUDACAO');
manager.addDocument('pt', 'boa noite', 'SAUDACAO');
manager.addDocument('pt', 'tudo bem', 'PERGUNTA');
manager.addDocument('pt', 'oi', 'SAUDACAO');
manager.addDocument('pt', 'olá', 'SAUDACAO');
manager.addDocument('pt', 'tudo bom', 'PERGUNTA');
manager.addDocument('pt', 'hi', 'SAUDACAO');
manager.addDocument('pt', 'tudo certo', 'PERGUNTA');

// 

// RESPOSTAS
manager.addAnswer('pt', 'SAUDACAO', 'Olá!');
manager.addAnswer('pt', 'SAUDACAO', 'Oi!');
manager.addAnswer('pt', 'SAUDACAO', 'Hi!');
manager.addAnswer('pt', 'PERGUNTA', 'Tudo, e você?');


// Train and save the model.
(async() => {
    await manager.train();
    manager.save();

    create('BOT')
  .then((client) => {
    client.onMessage(async(message) => {
      if (message.isGroupMsg === false) {
      const response = await manager.process('pt', message.body.toLowerCase());
      if (response.intent === 'None') {
        client.sendText(message.from, 'Desculpa, não entendi sua mensagem, ainda estou aprendendo aos poucos sobre os humanos!')
      }else {
        client.sendText(message.from, response.answer)
      }
      console.log('Intenção', response.intent);
      console.log('Precisão', response.score);
      }
    });
  })
  .catch((erro) => {
    console.log(erro);
  });

})();




