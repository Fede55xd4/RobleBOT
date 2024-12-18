let handler = async (m, { conn, text, command, usedPrefix, args }) => {
    if (command === 'banana') {
        // Generamos un número aleatorio entre 1 y 100
        let medida = Math.floor(Math.random() * 100) + 1;
        
        // Enviamos el mensaje con el nombre de usuario y el emoji de banana
        m.reply(`@${m.sender.split('@')[0]} tu 🍌 te mide: ${medida}cm`);
    }
}

// Definir los comandos y exportación única
handler.help = ['banana'];
handler.tags = ['fun'];
handler.command = /^(banana)$/i; // Solo el comando 'banana'

// Exportamos el handler como exportación predeterminada
export default handler;
