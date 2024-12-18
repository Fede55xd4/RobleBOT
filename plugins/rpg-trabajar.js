let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];

    let timeDiff = new Date() - user.lastWork;
    let waitTime = 60000;  // 1 minuto de espera entre trabajos

    if (timeDiff < waitTime)
        return await conn.reply(m.chat, `*⏰ DEBES ESPERAR ${Math.ceil((waitTime - timeDiff) / 1000)} SEGUNDOS ANTES DE TRABAJAR NUEVAMENTE.*`, m, { contextInfo: null });

    // Lista de trabajos disponibles
    let trabajos = [
        "programador", "diseñador", "escritor", "mesero", "conductor", "pintor", "jardinero", "chef", 
        "repartidor", "cajero", "vendedor", "músico", "modelo", "actor", "profesor", "ingeniero", "arquitecto", 
        "doctor", "enfermero", "fotógrafo", "astrónomo"
    ];
    
    // Selección aleatoria de trabajo
    let trabajoActual = trabajos[Math.floor(Math.random() * trabajos.length)];
    let ganancia = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;

    // Aumentar la ganancia de dinero del usuario
    user.money += ganancia;

    // Actualizar el tiempo de trabajo
    user.lastWork = new Date();
    user.workedHours += 1;
    user.totalWorkedHours += 1;
    user.totalWorkedTimes = user.totalWorkedTimes ? user.totalWorkedTimes + 1 : 1;

    // Aumentar 1 de respeto por trabajar
    user.respeto = (user.respeto || 0) + 1;

    // Formato de la respuesta con la información del trabajo realizado
    let profileInfo = `*@${m.sender.split('@')[0]} trabajaste de ${trabajoActual} y ganaste ${ganancia} RobleCoins.*\n\nTu respeto ahora es: ${user.respeto}`;

    // Enviar respuesta
    return await conn.reply(m.chat, profileInfo, m, m.mentionedJid ? { mentions: [m.sender, m.mentionedJid] } : {});
}

handler.help = ['work', 'trabajar'];
handler.tags = ['economy'];
handler.command = /^(work|trabajar)$/i;
export default handler;
