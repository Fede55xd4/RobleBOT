//                      RANITA
//                👇 CRÉDITOS PARA 👇          
//                  👉  ROBLEUY 👈
//                                          
//               (robleuy) PROGRAMADOR
//
let cooldown = {};
let activeRace = {};

const carEmojis = ["🚗", "🚕", "🚙", "🚌", "🚎", "🏎️", "🚓", "🚑", "🚒", "🚐", "🛻", "🚚", "🚛", "🚜", "🦽", "🦼", "🛴", "🚲", "🛵", "🏍️", "🛺", "🚂", "🛸", "🚁", "🏇", "🏃", "🏃‍♀", "🪿", "🐩", "🏂", "🪂", "⛹️‍♀️", "⛹️‍♂️", "🏊‍♂️", "🚴‍♀️", "🚴‍♂️", "🐌"];
const altCarEmojis = ["🚗", "🚕", "🚙", "🚌", "🚎", "🏎️", "🚓", "🚑", "🚒", "🚐", "🛻", "🚚", "🚛", "🚜", "🦽", "🦼", "🛴", "🚲", "🛵", "🏍️", "🛺", "🚂", "🛸", "🚁", "🏇", "🏃", "🏃‍♀", "🪿", "🐩", "🏂", "🪂", "⛹️‍♀️", "⛹️‍♂️", "🏊‍♂️", "🚴‍♀️", "🚴‍♂️", "🐌"];
const baltCarEmojis = ["🚗", "🚕", "🚙", "🚌", "🚎", "🏎️", "🚓", "🚑", "🚒", "🚐", "🛻", "🚚", "🚛", "🚜", "🦽", "🦼", "🛴", "🚲", "🛵", "🏍️", "🛺", "🚂", "🛸", "🚁", "🏇", "🏃", "🏃‍♀", "🪿", "🐩", "🏂", "🪂", "⛹️‍♀️", "⛹️‍♂️", "🏊‍♂️", "🚴‍♀️", "🚴‍♂️", "🐌"];

