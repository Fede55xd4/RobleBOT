let handler = async (m, { conn, command }) => {
    // Lista de enlaces de imágenes
    let imagenes = [
        "https://i.imgur.com/mwLJaxU.jpg",
        "https://i.imgur.com/XbW7FO2.jpg",
        "https://i.imgur.com/ciuzM98.jpg",
        "https://i.imgur.com/uHsrrrx.jpg",
        "https://i.imgur.com/PVi8YDi.jpg",
        "https://i.imgur.com/FLC3ZXE.jpg",
        "https://i.imgur.com/54m52tX.jpg",
        "https://i.imgur.com/OsxYPgQ.jpg",
        "https://i.imgur.com/vpw6Xnr.jpg",
        "https://i.imgur.com/aAyPrZx.jpg",
        "https://i.imgur.com/Gh3ORCd.jpg",
        "https://i.imgur.com/rjGhygM.jpg",
        "https://i.imgur.com/zdHVFEI.jpg",
        "https://i.imgur.com/kAplnSG.jpg",
        "https://i.imgur.com/15UiO8o.jpg",
        "https://i.imgur.com/qjjyr6G.jpg",
        "https://i.imgur.com/bQZRhBU.jpg",
        "https://i.imgur.com/vpw6Xnr.jpg",
        "https://i.imgur.com/aAyPrZx.jpg",
        "https://i.imgur.com/Gh3ORCd.jpg",
        "https://i.imgur.com/rjGhygM.jpg",
        "https://i.imgur.com/0MhmmF4.jpg",
        "https://i.imgur.com/2MX4wvq.jpg",
        "https://i.imgur.com/HYL5ggu.jpg",
        "https://i.imgur.com/7ZjOD2a.jpg",
        "https://i.imgur.com/zbEUy3m.jpg",
        "https://i.imgur.com/tZ6vlg6.jpg",
        "https://i.imgur.com/jdPns8O.jpg",
        "https://i.imgur.com/VyjBQHT.jpg",
        "https://i.imgur.com/ozAGqBD.jpg",
        "https://i.imgur.com/DsSj9S1.jpg",
        "https://i.imgur.com/KYHpjNc.jpg",
        // Nuevas imágenes agregadas
        "https://i.imgur.com/9ptmlPl.jpg",
        "https://i.imgur.com/38tVliz.jpg",
        "https://i.imgur.com/2NqCKE3.jpg",
        "https://i.imgur.com/pveviMG.jpg",
        "https://i.imgur.com/d71dnkv.jpg",
        "https://i.imgur.com/cr7Ypj1.jpg",
        "https://i.imgur.com/jAxzCj4.jpg",
        "https://i.imgur.com/xokuFLf.jpg",
        "https://i.imgur.com/Hi4zLaf.jpg",
        "https://i.imgur.com/OlaQtwW.jpg",
        "https://i.imgur.com/Dm4GLuF.jpg",
        "https://i.imgur.com/k6Y2E9b.jpg",
        "https://i.imgur.com/1rk7jdu.jpg",
        "https://i.imgur.com/TFmEVPc.jpg",
        "https://i.imgur.com/0XefLlJ.jpg",
        "https://i.imgur.com/bwa9LYZ.jpg",
        "https://i.imgur.com/WgrpTmg.jpg",
        "https://i.imgur.com/Z5f5YAw.jpg",
        "https://i.imgur.com/xEuBtPO.jpg",
        "https://i.imgur.com/NA0fHxn.jpg",
        "https://i.imgur.com/InueCKQ.jpg",
        "https://i.imgur.com/3syOcHe.jpg",
        "https://i.imgur.com/N1dgels.jpg",
        "https://i.imgur.com/IxKAJaV.jpg",
        "https://i.imgur.com/8VrxL1d.jpg",
        "https://i.imgur.com/8B4Y0bG.jpg",
        "https://i.imgur.com/wgkGOjF.jpg",
        "https://i.imgur.com/765Wi6q.jpg",
        "https://i.imgur.com/5joeWnm.jpg",
        "https://i.imgur.com/71fjmmM.jpg",
        "https://i.imgur.com/cAuKeyZ.jpg",
        "https://i.imgur.com/SDZ2Hs5.jpg",
        "https://i.imgur.com/skkEyqI.jpg",
        "https://i.imgur.com/6dXFsBW.jpg",
        "https://i.imgur.com/6CeG9ZX.jpg"
    ];

    // Selecciona una imagen aleatoria de la lista
    let imagenSeleccionada = imagenes[Math.floor(Math.random() * imagenes.length)];

    // Enviar el mensaje con la imagen seleccionada
    await conn.sendMessage(m.chat, { image: { url: imagenSeleccionada }, caption: 'Esto es para ti papi 🥵' }, { quoted: m });
};

handler.help = ['imgx'];
handler.tags = ['fun'];
handler.command = /^(imgsex)$/i;

export default handler;
