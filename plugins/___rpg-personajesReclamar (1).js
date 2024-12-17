let handler = async (m, { conn, text, command }) => {
    let user = global.db.data.users[m.sender]; // Acceso a la base de datos del usuario

    // Asegurándonos de que el array 'personajes' existe en la base de datos del usuario
    if (!Array.isArray(user.personajes)) {
        user.personajes = [];  // Si no es un array, lo inicializamos como un array vacío
    }

    // Asegurándonos de que el cooldown también está inicializado
    if (!user.cooldown) {
        user.cooldown = 0;  // Si no está definido, lo inicializamos a 0
    }

    // Tiempo en segundos para el cooldown
    const cooldownTiempo = 30; // 120 segundos
    const tiempoActual = new Date().getTime();

    // Verificamos si el usuario está en cooldown
    if (tiempoActual - user.cooldown < cooldownTiempo * 1000) {
        let tiempoRestante = Math.ceil((cooldownTiempo * 1000 - (tiempoActual - user.cooldown)) / 1000);
        return m.reply(`Debes esperar ${tiempoRestante} segundos antes de reclamar otro personaje.`);
    }

    // Comando para reclamar un personaje
    if (command === 'reclamar') {
        // Lista de personajes disponibles con sus respectivas calidades, URLs de las imágenes y descripciones
        let personajesDisponibles = [
            { nombre: "El-Negro-de-Whatsapp", calidad: 5, imagen: "https://i.pinimg.com/736x/0c/5e/2a/0c5e2a9abdd300643e3badae09bfcb91.jpg", descripcion: "Un meme muy popular de WhatsApp que se ha viralizado en internet." },
            { nombre: "Goku", calidad: 5, imagen: "https://i.pinimg.com/736x/2e/e5/e7/2ee5e7599e9e64771246144eed000b1c.jpg", descripcion: "Un guerrero saiyajin conocido por su gran fuerza y valentía. Protagonista de 'Dragon Ball'." },
            { nombre: "Naruto", calidad: 4, imagen: "https://i.pinimg.com/736x/ea/59/8a/ea598a8f6b6a74016a5a776202ced042.jpg", descripcion: "Un ninja joven con el sueño de convertirse en Hokage, el líder de su aldea." },
            { nombre: "Luffy", calidad: 4, imagen: "https://i.pinimg.com/736x/5a/2f/c5/5a2fc562e3a9494cbaff0641531d3a63.jpg", descripcion: "Capitán de los Piratas del Sombrero de Paja, siempre en busca de aventuras y el One Piece." },
            { nombre: "Saitama", calidad: 5, imagen: "https://i.pinimg.com/736x/7b/d2/2f/7bd22f53bd2b131ff6f57698f790812f.jpg", descripcion: "Un superhéroe extremadamente poderoso, con la capacidad de derrotar a cualquier enemigo de un solo golpe." },
            { nombre: "Optimus-Prime", calidad: 4, imagen: "https://i.pinimg.com/736x/d8/ae/73/d8ae73c39253c9513689a1a10d5715c3.jpg", descripcion: "El líder de los Autobots, luchando contra los Decepticons para salvar la humanidad." },
            { nombre: "Megatron", calidad: 3, imagen: "https://i.pinimg.com/736x/d5/71/da/d571dab091a1c5cb2e6ea633b25df762.jpg", descripcion: "Líder de los Decepticons, siempre en busca de poder y la conquista del universo." },
            { nombre: "Bumblebee", calidad: 3, imagen: "https://i.pinimg.com/736x/40/ba/5e/40ba5e96ee43ad7e56fdb6e0994eb7fb.jpg", descripcion: "Un Autobot valiente, leal y lleno de corazón, conocido por su habilidad para transformarse en un coche." },
            { nombre: "Iron-Man", calidad: 5, imagen: "https://i.pinimg.com/736x/c8/52/fd/c852fdbf989387d40a304469c4e0aadf.jpg", descripcion: "Un genio, millonario y filántropo, que se convierte en Iron Man para proteger al mundo." },
            { nombre: "Spider-Man", calidad: 5, imagen: "https://i.pinimg.com/736x/80/3a/22/803a22de4f7d152fde9599c7fb696e8c.jpg", descripcion: "Un joven con habilidades aracnídeas, luchando contra el crimen para proteger su ciudad." },
            { nombre: "Batman", calidad: 5, imagen: "https://i.pinimg.com/736x/2a/9b/b4/2a9bb4b58a5d4a5d9bae69be67475943.jpg", descripcion: "El caballero oscuro de Gotham City, un vigilante sin poderes, pero con una gran inteligencia y habilidades." },
            { nombre: "Superman", calidad: 5, imagen: "https://i.pinimg.com/736x/ee/f8/1f/eef81fb4d4e8aef25f3dc4c9154edd07.jpg", descripcion: "Un hombre de Krypton con poderes sobrehumanos que lucha por la verdad y la justicia." },
            { nombre: "Homer-Simpson", calidad: 2, imagen: "https://i.pinimg.com/736x/99/10/01/9910010fa2777e7862e7ef858482585e.jpg", descripcion: "El padre de la familia Simpson, conocido por su torpeza y su amor por la cerveza." },
            { nombre: "Bart-Simpson", calidad: 2, imagen: "https://i.pinimg.com/736x/57/e4/45/57e445a36d4ec893d00217ad7bde024f.jpg", descripcion: "El hijo travieso de la familia Simpson, siempre metido en problemas." },
            { nombre: "Peter-Griffin", calidad: 2, imagen: "https://i.pinimg.com/736x/e9/00/3d/e9003dbb5a1e3233d515fb52a8fedb87.jpg", descripcion: "El padre de la familia Griffin, conocido por su humor absurdo y su amor por la cerveza." },
            { nombre: "Brian-Griffin", calidad: 2, imagen: "https://i.pinimg.com/736x/4b/0d/7c/4b0d7cd213626b371b1493c67654c902.jpg", descripcion: "El perro de la familia Griffin, más inteligente que los humanos de la casa y con una gran personalidad." },
            // Personajes nuevos
            { nombre: "Hulk", calidad: 5, imagen: "https://i.pinimg.com/736x/5b/b8/2f/5bb82f2676cb8acf2b1e9f4fe05551c4.jpg", descripcion: "El gigante verde, conocido por su fuerza descomunal y su naturaleza incontrolable." },
            { nombre: "She-Hulk", calidad: 5, imagen: "https://i.pinimg.com/736x/52/59/e1/5259e193c89f5bbbb9a0603e13fc38ba.jpg", descripcion: "La prima de Bruce Banner, quien también posee la habilidad de transformarse en una versión poderosa de sí misma." },
            { nombre: "Super-Girl", calidad: 5, imagen: "https://i.pinimg.com/736x/6f/5c/61/6f5c61ed9adda023d0cb9ab6a963e068.jpg", descripcion: "Una heroína kryptoniana, con poderes similares a los de Superman, lucha por la justicia y la paz." }
        ];

        // Función para reclamar un personaje
        let reclamarPersonaje = () => {
            // Seleccionar un personaje aleatorio de la lista
            let personajeReclamado = personajesDisponibles[Math.floor(Math.random() * personajesDisponibles.length)];

            // Función para representar las estrellas de calidad
            const getCalidadEstrellas = (calidad) => {
                return '★'.repeat(calidad) + '✰'.repeat(5 - calidad);
            };

            // Verificar si el personaje ya existe en los personajes del usuario
            let personaje = user.personajes.find(p => p.nombre === personajeReclamado.nombre);
            if (personaje) {
                // Si el personaje ya está, aumentamos la cantidad
                personaje.cantidad++;
                return {
                    text: `Has reclamado a *${personajeReclamado.nombre}*\n*Calidad:* ${getCalidadEstrellas(personajeReclamado.calidad)}\nDescripción: ${personajeReclamado.descripcion}\nAhora tienes *${personaje.cantidad}* de este personaje.`,
                    image: personajeReclamado.imagen
                };
            } else {
                // Si no está, lo agregamos al array de personajes
                user.personajes.push({ nombre: personajeReclamado.nombre, calidad: personajeReclamado.calidad, cantidad: 1 });
                return {
                    text: `Has reclamado a *${personajeReclamado.nombre}*\n*Calidad:* ${getCalidadEstrellas(personajeReclamado.calidad)}\nDescripción: ${personajeReclamado.descripcion}\nAhora tienes *1* de este personaje.`,
                    image: personajeReclamado.imagen
                };
            }
        };

        let resultadoReclamar = reclamarPersonaje();

        // Actualizamos el cooldown
        user.cooldown = tiempoActual;

        // Enviar el mensaje con texto e imagen usando sendFile
        await conn.sendFile(m.chat, resultadoReclamar.image, 'personaje_reclamado.jpg', resultadoReclamar.text, m);
    }
}

handler.help = ['reclamar'];
handler.tags = ['games'];
handler.command = /^(reclamar)$/i;

export default handler;
