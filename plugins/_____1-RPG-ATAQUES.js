let handler = async (m, { conn, text, command }) => {
    let user = global.db.data.users[m.sender]; // Acceso a la base de datos del usuario

    // Asegurándonos de que el array 'armas' existe en la base de datos del usuario
    if (!Array.isArray(user.armas)) {
        user.armas = [];  // Si no es un array, lo inicializamos como un array vacío
    }

    // Asegurándonos de que la salud del usuario está definida
    if (!isNumber(user.salud)) user.salud = 100;  // Si no está definida, la inicializamos en 100

    // Asegurándonos de que el cooldown de atacar y de reclamar armas esté inicializado
    if (!user.cooldownAtacar) user.cooldownAtacar = 0; // Cooldown para atacar
    if (!user.cooldownArmas) user.cooldownArmas = 0; // Cooldown para reclamar armas

    // Asegurándonos de que el modoAtaque está definido (siempre activado en este caso)
    if (!isNumber(user.modoAtaque)) user.modoAtaque = 1;  // Modo de ataque siempre activado

    // Lista de armas con daño ajustado (daño máximo 10)
    let armasDisponibles = [
        { nombre: "Espada", daño: 8 },
        { nombre: "Pistola", daño: 6 },
        { nombre: "Arco", daño: 7 },
        { nombre: "Hacha", daño: 9 },
        { nombre: "Lanza", daño: 6 },
        { nombre: "Cuchillo", daño: 3 },
        { nombre: "Maza", daño: 10 },
        { nombre: "Bate de béisbol", daño: 4 },
        { nombre: "Espada láser", daño: 9 },
        { nombre: "Revolver", daño: 6 },
        { nombre: "Machete", daño: 5 },
        { nombre: "Martillo", daño: 8 },
        { nombre: "Granada", daño: 9 },
        { nombre: "Daga", daño: 3 },
        { nombre: "Cañón", daño: 10 },
        { nombre: "Ballesta", daño: 7 },
        { nombre: "Katana", daño: 10 },
        { nombre: "Sable de luz", daño: 9 },
        { nombre: "Lanzallamas", daño: 8 },
        { nombre: "Escopeta", daño: 7 },
        { nombre: "Pico", daño: 5 }
    ];

    // Función para reclamar un arma
    const reclamarArma = () => {
        // Verificar si el usuario está en cooldown para reclamar un arma
        const cooldownTiempoArma = 3600 * 1000; // 1 hora en milisegundos
        const tiempoActual = new Date().getTime();
        if (tiempoActual - user.cooldownArmas < cooldownTiempoArma) {
            let tiempoRestante = Math.ceil((cooldownTiempoArma - (tiempoActual - user.cooldownArmas)) / 1000);
            return `Debes esperar ${tiempoRestante} segundos antes de reclamar otra arma.`;
        }

        // Verificar si el usuario ya tiene todas las armas
        if (user.armas.length >= armasDisponibles.length) {
            return "¡Ya tienes todas las armas disponibles!";
        }

        // Seleccionar un arma aleatoria de la lista
        let armaReclamada = armasDisponibles[Math.floor(Math.random() * armasDisponibles.length)];

        // Verificar si el usuario ya tiene el arma
        let arma = user.armas.find(a => a.nombre === armaReclamada.nombre);
        if (arma) {
            // Si el arma ya está, no se agrega de nuevo
            return `¡Ya tienes una *${armaReclamada.nombre}*!`;
        } else {
            // Si no está, lo agregamos al array de armas
            user.armas.push({ nombre: armaReclamada.nombre, daño: armaReclamada.daño });
            return `¡Has reclamado una *${armaReclamada.nombre}*!\n*Daño:* ${armaReclamada.daño}\nAhora tienes esta arma.`;
        }
    };

    // Función para mostrar las armas que tiene el usuario
    const verArmas = () => {
        if (user.armas.length === 0) return "No tienes armas en tu inventario.";
        let listadoArmas = user.armas.map(a => `${a.nombre} (Daño: ${a.daño})`).join('\n');
        return `Estas son tus armas:\n${listadoArmas}`;
    };

    // Función para atacar a otro usuario
    const atacar = (usuarioObjetivo) => {
        // Verificar cooldown de ataque (1 hora)
        const cooldownTiempo = 3600 * 1000; // 1 hora en milisegundos
        const tiempoActual = new Date().getTime();
        if (tiempoActual - user.cooldownAtacar < cooldownTiempo) {
            let tiempoRestante = Math.ceil((cooldownTiempo - (tiempoActual - user.cooldownAtacar)) / 1000);
            return `Debes esperar ${tiempoRestante} segundos antes de atacar nuevamente.`;
        }

        if (user.salud <= 0) return `No puedes atacar, tu salud es 0.`;

        // Seleccionar un arma aleatoria de su inventario
        if (user.armas.length === 0) return "No tienes armas en tu inventario para atacar.";
        let armaAleatoria = user.armas[Math.floor(Math.random() * user.armas.length)];

        // Restar vida al usuario objetivo
        let objetivo = global.db.data.users[usuarioObjetivo];
        if (!objetivo) return "Usuario no encontrado.";

        // Aplicar daño al objetivo
        objetivo.salud -= armaAleatoria.daño;
        if (objetivo.salud <= 0) {
            // Si el objetivo llega a 0 de salud, transferir las estadísticas
            transferirEstadisticas(objetivo);
            delete global.db.data.users[usuarioObjetivo];  // Eliminar al usuario de la base de datos
            user.kills += 1;  // Aumentar las kills del atacante
            objetivo.muertes += 1;  // Aumentar las muertes del objetivo
            return `¡${m.sender.split('@')[0]} asesino a ${usuarioObjetivo.split('@')[0]} con: *${armaAleatoria.nombre}*!`;
        } else {
            return `¡${m.sender.split('@')[0]} atacó a ${usuarioObjetivo.split('@')[0]} con: *${armaAleatoria.nombre}*!\n*Daño:* ${armaAleatoria.daño}\n*Salud restante de ${usuarioObjetivo.split('@')[0]}:* ${objetivo.salud}`;
        }
    };

    // Función para transferir estadísticas
    const transferirEstadisticas = (usuarioObjetivo) => {
        // Transferir armas (solo las que no tiene ya)
        usuarioObjetivo.armas.forEach(arma => {
            if (!user.armas.some(a => a.nombre === arma.nombre)) {
                user.armas.push(arma);
            }
        });

        // Transferir otras estadísticas relevantes (como dinero, salud, etc.)
        user.suer_money += usuarioObjetivo.suer_money;
        user.experiencia += usuarioObjetivo.experiencia;
        user.salud = 100;  // Salud inicial al 100

        // Transferir todo tipo de estadísticas del usuario objetivo (excepto las duplicadas)
        for (let stat in usuarioObjetivo) {
            if (!(stat in user)) {
                user[stat] = usuarioObjetivo[stat];
            }
        }
    };

    // Lógica para manejar los comandos
    if (command === 'armas') {
        let resultado = reclamarArma();
        m.reply(resultado);
    } else if (command === 'verarmas') {
        let resultado = verArmas();
        m.reply(resultado);
    } else if (command === 'atacar') {
        if (!text) return m.reply("Debes mencionar a un usuario para atacar.");
        let objetivo = text.split('@')[1];
        let resultado = atacar(objetivo);
        m.reply(resultado);
    }
};

handler.help = ['armas', 'verarmas', 'atacar'];
handler.tags = ['games'];
handler.command = /^(armas|verarmas|atacar)$/i;

export default handler;
