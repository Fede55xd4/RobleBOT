let handler = async (m, { conn, text, command, usedPrefix, args }) => {
    let fkontak = { "key": { "participants": "0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${(m.sender || '').split('@')[0]}:${(m.sender || '').split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` } }, "participant": "0@s.whatsapp.net" }
    let lastApostarTime = global.db.data.users[m.sender].wait || 0;
    let cooldown = 3000; // 3 segundos de espera

    let elapsedTime = new Date() - new Date(lastApostarTime);
    let remainingTime = cooldown - elapsedTime;

    let textos = `*💱 Te faltó agregar la cantidad a apostar.*\n_Ejemplos:_\n.apostar 100\n.apostar all (esto apuesta todo tu dinero)\n.apostar 50% (esto apuesta el 50% de tu dinero)\n.apostar 10k (esto apuesta 10000 monedas)\n.apostar 1m (esto apuesta 1000000 monedas)`;

    // Verificar tiempo de espera
    if (remainingTime > 0) {
        let waitTimeSeconds = Math.ceil(remainingTime / 1000);
        return m.reply(`*🕓 Debes esperar ${waitTimeSeconds} segundos para apostar nuevamente.*`, null, { contextInfo: fkontak });
    }

    if (global.db.data.users[m.sender].money <= 0) {
        return m.reply('*🚫 Dinero insuficiente. Revisa tu banco o usa .work*', null, { contextInfo: fkontak });
    }

    if (!args[0]) {
        return m.reply(textos, null, { contextInfo: fkontak });
    }

    let apuesta;
    let input = args[0].toLowerCase();

    // Verificar si es una cantidad con 'k' o 'm'
    if (input.endsWith('k')) {
        let cantidadK = parseInt(input.slice(0, -1)) * 1000;
        if (isNaN(cantidadK) || cantidadK <= 0) {
            return m.reply('*🚫 Ingresa una cantidad válida para apostar (con k o m si es necesario).*', null, { contextInfo: fkontak });
        }
        apuesta = cantidadK;
    } else if (input.endsWith('m')) {
        let cantidadM = parseInt(input.slice(0, -1)) * 1000000;
        if (isNaN(cantidadM) || cantidadM <= 0) {
            return m.reply('*🚫 Ingresa una cantidad válida para apostar (con k o m si es necesario).*', null, { contextInfo: fkontak });
        }
        apuesta = cantidadM;
    } else if (input === 'all') {
        apuesta = global.db.data.users[m.sender].money;
    } else if (input.endsWith('%')) {
        let porcentaje = parseInt(input.slice(0, -1));
        if (isNaN(porcentaje) || porcentaje <= 0 || porcentaje > 100) {
            return m.reply('*🚫 Ingresa un porcentaje válido (entre 1 y 100).*', null, { contextInfo: fkontak });
        }
        apuesta = Math.round((global.db.data.users[m.sender].money * porcentaje) / 100);
    } else {
        // Si no es ninguno de los formatos válidos, es una apuesta inválida
        let cantidad = parseInt(input);
        if (isNaN(cantidad) || cantidad <= 0) {
            return m.reply('*🚫 Apuesta inválida. Usa un formato válido como (número, k, m, %, all).*', null, { contextInfo: fkontak });
        }
        apuesta = cantidad;
    }

    // Verificar si la apuesta excede el saldo disponible
    if (apuesta > global.db.data.users[m.sender].money) {
        return m.reply('*🚫 No tienes suficiente saldo para apostar esa cantidad.*', null, { contextInfo: fkontak });
    }

    // Asegurarse de que la apuesta sea un número entero
    apuesta = Math.round(apuesta);

    let ganancia = Math.random() < 0.70 ? apuesta : -apuesta;
    global.db.data.users[m.sender].money += ganancia;

    // Actualizar el respeto
    if (typeof global.db.data.users[m.sender].respeto !== 'number') {
        global.db.data.users[m.sender].respeto = 0;
    }

    // Si el jugador gana
    if (ganancia > 0) {
        global.db.data.users[m.sender].respeto += 1;
    } else {
        // Si el jugador pierde, restar 1 de respeto pero no permitir que sea negativo
        if (global.db.data.users[m.sender].respeto > 0) {
            global.db.data.users[m.sender].respeto -= 1;
        }
    }

    let resultado = ganancia > 0 ? 
        `Desafiaste al azar y ganaste ${ganancia}, Ahora tienes: ${global.db.data.users[m.sender].money} monedas 🥳 y ahora tu respeto es de: ${global.db.data.users[m.sender].respeto}` : 
        `Desafiaste al azar y perdiste ${-ganancia}, Ahora tienes: ${global.db.data.users[m.sender].money} monedas 😥 y ahora tu respeto es de: ${global.db.data.users[m.sender].respeto}`;

    // Actualizar tiempo de espera
    global.db.data.users[m.sender].wait = new Date();

    return m.reply(`*${resultado}*`, null, { contextInfo: null });
}

handler.help = ['apostar (cantidad)', 'apostar all', 'apostar %', 'apostar 10k', 'apostar 2m'];
handler.tags = ['games'];
handler.command = /^(apostar)$/i;
export default handler;
