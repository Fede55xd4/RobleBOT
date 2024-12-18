let handler = async (m, { conn, text, command, usedPrefix }) => {
    if (command === 'camasutra') {
        // Lista de posiciones sexuales
        const posiciones = [
            "Destrucción de culos 💥",
            "Pijaso infernal 🔥",
            "Garchada nocturna 🌙",
            "Sexo salvaje 🦁",
            "Sexo infiel 💔",
            "Cojida perfecta 🎯",
            "Martillo anal 🔨",
            "Tobogán de tetas 🎢",
            "Rompe vaginas 3000 🚀",
            "Furia sexual ⚡",
            "Beso negro 😘",
            "Sexo oral jugoso 🍭",
            "Sexo de vírgenes 👼",
            "Sexo furro 🐾",
            "Cojedor de viejas 👵",
            "Arranca pijas ⚔️",
            "Arranca vaginas 🥵",
            "Cagar en el pecho 💩",
            "Sexo con animales 🐾"
        ];

        // Elegimos una posición aleatoria
        let posicionAleatoria = posiciones[Math.floor(Math.random() * posiciones.length)];

        // Enviamos el mensaje con el nombre de usuario y la posición
        if (!text) {
            m.reply(`*@${m.sender.split('@')[0]}* debes mencionar a alguien para hacer la posición.`);
        } else {
            m.reply(`*@${m.sender.split('@')[0]} y ${text}* hicieron la posición sexual: *${posicionAleatoria}*`);
        }
    }
}

// Definir los comandos y exportación única
handler.help = ['camasutra'];
handler.tags = ['fun'];
handler.command = /^(camasutra)$/i; // Solo el comando 'camasutra'

// Exportamos el handler como exportación predeterminada
export default handler;