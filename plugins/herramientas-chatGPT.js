import fetch from 'node-fetch';
import axios from 'axios';
import {Configuration, OpenAIApi} from 'openai';

const configuration = new Configuration({organization: global.openai_org_id, apiKey: global.openai_key});
const openaiii = new OpenAIApi(configuration);

const handler = async (m, {conn, text, usedPrefix, command}) => {
  if (usedPrefix == 'a' || usedPrefix == 'A') return;
  if (!text) throw `*🤖 ChatGPT 🤖*
*Para usar ChatGPT debes escribir una solicitud. Ejemplo: .ia dame un top 10 peliculas de terror.*`;

  let formattedResponse; // Variable para la respuesta formateada

  // Comprobamos que el comando es 'ia' o 'chatgpt'
  if (command == 'ia' || command == 'chatgpt') {
    try {     
      await conn.sendPresenceUpdate('composing', m.chat);

      async function luminsesi(q, username, logic) {
        try {
          const response = await axios.post("https://luminai.my.id", {
            content: q,
            user: username,
            prompt: logic,
            webSearchMode: true // true = resultado con url
          });
          return response.data.result;
        } catch (error) {
          console.error('Error al obtener:', error);
          return null; // Si falla la API, devolvemos null
        }
      }

      // El texto es lo que el usuario escribe después del comando (sin el comando en sí)
      let query = text; // Aquí tomamos solo lo que sigue después del comando
      let username = `${m.pushName}`;
      let syms1 = `Actuaras como un Bot de WhatsApp creado por RobleUY. Eres RobleBOT.`;  

      // Intentamos obtener una respuesta de 'luminsesi' primero
      let result = await luminsesi(query, username, syms1);

      if (result) {
        // Si 'luminsesi' devuelve una respuesta, la usamos
        formattedResponse = `*🤖 ChatGPT 🤖*
*⭐ Solicitud:* ${query}
*📍 Respuesta:* ${result}`;
      } else {
        // Si 'luminsesi' falla, intentamos obtener una respuesta de GPT
        let gpt = await fetch(`${apis}/ia/gptweb?text=${text}`); 
        let res = await gpt.json();
        
        formattedResponse = `*🤖 ChatGPT 🤖*
*⭐ Solicitud:* ${text}
*📍 Respuesta:* ${res.gpt}`;
      }

      // Enviamos la respuesta formateada
      await m.reply(formattedResponse);
      
    } catch (error) {
      console.error('Error en el manejo de la solicitud:', error);
    }
  }

  // Comando 'openai' o 'ia2' o 'chatgpt2'
  if (command == 'openai' || command == 'ia2' || command == 'chatgpt2') {
    try {
      conn.sendPresenceUpdate('composing', m.chat);
      let gpt = await fetch(`${apis}/ia/gptweb?text=${text}`); 
      let res = await gpt.json();
      
      formattedResponse = `
*RobleBOT*

*Solicitud:* ${text}
*Respuesta:* ${res.gpt}
      `;
      
      // Enviamos la respuesta formateada
      await m.reply(formattedResponse);
    } catch (error) {
      console.error('Error al obtener respuesta de GPT:', error);
    }
  }
};

handler.command = /^(openai|chatgpt|ia|ai|openai2|chatgpt2|ia2)$/i;
export default handler;