let handler = async (m, { conn, usedPrefix, text }) => {
    if (activeRace[m.sender]) return;

    activeRace[m.sender] = true;
    let { key } = await conn.sendMessage(m.chat, { text: "La carrera ha comenzado" }, { quoted: m });

    const arrayWin = [
        "*_Carreras de autos_*\n\n🏁|===============🏎️ Tu\n🏁|===============⚫ \n🏁|===============😏 \n",
        "*_Carreras de autos_*\n\n🏁|=============🏎️ Tu\n🏁|==============⚫ \n🏁|==============😏 \n",
        "*_Carreras de autos_*\n\n🏁|============🏎️ Tu\n🏁|=============⚫ \n🏁|=============😏 \n",
        "*_Carreras de autos_*\n\n🏁|===========🏎️ Tu\n🏁|============⚫ \n🏁|============😏 \n",
        "*_Carreras de autos_*\n\n🏁|==========🏎️ Tu\n🏁|===========⚫ \n🏁|===========😏 \n",
        "*_Carreras de autos_*\n\n🏁|=========🏎️ Tu\n🏁|==========⚫ \n🏁|==========😏 \n",
        "*_Carreras de autos_*\n\n🏁|======🏎️ Tu\n🏁|=========⚫ \n🏁|=========😏 \n",
        "*_Carreras de autos_*\n\n🏁|====🏎️ Tu\n🏁|========⚫ \n🏁|========😏 \n",
        "*_Carreras de autos_*\n\n🏁|==🏎️ Tu\n🏁|======⚫ \n🏁|=======😏 \n",
        "*_Carreras de autos_*\n\n🏁|🏎️ Tu\n🏁|==⚫ \n🏁|=====😏 \n",
    ];

    const arrayLose = [
        "*_Carreras de autos_*\n\n🏁|===============⚫ \n🏁|===============🏎 Tu\n🏁|===============😏 \n",
        "*_Carreras de autos_*\n\n🏁|==============⚫ \n🏁|==============🏎 Tu\n🏁|=============😏 \n",
        "*_Carreras de autos_*\n\n🏁|=============⚫️ \n🏁|============🏎 Tu\n🏁|============😏 \n",
        "*_Carreras de autos_*\n\n🏁|============⚫️ \n🏁|===========🏎 Tu\n🏁|===========😏 \n",
        "*_Carreras de autos_*\n\n🏁|===========⚫️ \n🏁|==========🏎 Tu\n🏁|==========😏 \n",
        "*_Carreras de autos_*\n\n🏁|===========⚫️ \n🏁|=========🏎 Tu\n🏁|=========😏 \n",
        "*_Carreras de autos_*\n\n🏁|==========⚫️ \n🏁|=======🏎 Tu\n🏁|=========😏 \n",
        "*_Carreras de autos_*\n\n🏁|=========⚫️ \n🏁|====🏎 Tu\n🏁|========😏 \n",
        "*_Carreras de autos_*\n\n🏁|=========⚫️ \n🏁|==🏎 Tu\n🏁|=====😏 \n",
        "*_Carreras de autos_*\n\n🏁|=====⚫️ \n🏁|🏎 Tu\n🏁|==😏 \n",
    ];

    const arrayPolice = [
        "*_Carreras de autos_*\n\n🏁|===============😏️ \n🏁|===============⚫ \n🏁|===============🏎 Tu\n",
        "*_Carreras de autos_*\n\n🏁|============😏️ \n🏁|============⚫ \n🏁|============🏎 Tu\n",
        "*_Carreras de autos_*\n\n🏁|===========😏️ \n🏁|===========⚫ \n🏁|=========🏎 Tu\n",
        "*_Carreras de autos_*\n\n🏁|==========😏️ \n🏁|=========⚫ \n🏁|=======🏎 Tu\n",
        "*_Carreras de autos_*\n\n🏁|=========😏️ \n🏁|=====⚫ \n🏁|======🏎 Tu\n",
        "*_Carreras de autos_*\n\n🏁|========😏️ \n🏁|====⚫ \n🏁|=====🏎 Tu\n",
        "*_Carreras de autos_*\n\n🏁|========😏️ \n🏁|====⚫ \n🏁|====🏎 Tu\n",
        "*_Carreras de autos_*\n\n🏁|=======😏️ \n🏁|===⚫ \n🏁|===🏎 Tu\n",
        "*_Carreras de autos_*\n\n🏁|====😏️ \n🏁|===⚫ \n🏁|==🏎 Tu\n",
        "*_Carreras de autos_*\n\n🏁|=😏️ \n🏁|==⚫ \n🏁|🏎 Tu\n",
    ];

    let randomNumber = Math.random();
    let arrayToUse;
    let message;
    let carEmoji = carEmojis[Math.floor(Math.random() * carEmojis.length)];
    let altCarEmoji = altCarEmojis[Math.floor(Math.random() * altCarEmojis.length)];
    let altCarEmoji2 = altCarEmojis[Math.floor(Math.random() * altCarEmojis.length)];

    let ganancia = Math.floor(Math.random() * (1000 - 500 + 1)) + 500; // Ganancia aleatoria entre 1000 y 2000

    if (randomNumber < 0.5) {
        arrayToUse = arrayWin;
        message = `🏁 *La carrera ha finalizado* 🏁\n🌟 _Has ganado:_ *${ganancia}*`;
        global.db.data.users[m.sender].money += ganancia;
    } else if (randomNumber < 0.8) {
        arrayToUse = arrayLose;
        message = `🏁 *La carrera ha finalizado* 🏁\n🌟 _Has ganado:_ *${ganancia}*`;
        global.db.data.users[m.sender].money += ganancia;
    } else {
        arrayToUse = arrayPolice;
        message = `🏁 *La carrera ha finalizado* 🏁\n🌟 _Has ganado:_ *${ganancia}*`;
        global.db.data.users[m.sender].money += ganancia;
    }

    for (let item of arrayToUse) {
        // Reemplazar emojis en la pista con el conjunto específico seleccionado
        item = item.replace(/🏎️/g, carEmoji);
        item = item.replace(/⚫/g, altCarEmoji);
        item = item.replace(/😏/g, altCarEmoji2);

        await conn.sendMessage(m.chat, { text: `${item}`, edit: key }, { quoted: m });
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    let reply;
    cooldown[m.sender] = 3;
    let interval = setInterval(() => {
        if (cooldown[m.sender] === 0) {
            clearInterval(interval);
            delete cooldown[m.sender];
        } else {
            cooldown[m.sender]--;
        }
    }, 1000);

    setTimeout(() => {
        delete activeRace[m.sender];
        if (reply) {
            conn.reply(m.chat, reply, m);
        }
    }, cooldown[m.sender] * 1000);

    return conn.sendMessage(m.chat, { text: message, edit: key }, { quoted: m });
};

handler.help = ['carreraspb'];
handler.tags = ['raninntaxd', 'nnn'];
handler.command = /^(carreras)$/i;

export default handler;
