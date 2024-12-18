import FormData from "form-data";
import Jimp from "jimp";

const cooldowns = {}; // Objeto para almacenar los tiempos de los cooldowns

const handler = async (m, {conn, usedPrefix, command}) => {
  try {
    const userId = m.sender; // Usamos el ID del usuario que envía el mensaje
    const cooldownTiempo = 20000; // Cooldown de 20 segundos (en milisegundos)
    const tiempoActual = new Date().getTime(); // Obtiene el tiempo actual en milisegundos

    // Comprobar el cooldown para el usuario
    if (cooldowns[userId] && tiempoActual - cooldowns[userId] < cooldownTiempo) {
      const tiempoRestante = Math.floor((cooldownTiempo - (tiempoActual - cooldowns[userId])) / 1000); // Tiempo restante en segundos
      return m.reply(`Por favor espera ${tiempoRestante} segundos antes de usar el comando de nuevo.`);
    }

    // Actualizar el tiempo de cooldown
    cooldowns[userId] = tiempoActual;

    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || "";
    if (!mime) throw `Debes responder a una imagen`;
    if (!/image\/(jpe?g|png)/.test(mime)) throw `error. solo se puede con fotos`;

    m.reply("*La calidad está aumentando...*");
    let img = await q.download?.();
    let pr = await remini(img, "enhance");
    conn.sendMessage(m.chat, {image: pr}, {quoted: m});
  } catch (error) {
    throw "Error, intentelo de nuevo: " + error;
  }
};

handler.help = ["remini", "hd", "enhance"];
handler.tags = ["ai", "tools"];
handler.command = ["remini", "hd", "enhance"];

export default handler;

async function remini(imageData, operation) {
  return new Promise(async (resolve, reject) => {
    const availableOperations = ["enhance", "recolor", "dehaze"];
    if (availableOperations.includes(operation)) {
      operation = operation;
    } else {
      operation = availableOperations[0];
    }
    const baseUrl = "https://inferenceengine.vyro.ai/" + operation + ".vyro";
    const formData = new FormData();
    formData.append("image", Buffer.from(imageData), {filename: "enhance_image_body.jpg", contentType: "image/jpeg"});
    formData.append("model_version", 1, {"Content-Transfer-Encoding": "binary", contentType: "multipart/form-data; charset=utf-8"});
    formData.submit({url: baseUrl, host: "inferenceengine.vyro.ai", path: "/" + operation, protocol: "https:", headers: {"User-Agent": "okhttp/4.9.3", Connection: "Keep-Alive", "Accept-Encoding": "gzip"}}, function (err, res) {
      if (err) reject(err);
      const chunks = [];
      res.on("data", function (chunk) {chunks.push(chunk)});
      res.on("end", function () {resolve(Buffer.concat(chunks))});
      res.on("error", function (err) {
        reject(err);
      });
    });
  });
}
