import fetch from "node-fetch"
import yts from "yt-search"
import ytdl from 'ytdl-core'
import axios from 'axios'
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
  let q, v, yt, dl_url, ttl, size, lolhuman, lolh, n, n2, n3, n4, cap, qu, currentQuality   
  if (!text) throw `*❌ ERROR... Falto escribir el título.*`
  
  try {
    const yt_play = await search(args.join(" "))
    let captionvid = `
    *TÍTULO:*
    »  ${yt_play[0].title}
    ﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘
    *✅ Enviando... Espere.*
    `.trim()

    await conn.sendMessage(m.chat, {
      text: captionvid,
      contextInfo: {
        externalAdReply: {
          title: yt_play[0].title,
          body: packname,
          thumbnailUrl: yt_play[0].thumbnail, 
          mediaType: 1,
          showAdAttribution: true,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })
    
    if (command == 'audio') {  
      try {
        let q = '128kbps'
        let v = yt_play[0].url
        const yt = await youtubedl(v).catch(async _ => await youtubedlv2(v))
        const dl_url = await yt.audio[q].download()
        const ttl = await yt.title
        const size = await yt.audio[q].fileSizeH
        
        await conn.sendMessage(m.chat, { 
          audio: { url: dl_url }, 
          mimetype: 'audio/mpeg', 
          contextInfo: {
            externalAdReply: {
              title: ttl,
              body: "",
              thumbnailUrl: yt_play[0].thumbnail, 
              mediaType: 1,
              showAdAttribution: true,
              renderLargerThumbnail: true
            }
          }
        }, { quoted: m })   
      } catch {
        try {
          const dataRE = await fetch(`https://api.akuari.my.id/downloader/youtube?link=${yt_play[0].url}`)
          const dataRET = await dataRE.json()
          await conn.sendMessage(m.chat, { 
            audio: { url: dataRET.mp3[1].url }, 
            mimetype: 'audio/mpeg', 
            contextInfo: {
              externalAdReply: {
                title: yt_play[0].title,
                body: "",
                thumbnailUrl: yt_play[0].thumbnail, 
                mediaType: 1,
                showAdAttribution: true,
                renderLargerThumbnail: true
              }
            }
          }, { quoted: m })   
        } catch {
          try {
            let humanLol = await fetch(`https://api.lolhuman.xyz/api/ytplay?apikey=${lolkeysapi}&query=${yt_play[0].title}`)
            let humanRET = await humanLol.json()
            await conn.sendMessage(m.chat, { 
              audio: { url: humanRET.result.audio.link }, 
              mimetype: 'audio/mpeg', 
              contextInfo: {
                externalAdReply: {
                  title: yt_play[0].title,
                  body: "",
                  thumbnailUrl: yt_play[0].thumbnail, 
                  mediaType: 1,
                  showAdAttribution: true,
                  renderLargerThumbnail: true
                }
              }
            }, { quoted: m })       
          } catch {     
            try {
              let lolhuman = await fetch(`https://api.lolhuman.xyz/api/ytaudio2?apikey=${lolkeysapi}&url=${yt_play[0].url}`)    
              let lolh = await lolhuman.json()
              let n = lolh.result.title || 'error'
              await conn.sendMessage(m.chat, { 
                audio: { url: lolh.result.link}, 
                mimetype: 'audio/mpeg', 
                contextInfo: {
                  externalAdReply: {
                    title: n,
                    body: "",
                    thumbnailUrl: yt_play[0].thumbnail, 
                    mediaType: 1,
                    showAdAttribution: true,
                    renderLargerThumbnail: true
                  }
                }
              }, { quoted: m })   
            } catch {   
              try {
                let searchh = await yts(yt_play[0].url)
                let __res = searchh.all.map(v => v).filter(v => v.type == "video")
                let infoo = await ytdl.getInfo('https://youtu.be/' + __res[0].videoId)
                let ress = await ytdl.chooseFormat(infoo.formats, { filter: 'audioonly' })
                await conn.sendMessage(m.chat, { 
                  audio: { url: ress.url }, 
                  mimetype: 'audio/mpeg', 
                  contextInfo: {
                    externalAdReply: {
                      title: __res[0].title,
                      body: "",
                      thumbnailUrl: yt_play[0].thumbnail, 
                      mediaType: 1,
                      showAdAttribution: true,
                      renderLargerThumbnail: true
                    }
                  }
                }, { quoted: m })   
              } catch {
              }
            }
          }
        }
      }
    }
  } catch {
    handler.limit = 0
  }
}

handler.command = ['audio']
handler.exp = 0
handler.limit = 0
export default handler

async function search(query, options = {}) {
  const search = await yts.search({ query, hl: "es", gl: "ES", ...options });
  return search.videos;
}

function MilesNumber(number) {
  const exp = /(\d)(?=(\d{3})+(?!\d))/g;
  const rep = "$1.";
  let arr = number.toString().split(".");
  arr[0] = arr[0].replace(exp, rep);
  return arr[1] ? arr.join(".") : arr[0];
}

function secondString(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);
  var dDisplay = d > 0 ? d + (d == 1 ? " día, " : " días, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hora, " : " horas, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minuto, " : " minutos, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " segundo" : " segundos") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
}

function bytesToSize(bytes) {
  return new Promise((resolve, reject) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return 'n/a';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) resolve(`${bytes} ${sizes[i]}`);
    resolve(`${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`)})};
