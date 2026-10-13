// ─── Cloudinary helpers ─────────────────────────────────────────────────────
// Images can live in /public (e.g. /assets/work/…) OR on Cloudinary.
// For Cloudinary uploads from the browser, create an UNSIGNED upload preset
// in your Cloudinary dashboard, then set:
//   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=…
//   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=…
// Server-side signing uses CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET (never client-side).

export function cloudinaryConfigured() {
    return Boolean(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME && process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
}

export function cloudinaryUrl(publicId, width) {
    const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    if (!cloud) return '';
    const w = width ? `w_${width},` : '';
    return `https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_auto,${w}${publicId}`;
}

/** Browser upload via unsigned preset. Returns the secure_url. */
export async function uploadToCloudinary(file) {
    const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    if (!cloud || !preset) {
        throw new Error('Cloudinary is not configured. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET.');
    }
    const form = new FormData();
    form.append('file', file);
    form.append('upload_preset', preset);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, {
        method: 'POST',
        body: form,
    });
    if (!res.ok) throw new Error('Cloudinary upload failed.');
    const data = await res.json();
    return data.secure_url;
}
