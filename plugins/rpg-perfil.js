let handler = async (m, { conn }) => {
  // Detectamos si hay un usuario mencionado
  let mentionedUser = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : null;
  
  // Si no se menciona a ningún usuario, usamos el usuario que ejecutó el comando
  let user = mentionedUser ? global.db.data.users[mentionedUser] : global.db.data.users[m.sender];

  // Calcular el número total de personajes que el usuario tiene (activos + guardados)
  let totalPersonajes = (user.personajes ? user.personajes.length : 0) + (user.personajesSave ? user.personajesSave.length : 0);

  // Calcular la cantidad total de personajes guardados (sumando la cantidad de cada personaje guardado)
  let totalPersonajesGuardados = user.personajesSave ? user.personajesSave.reduce((sum, personaje) => sum + personaje.cantidad, 0) : 0;

  // Información básica del perfil
  let profileInfo = `*―――――――――――――――――――*
  👤 *Usuario:* @${(mentionedUser || m.sender).split('@')[0]}
  🤝 *Respeto:* ${user.respeto || 0} 
  😅 *Apodo:* ${user.apodos?.apodo || 'Sin Apodo'}
  👥 *Amigos:* ${user.amigos || 0}
  🔥 *Rango:* ${user.uprank?.rango || 'Sin Rango'}
  💲 *Saldo disponible:* $${user.money || 0}
  🏦 *Saldo en el banco:* $${user.bank || 0}
  👤 *Personajes:* ${totalPersonajes}
  👤🔒 *Personajes Guardados:* ${totalPersonajesGuardados}  
  *―――――――――――――――――――*
  ⛏ *Pico Level:* ${user.pico || 0}
  🪨 *Piedra:* ${user.rpgpiedra || 0} unidades
  🥈 *Plata:* ${user.rpgplata || 0} unidades
  🪙 *Oro:* ${user.rpgoro || 0} unidades
  💎 *Diamantes:* ${user.rpgdiamante || 0} unidades
  *―――――――――――――――――――*`;

  // Responder con la información del perfil
  return await conn.reply(m.chat, profileInfo, m, { contextInfo: { mentionedJid: [m.sender, mentionedUser].filter(Boolean) } });
}

handler.help = ['perfil'];
handler.tags = ['economy'];
handler.command = /^(perfil)$/i;
export default handler;
