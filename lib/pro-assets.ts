// Static asset map for the "pro" home experience.
// Files live in /public/assets/pro (extracted from the reference build).
const W = "/assets/pro/work";
const T = "/assets/pro/tech";
const S = "/assets/pro/svg";

export const img = {
  logo: "/assets/pro/logo.webp",
  favicon: "/assets/pro/favicon.png",
  david: "/assets/pro/david.webp",
  clemence: "/assets/pro/clemence.webp",
  work: {
    audenic: `${W}/audenic.webp`,
    aymi: `${W}/aymi.webp`,
    bongofoodie: `${W}/bongofoodie.webp`,
    faidahq: `${W}/faidahq.webp`,
    tzReach: `${W}/tzReach.webp`,
    uautconnect: `${W}/uautconnect.webp`,
    niketz: `${W}/niketz.webp`,
    volta: `${W}/volta.webp`,
  },
  tech: {
    apps: `${T}/iconApps.webp`,
    cloud: `${T}/iconCloud.webp`,
    partners: `${T}/iconPartners.webp`,
    pos: `${T}/iconPos.webp`,
    support: `${T}/iconSupport.webp`,
    websites: `${T}/iconWebsites.webp`,
  },
  sticker: {
    smiley: `${S}/smiley-face.svg`,
    thumbs: `${S}/sticker-thumbs.svg`,
    cursor: `${S}/sticker-cursor.svg`,
    phone: `${S}/sticker-phone.svg`,
    heart: `${S}/footer-heart.svg`,
    camera: `${S}/card-camera.svg`,
    cardPhone: `${S}/card-phone.svg`,
    cardSmiley: `${S}/card-smiley.svg`,
    hand: `${S}/card-hand.svg`,
    cardHeart: `${S}/card-heart.svg`,
  },
} as const;

export default img;
