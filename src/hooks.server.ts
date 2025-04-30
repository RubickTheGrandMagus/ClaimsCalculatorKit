// src/hooks.server.js
import { redirect } from '@sveltejs/kit';

export function handle({ event, resolve }) {
    const path = event.url.pathname;
    
    if (['/mc', '/mc/','/faq','/faq/','/bugreport','/bugreport/','/about','/about/','/docs/mone','/docs/other','/docs/tppd','/docs/death'].includes(path)) {
        throw redirect(307, '/error');
    }
    
    return resolve(event);
}
