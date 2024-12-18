let handler = async (m, { conn, text, command, usedPrefix, args }) => {
    let user = global.db.data.users[m.sender]; // Acceso a la base de datos del usuario

    // Asegurándonos de que los arrays 'personajes' y 'personajesSave' existen en la base de datos del usuario
    if (!Array.isArray(user.personajes)) {
        user.personajes = [];  // Si no es un array, lo inicializamos como un array vacío
    }
    if (!Array.isArray(user.personajesSave)) {
        user.personajesSave = [];  // Si no es un array, lo inicializamos como un array vacío
    }

    // Comando para ver los personajes
    if (command === 'personajes') {
        let mensaje = '*Tienes los siguientes personajes:*\n';
        let tienePersonajes = false;

        // Mostrar los personajes activos (en inventario)
        if (user.personajes.length > 0) {
            user.personajes.forEach(personaje => {
                mensaje += `${personaje.nombre}: ${personaje.cantidad} ${'⭐'.repeat(personaje.calidad)}\n`;
            });
            tienePersonajes = true;
        }

        // Mostrar los personajes bloqueados (guardados)
        if (user.personajesSave.length > 0) {
            user.personajesSave.forEach(personaje => {
                mensaje += `🔒 ${personaje.nombre}: ${personaje.cantidad} ${'⭐'.repeat(personaje.calidad)}\n`;
            });
            tienePersonajes = true;
        }

        // Si no hay personajes en inventario ni guardados
        if (!tienePersonajes) {
            return m.reply('*No tienes personajes en tu inventario ni bloqueados.* ¡Reclama con: _.reclamar_');
        }

        return m.reply(mensaje);  // Enviamos el mensaje con los personajes y sus cantidades
    }

    // Comando para bloquear (guardar) un personaje con cantidad
    if (command === 'lock') {
        if (args.length < 1) {
            return m.reply('*¡Debes especificar el nombre del personaje o "all" para bloquear todos!*');
        }

        if (args[0] === 'all') {
            // Comando 'lock all': Guardamos todos los personajes que están en el inventario
            if (user.personajes.length === 0) {
                return m.reply('*No tienes personajes en tu inventario para bloquear.*');
            }

            for (let personaje of user.personajes) {
                // Verificamos si el personaje ya está guardado
                let personajeGuardado = user.personajesSave.find(p => p.nombre.toLowerCase() === personaje.nombre.toLowerCase());
                if (!personajeGuardado) {
                    user.personajesSave.push({
                        nombre: personaje.nombre,
                        cantidad: personaje.cantidad,
                        calidad: personaje.calidad,
                    });
                }
            }

            // Vaciar el inventario después de bloquear todos los personajes
            user.personajes = [];

            m.reply('*Has guardado todos los personajes en tu base de datos.*');
        } else {
            // Si no es 'all', se asume que es un personaje específico
            let nombrePersonaje = args[0].toLowerCase();
            let cantidad = parseInt(args[1]);

            if (isNaN(cantidad) || cantidad <= 0) {
                return m.reply('*¡La cantidad debe ser un número positivo!*');
            }

            let personajeIndex = user.personajes.findIndex(p => p.nombre.toLowerCase() === nombrePersonaje);

            if (personajeIndex === -1) {
                return m.reply('*No tienes ese personaje en tu inventario.*');
            }

            let personaje = user.personajes[personajeIndex];

            if (personaje.cantidad < cantidad) {
                return m.reply(`*No tienes suficiente cantidad de ${personaje.nombre} para bloquear esa cantidad.*`);
            }

            // Reducimos la cantidad del personaje en inventario
            personaje.cantidad -= cantidad;

            // Si ya existe ese personaje guardado, solo incrementamos la cantidad
            let personajeGuardado = user.personajesSave.find(p => p.nombre.toLowerCase() === nombrePersonaje);

            if (personajeGuardado) {
                personajeGuardado.cantidad += cantidad;
            } else {
                // Si no existe, lo agregamos con la cantidad deseada
                user.personajesSave.push({
                    nombre: personaje.nombre,
                    cantidad: cantidad,
                    calidad: personaje.calidad,
                });
            }

            m.reply(`*Has guardado ${cantidad} de ${personaje.nombre} en tu base de datos.*`);
        }
    }

    // Comando para desbloquear (restaurar) un personaje con cantidad
    if (command === 'unlock') {
        if (args.length < 1) {
            return m.reply('*¡Debes especificar el nombre del personaje o "all" para restaurar todos!*');
        }

        if (args[0] === 'all') {
            // Comando 'unlock all': Restauramos todos los personajes que están guardados
            if (user.personajesSave.length === 0) {
                return m.reply('*No tienes personajes guardados para desbloquear.*');
            }

            for (let personaje of user.personajesSave) {
                // Verificamos si el personaje ya está en el inventario
                let personajeInventario = user.personajes.find(p => p.nombre.toLowerCase() === personaje.nombre.toLowerCase());
                if (!personajeInventario) {
                    user.personajes.push({
                        nombre: personaje.nombre,
                        cantidad: personaje.cantidad,
                        calidad: personaje.calidad,
                    });
                } else {
                    personajeInventario.cantidad += personaje.cantidad; // Incrementamos la cantidad
                }
            }

            // Vaciar la lista de personajes guardados después de desbloquear todos
            user.personajesSave = [];

            m.reply('*Has restaurado todos los personajes a tu inventario.*');
        } else {
            // Si no es 'all', se asume que es un personaje específico
            let nombrePersonaje = args[0].toLowerCase();
            let cantidad = parseInt(args[1]);

            if (isNaN(cantidad) || cantidad <= 0) {
                return m.reply('*¡La cantidad debe ser un número positivo!*');
            }

            let personajeIndex = user.personajesSave.findIndex(p => p.nombre.toLowerCase() === nombrePersonaje);

            if (personajeIndex === -1) {
                return m.reply('*No tienes ese personaje guardado en tu base de datos.*');
            }

            let personaje = user.personajesSave[personajeIndex];

            if (personaje.cantidad < cantidad) {
                return m.reply(`*No tienes suficiente cantidad de ${personaje.nombre} guardado para desbloquear esa cantidad.*`);
            }

            // Reducimos la cantidad del personaje guardado
            personaje.cantidad -= cantidad;

            // Si ya existe ese personaje en el inventario, solo incrementamos la cantidad
            let personajeInventario = user.personajes.find(p => p.nombre.toLowerCase() === nombrePersonaje);

            if (personajeInventario) {
                personajeInventario.cantidad += cantidad;
            } else {
                // Si no existe, lo agregamos al inventario
                user.personajes.push({
                    nombre: personaje.nombre,
                    cantidad: cantidad,
                    calidad: personaje.calidad,
                });
            }

            m.reply(`*Has restaurado ${cantidad} de ${personaje.nombre} a tu inventario.*`);
        }
    }
}

// Definir los comandos y exportación única
handler.help = ['personajes', 'lock', 'unlock', 'lock all', 'unlock all'];
handler.tags = ['games'];
handler.command = /^(personajes|lock|unlock|lock all|unlock all)$/i; // Los comandos 'personajes', 'lock', 'unlock', 'lock all' y 'unlock all'

// Exportamos el handler como exportación predeterminada
export default handler;
