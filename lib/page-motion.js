/** Run after a route wipe has uncovered the page (or immediately on direct load). */
export function whenPageVisible(callback) {
    const overlay = document.getElementById('page-transition');
    if (!overlay?.classList.contains('active')) {
        callback();
        return () => {};
    }
    window.addEventListener('altraware:page-visible', callback, { once: true });
    return () => window.removeEventListener('altraware:page-visible', callback);
}
