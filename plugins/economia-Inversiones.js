import fs from 'fs';  // Asegúrate de importar fs

let handler = async (m, { conn, text, command, usedPrefix, args }) => {
    let fkontak = { 
        "key": { 
            "participants": "0@s.whatsapp.net", 
            "remoteJid": "status@broadcast", 
            "fromMe": false, 
            "id": "Halo" 
        }, 
        "message": { 
            "contactMessage": { 
                "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${(m.sender || '').split('@')[0]}:${(m.sender || '').split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` 
            } 
        }, 
        "participant": "0@s.whatsapp.net" 
    };

    let user = global.db.data.users[m.sender];

    // Verificar si el usuario tiene suficiente dinero para invertir
    if (user.money < 10000) {
        return m.reply('*🚫 No tienes suficiente dinero. Necesitas al menos 10,000 para invertir.*', null, { contextInfo: fkontak });
    }

    // Verificar si el usuario ha introducido una cantidad válida
    if (!args[0]) {
        return m.reply('*💱 Por favor, ingresa la cantidad que deseas invertir. La cantidad mínima es 10,000.*', null, { contextInfo: fkontak });
    }

    let cantidad = parseInt(args[0]);

    // Verificar si la cantidad es un múltiplo de 10,000
    if (isNaN(cantidad) || cantidad % 10000 !== 0) {
        return m.reply('*🚫 La cantidad debe ser un múltiplo exacto de 10,000 (por ejemplo: 10,000, 20,000, 30,000, 100,000, 1,000,000, etc.).*', null, { contextInfo: fkontak });
    }

    // Verificar si el usuario tiene suficiente dinero para la inversión
    if (cantidad > user.money) {
        return m.reply('*🚫 No tienes suficiente dinero para hacer esa inversión.*', null, { contextInfo: fkontak });
    }

    // Restar la cantidad de dinero invertida
    user.money -= cantidad;
    user.lastInvestmentTime = new Date();  // Guardar el momento de la inversión

    // Lista de empresas reales
    const empresas = [
        'Apple', 'Tesla', 'Amazon', 'Microsoft', 'Google', 'Meta', 'Nvidia', 'Sony', 'Samsung', 
        'IBM', 'Intel', 'Spotify', 'Netflix', 'Adobe', 'Cisco', 'Oracle', 'BMW', 'Toyota', 
        'Ford', 'Coca-Cola', 'PepsiCo', 'Unilever', 'Walmart', 'Nike', 'H&M', 'McDonald\'s', 
        'Volkswagen', 'Pfizer', 'Johnson & Johnson', 'L’Oréal', 'Starbucks', 'ExxonMobil'
    ];

    // Elegir una empresa aleatoria
    let empresa = empresas[Math.floor(Math.random() * empresas.length)];

    // Informar al usuario sobre la inversión
    m.reply(`*💸 Has invertido ${cantidad} monedas en la empresa ${empresa}. En 10 segundos conocerás los resultados de tu inversión.*`);

    // Esperar 10 segundos para mostrar los resultados de la inversión
    setTimeout(() => {
        // Probabilidad de que las acciones bajen: 30%
        let probabilidadBaja = Math.random() < 0.3;  // 30% de probabilidad de pérdida
        let porcentaje = 0;

        if (probabilidadBaja) {
            // Si las acciones bajan, entre un 11% y un 15% de pérdida
            porcentaje = Math.floor(Math.random() * (15 - 11 + 1)) + 11;
            let perdida = Math.floor(cantidad * (porcentaje / 100));  // Cálculo de la pérdida
            user.money += cantidad - perdida;  // Devolver la cantidad menos la pérdida
            m.reply(`*📉 Las acciones de ${empresa} bajaron un ${porcentaje}%. Has perdido ${perdida} monedas en tu inversión. Ahora tienes ${user.money} monedas.*`);
        } else {
            // Si las acciones suben, entre un 1% y un 15% de ganancia
            porcentaje = Math.floor(Math.random() * (15 - 1 + 1)) + 1;
            let ganancia = Math.floor(cantidad * (porcentaje / 100));  // Cálculo de la ganancia
            user.money += cantidad + ganancia;  // Devolver la cantidad más la ganancia
            m.reply(`*📈 Las acciones de ${empresa} subieron un ${porcentaje}%. Has ganado ${ganancia} monedas en tu inversión. Ahora tienes ${user.money} monedas.*`);
        }

        // Guardar el estado actualizado en el archivo database.json
        fs.writeFileSync('./database.json', JSON.stringify(global.db.data, null, 2), 'utf8');

        // El usuario puede volver a invertir después de que se muestren los resultados
    }, 10000);  // Esperar 10 segundos

};

handler.help = ['invertir (cantidad)'];
handler.tags = ['games'];
handler.command = /^(invertir)$/i;

export default handler;
