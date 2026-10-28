'use client';

import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import HomePro from '@/components/pro/HomePro';

export default function Home() {
    return (
        <div className="pro-root">
            <SmoothScroll />
            <header className="main-header">
                <Navbar />
            </header>
            <HomePro />
        </div>
    );
}
