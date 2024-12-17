let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text)
      throw `*Para usar este comando tienes que etiquetar a alguien o escribir un texto.*\n\n_Ejemplos:_\n.love @usuario\n.besar a mi novi@`;

  // --------------------------
  if (command == "love") {
      let juego =
          `(っ◔◡◔)っ *Medidor de Amor* 💘\n \n*♡ @${m.sender.split('@')[0]} y ${text} se aman un ${(100).getRandom()}% ♡*\n
  ░░▄███▄███▄ 
  ░░█████████ 
  ░░▒▀█████▀ 
  ░░▒░░▀█▀ `.trim();

      await conn.reply(
          m.chat,
          juego,
          m,
          m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {}
      );

  }

  // --------------------------
  if (command == "besar") {
      let juego =
          `*@${m.sender.split('@')[0]} beso 😙 a ${text}*`.trim();

      await conn.reply(
          m.chat,
          juego,
          m,
          m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {}
      );

  }
  // -----------------
      if (command == "follar") {
          let juego =
              `*@${m.sender.split('@')[0]} se cojio bien duro 🥵 a ${text}*\nεつ▄█▀█●\nㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ 
⠀⠀⠀⠀⠀⠀⠀⣠⣶⣶⣦⡀
⠀⠀⠀⠀⠀⠀⢰⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠻⣿⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣴⣶⣶⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣸⣿⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⣿⣿⣿⣿⣿⣧⠀⠀⠀. 
⠀⠀⠀⠀⣼⣿⣿⣿⡿⣿⣿⣆⠀⠀⠀⠀⠀⠀⣠⣴⣶⣤⡀⠀
⠀⠀⠀⢰⣿⣿⣿⣿⠃⠈⢻⣿⣦⠀⠀⠀⠀⣸⣿⣿⣿⣿⣷⠀
⠀⠀⠀⠘⣿⣿⣿⡏⣴⣿⣷⣝⢿⣷⢀⠀⢀⣿⣿⣿⣿⡿⠋⠀
⠀⠀⠀⠀⢿⣿⣿⡇⢻⣿⣿⣿⣷⣶⣿⣿⣿⣿⣿⣷⠀⠀⠀⠀
⠀⠀⠀⠀⢸⣿⣿⣇⢸⣿⣿⡟⠙⠛⠻⣿⣿⣿⣿⡇⠀⠀⠀⠀
⣴⣿⣿⣿⣿⣿⣿⣿⣠⣿⣿⡇⠀⠀⠀⠉⠛⣽⣿⣇⣀⣀⣀⠀
⠙⠻⠿⠿⠿⠿⠿⠟⠿⠿⠿⠇⠀⠀⠀⠀⠀⠻⠿⠿⠛⠛⠛⠃`.trim();

          await conn.reply(
              m.chat,
              juego,
              m,
              m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {}
          );

      }
      // ------------------------
    if (command == 'gay') {    
    let vn = 'https://qu.ax/HfeP.mp3';
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    conn.sendFile(m.chat, global.API('https://some-random-api.com', '/canvas/gay', {  
    avatar: await conn.profilePictureUrl(who, 'image').catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'),   
    }), 'error.png', `𝙂𝘼𝙔 🏳️‍🌈`, m)   
    await await await conn.sendFile(m.chat, vn, 'error.mp3', null, m, true, { 
    type: 'audioMessage', 
    ptt: true })}

    
    // -----------------
    if (command == "golpear") {
      if (!text) return m.reply(`**Falto mencionar a alguien o escribir algo seguido del comando.`)

      let golpes = Math.floor(Math.random() * 100) + 1; // Genera un número aleatorio entre 1 y 100
      let juego = `*@${m.sender.split('@')[0]} golpeó a ${text} ${golpes} veces* 🥊💥`.trim();

      await conn.reply(
          m.chat,
          juego,
          m,
          m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {}
      );
    }

    // --------------------------








    // ------------------------

  if (command == "calcular") {
      let juego =
          `*${text}* *--> Resultado:* *${(100).getRandom()}%*
  `.trim();
      await conn.reply(
          m.chat,
          juego,
          m,
          m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {}
      );
  }
  // ------------------------
    if (command == "banana") {
        let numeroAleatorio = Math.floor(Math.random() * 101); // Genera un número entre 0 y 100
        let juego = `Tu banana te mide *${numeroAleatorio}CM* 🍌`;

        await conn.reply(
            m.chat,
            juego,
            m
        );
    }



  if (command == "calcular2") {
      let juego =
          `*${text}* *--> Resultado:* *${(100).getRandom()} CM*
  `.trim();
      await conn.reply(
          m.chat,
          juego,
          m,
          m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {}
      );
  }
  // -----------------------

  if (command == "calcular3") {
      let juego =
          `*${text}* *--> Resultado:* *${(100).getRandom()}*
  `.trim();
      await conn.reply(
          m.chat,
          juego,
          m,
          m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {}
      );
  }
  // --------------------------
    if (command == "lindo") {
      let juego =
          `*${text}* *es* *${(100).getRandom()}% lindo* 😍
`.trim();
      await conn.reply(
          m.chat,
          juego,
          m,
          m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {}
      );
  }
  // ------------------------
     if (command == "disparar") {
          const balasTotales = 6;
          const probabilidadImpacto = 0.6; 

          let balasImpactadas = 0;
          for (let i = 0; i < balasTotales; i++) {
              if (Math.random() < probabilidadImpacto) {
                  balasImpactadas++;
              }
          }

          const balasErradas = balasTotales - balasImpactadas;

          const mensaje =
              `*¡Disparaste 6 balas a ${text}!* 🎯\n\n` +
              `Balas impactadas: ${balasImpactadas}\n` +
              `Balas erradas: ${balasErradas}\n\n` +
              `💥💥💥💥💥💥`;

          await conn.reply(
              m.chat,
              mensaje,
              m,
              m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {}
          );
      }

  if (command == "linda") {
      let juego =
          `*${text}* *es* *${(100).getRandom()}% linda* 😍
`.trim();
      await conn.reply(
          m.chat,
          juego,
          m,
          m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {}
      );
  }

  // ---------------
    if (command == "encestar") {
        let juego = `*@${m.sender.split('@')[0]} encestó una canasta en ${text}!* 🏀💥\n\n` +
                    `¡Un increíble ${(Math.random() * 100).toFixed(0)}% de aciertos!`;
        await conn.reply(m.chat, juego, m, m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {});
    }

};
handler.help = [
  "disparar",
  "encestar",
  "calcular",
  "calcular2",
  "calcular3",
  "love",
  "besar",
  "lindo",
  "follar",
  "linda",
  "gay",
  "golpear",
  "banana"
].map((v) => v + " @tag | nombre");
handler.tags = ["calculator"];
handler.command =
  /^banana|love|encestar|calcular|golpear|follar|calcular2|calcular3|besar|lindo|gay|disparar|linda/i;
handler.exp = 0;
export default handler;