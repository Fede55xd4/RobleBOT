let handler = async (m, { conn, usedPrefix, text }) => {
    let { key } = await conn.sendMessage(m.chat, { text: "Ahora te voy a hacer una paja " }, { quoted: m });
    const array = [
      "8==👊==D", "8===👊=D", "8=👊===D", "8=👊===D", "8==👊==D", "8===👊=D", "8=👊===D", "8==👊==D", "8===👊=D", "8=👊===D","8==👊==D","8===👊=D","8===👊=D💦"
    ];
  
    for (let item of array) {
      await conn.sendMessage(m.chat, { text: `${item}`, edit: key }, { quoted: m });
      await new Promise(resolve => setTimeout(resolve, 20)); // Delay 5 seconds
    }
    return conn.sendMessage(m.chat, { text: `Oh, ${text} ohh me vengo ohh sii, toma tu leche 🍼, quieres mas?!😋💦`.trim() , edit: key, mentions: [m.sender] }, { quoted: m });
  };
  
  handler.help = ['fun', 'fap'];
  handler.tags = ['fun', 'sega'];
  handler.command = /^(paja)$/i;
  
  export default handler;