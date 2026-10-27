import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "Rise at Seven | Award Winning Search-First Content Marketing Agency",
  description:
    "Rise at Seven is a search-first content marketing agency with offices in London, Sheffield, Manchester & New York that specialises in SEO, Digital PR,…",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="no-js h-full antialiased">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const e = document.createElement("link").relList;
                if (!(e && e.supports && e.supports("modulepreload"))) {
                  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) r(e);
                  new MutationObserver((e) => {
                    for (const o of e) {
                      if ("childList" === o.type) {
                        for (const e of o.addedNodes) {
                          if ("LINK" === e.tagName && "modulepreload" === e.rel) r(e);
                          else if (e.querySelectorAll) {
                            for (const o of e.querySelectorAll("link[rel=modulepreload]")) r(o);
                          }
                        }
                      }
                    }
                  }).observe(document, { childList: true, subtree: true });
                }
                function r(e) {
                  if (e.ep) return;
                  e.ep = true;
                  const r = function (e) {
                    const r = {};
                    return e.integrity && (r.integrity = e.integrity),
                      e.referrerpolicy && (r.referrerPolicy = e.referrerpolicy),
                      "use-credentials" === e.crossorigin ? (r.credentials = "include") :
                      "anonymous" === e.crossorigin ? (r.credentials = "omit") :
                      (r.credentials = "same-origin"),
                      r;
                  }(e);
                  fetch(e.href, r);
                }
              })();
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments)};
              gtag('js', new Date());
              gtag('config', 'G-21W8T1C4M8', {'send_page_view': true,'anonymize_ip': false,'link_attribution': false,'allow_display_features': false});
              gtag('config', 'AW-390915267', {'send_page_view': true});
            `,
          }}
        />
        <script
          src="https://www.googletagmanager.com/gtag/js?id=G-21W8T1C4M8"
          async
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s){
                if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
                t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)
              }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '2337836320038792');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=2337836320038792&ev=PageView&noscript=1"
          />
        </noscript>
        <script
          src="https://kit.fontawesome.com/711261502f.js"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-[#EFEEEC] min-h-full flex flex-col">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
