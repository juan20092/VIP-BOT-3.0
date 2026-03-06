let handler = async (m, { conn }) => {
  // Tomar la mención desde donde normalmente la trae Baileys/MD
  let mentioned =
    (m.mentionedJid && m.mentionedJid.length ? m.mentionedJid : []) ||
    [];

  // Fallback por si viene en otro campo
  if (!mentioned.length) {
    mentioned =
      m.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
  }

  if (!mentioned.length) {
    return conn.sendMessage(
      m.chat,
      { text: "⚠️ Debes mencionar a un usuario. Usa el formato: .gordopantene @usuario" },
      { quoted: m }
    );
  }

  const user = mentioned[0];

  // Nombre (contacto) del usuario
  let name = user;
  try {
    name = (await conn.getName(user)) || user;
  } catch {}

  const porcentaje = Math.floor(Math.random() * 100) + 1;

  // Que salga el @mencionado + el nombre
  const tag = `@${user.split('@')[0]}`;
  const mensaje = `😂 ${tag} tiene mucha panza y poco pene! Probabilidad: ${porcentaje}%`;

  // Enviar mencionando para que sea clickeable/notifique
  await conn.sendMessage(
    m.chat,
    { text: mensaje, mentions: [user] },
    { quoted: m }
  );
};

handler.help = ['gordopantene @usuario'];
handler.tags = ['diversión'];
handler.command = ['gordopantene'];

export default handler;
