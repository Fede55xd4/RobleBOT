let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];

    let profileInfo = `*BILLETERA de: @${m.sender.split('@')[0]}*\n\n💰 Saldo Disponible: *$${user.money}*\n🏦 Saldo en el banco: *$${user.bank}*`;

    return await conn.reply(m.chat, profileInfo, m, { contextInfo: { mentionedJid: [m.sender] } });
}

handler.help = ['saldo'];
handler.tags = ['economy'];
handler.command = /^(saldo)$/i;
export default handler;

