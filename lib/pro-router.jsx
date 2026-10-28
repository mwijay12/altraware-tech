'use client';

// Compatibility shim: the reference build used a hash router with a curtain
// transition. Inside Next we map its <Link to="..."> API onto next/link so the
// ported components keep working unchanged.
import NextLink from 'next/link';

export function Link({ to, children, ...rest }) {
    return (
        <NextLink href={to || '/'} {...rest}>
            {children}
        </NextLink>
    );
}

export default Link;
