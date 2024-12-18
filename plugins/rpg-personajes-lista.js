let handler = async (m, { conn, text, command, usedPrefix, args }) => {

    // Lista de personajes disponibles con sus respectivas calidades
    let personajesDisponibles = [ 
        { nombre: "El-Negro-de-Whatsapp", calidad: 5 },
        { nombre: "Goku", calidad: 5 },
        { nombre: "Naruto", calidad: 4 },
        { nombre: "Luffy", calidad: 4 },
        { nombre: "Saitama", calidad: 5 },
        { nombre: "Optimus-Prime", calidad: 4 },
        { nombre: "Megatron", calidad: 3 },
        { nombre: "Bumblebee", calidad: 3 },
        { nombre: "Iron-Man", calidad: 5 },
        { nombre: "Spider-Man", calidad: 5 },
        { nombre: "Batman", calidad: 5 },
        { nombre: "Superman", calidad: 5 },
        { nombre: "Homer-Simpson", calidad: 2 },
        { nombre: "Bart-Simpson", calidad: 2 },
        { nombre: "Peter-Griffin", calidad: 2 },
        { nombre: "Brian-Griffin", calidad: 2 },
        { nombre: "Ralph-Wiggum", calidad: 1 },
        { nombre: "Chuck-Norris", calidad: 3 },
        { nombre: "John-Wick", calidad: 4 },
        { nombre: "Toretto", calidad: 3 },
        { nombre: "Shrek", calidad: 4 },
        { nombre: "Ben-Tennyson", calidad: 3 },
        { nombre: "Akinator", calidad: 2 },
        { nombre: "Kick-Buttowski", calidad: 2 },
        { nombre: "Hulk", calidad: 5 },
        { nombre: "She-Hulk", calidad: 5 },
        { nombre: "Super-Girl", calidad: 5 },
    ];
    

    // Comando para ver todos los personajes disponibles
    if (command === 'personajeslista') {
        let listadoPersonajes = personajesDisponibles.map(p => {
            return `*${p.nombre}* - *Calidad:* ${'⭐'.repeat(p.calidad)} Estrellas`;
        }).join('\n');

        return m.reply(`Aquí están todos los personajes disponibles:\n\n${listadoPersonajes}`);
    }
};

// Definir los comandos y exportación única
handler.help = ['personajeslista'];
handler.tags = ['games'];
handler.command = /^(personajeslista)$/i; // Solo el comando 'personajeslista'

// Exportamos el handler como exportación predeterminada
export default handler;
