const handler = async (m, { isOwner, isAdmin, conn, args, participants }) => {
  // Verifica permisos
  let canal = (typeof rcanal !== 'undefined') ? rcanal : (global.rcanal || '');
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, canal, conn);
    throw false;
  }

  // Obtiene datos del grupo
  const pesan = args.join(' ');
  const groupMetadata = await conn.groupMetadata(m.chat);
  const groupName = groupMetadata.subject;
  const total = participants.length;

  // Reacciona al mensaje
  await conn.sendMessage(m.chat, { react: { text: '🔪', key: m.key } });

  // Construye el texto de mención con formato de columna
  let mentionText = '';
  mentionText += '┏━━━━━━━━━━━┓\n';
  mentionText += `┃  🛸 𝖦𝗋𝗎𝗉𝗈: ${groupName}\n`;
  mentionText += `┃  👥 𝖬𝗂𝖾𝗆𝖻𝗋𝗈𝗌: ${total}\n`;
  mentionText += '┗━━━━━━━━━━━┛\n';
  if (pesan) mentionText += `${pesan}\n`;
  mentionText += '┌──⭓ *Despierten*\n';
  mentionText += participants.map(mem => `🍷 @${mem.id.split('@')[0]}`).join('\n');
  mentionText += '\n└───────⭓\n\n𝘚𝘶𝘱𝘦𝘳 𝘉𝘰𝘵 𝘞𝘩𝘢𝘵𝘴𝘈𝘱𝘱 🔪';

  // Envía la imagen con el texto y menciones
  await conn.sendMessage(m.chat, {
    image: { url: 'https://files.catbox.moe/m8562b.jpg' },
    caption: mentionText,
    gifPlayback: true,
    mentions: participants.map(a => a.id)
  }, { quoted: m });
};

handler.customPrefix = /^\.?todos$/i;
handler.command = new RegExp();
handler.group = true;
handler.admin = true;
export default handler;
