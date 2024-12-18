let handler = async (m, { conn, text, command, usedPrefix, args }) => {
    let user = global.db.data.users[m.sender]; // Acceso a la base de datos del usuario

    // Asegurándonos de que el array 'personajes' existe en la base de datos del usuario
    if (!Array.isArray(user.personajes)) {
        user.personajes = [];  // Si no es un array, lo inicializamos como un array vacío
    }

    // Precios de los personajes según su calidad
    const precios = {
        5: 50000,  // 5 estrellas valen 50 mil
        4: 30000,  // 4 estrellas valen 30 mil
        3: 15000,  // 3 estrellas valen 15 mil
        2: 10000,  // 2 estrellas valen 10 mil
        1: 5000,   // 1 estrella vale 5 mil
    };

    // Comando para vender personajes
    if (command === 'vender') {
        // Si el usuario quiere vender todos los personajes
        if (args[0] === 'all') {
            let totalVendidos = 0;  // Total de personajes vendidos
            let totalMonedas = 0;   // Total de monedas ganadas

            // Recorremos todos los personajes en el inventario del usuario
            for (let personaje of user.personajes) {
                let precio = precios[personaje.calidad];  // Obtenemos el precio según la calidad
                totalVendidos += personaje.cantidad;  // Acumulamos la cantidad de personajes vendidos
                totalMonedas += precio * personaje.cantidad;  // Acumulamos las monedas obtenidas

                // Agregar las monedas al saldo del usuario
                user.money = user.money ? user.money + (precio * personaje.cantidad) : (precio * personaje.cantidad);

                // Limpiamos el inventario del personaje vendido
                personaje.cantidad = 0;  // Vender todo de ese personaje
            }

            // Eliminamos los personajes que ya no tienen cantidad
            user.personajes = user.personajes.filter(p => p.cantidad > 0);

            return m.reply(`¡Has vendido *${totalVendidos}* personajes por un total de *${totalMonedas}* monedas!`);
        }

        // Si el usuario quiere vender un personaje específico
        if (args.length < 2) {
            return m.reply('Por favor, especifica el personaje y la cantidad que deseas vender. Ejemplo: *.vender Goku 3*');
        }

        let personajeNombre = args[0].toLowerCase();  // Nombre del personaje
        let cantidad = parseInt(args[1]);  // Cantidad a vender

        // Validar que la cantidad sea un número válido
        if (isNaN(cantidad) || cantidad <= 0) {
            return m.reply('Por favor, ingresa una cantidad válida.');
        }

        // Buscar el personaje en el inventario del usuario
        let personaje = user.personajes.find(p => p.nombre.toLowerCase() === personajeNombre);

        if (!personaje) {
            return m.reply('No tienes ese personaje en tu inventario.');
        }

        // Validar que el usuario tenga suficientes personajes para vender
        if (personaje.cantidad < cantidad) {
            return m.reply(`No tienes suficientes *${personaje.nombre}* para vender. Solo tienes ${personaje.cantidad}.`);
        }

        // Calcular el precio del personaje según su calidad
        let precio = precios[personaje.calidad];

        // Vender los personajes y actualizar el inventario
        personaje.cantidad -= cantidad;

        // Si la cantidad de ese personaje llega a cero, lo eliminamos del inventario
        if (personaje.cantidad === 0) {
            user.personajes = user.personajes.filter(p => p.nombre !== personaje.nombre);
        }

        // Agregar las monedas al saldo del usuario en 'user.money'
        user.money = user.money ? user.money + (precio * cantidad) : (precio * cantidad);

        return m.reply(`¡Has vendido *${cantidad}* ${personaje.nombre} por ${precio * cantidad} monedas! Ahora tienes ${user.money} monedas.`);
    }
}

// Definir los comandos y exportación única
handler.help = ['vender'];
handler.tags = ['games'];
handler.command = /^(vender)$/i; // Solo el comando 'vender'

// Exportamos el handler como exportación predeterminada
export default handler;
