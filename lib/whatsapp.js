import { CONTACT } from '@/lib/data';

/** Build a service-specific WhatsApp link even when the base has no text query. */
export function serviceWhatsAppLink(base, service) {
    let url;
    try {
        url = new URL(base || CONTACT.whatsapp);
    } catch {
        url = new URL(CONTACT.whatsapp);
    }
    url.searchParams.set('text', `Hi Altraware, I want to discuss ${service}.`);
    return url.toString();
}
