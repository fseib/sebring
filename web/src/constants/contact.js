// Datos de contacto del concesionario.
// TODO: reemplazar por el número real de WhatsApp (formato internacional, sin + ni espacios).
export const WHATSAPP_NUMBER = '5491100000000'

export function whatsappUrl(message = '') {
  const text = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${WHATSAPP_NUMBER}${text}`
}
