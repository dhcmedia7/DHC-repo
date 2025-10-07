import { Noto_Sans_Bengali, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import { AppointmentProvider } from "@/context/AppointmentContext";
import Script from "next/script";

const noto = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: "--font-noto-sans-bengali",
  weight: ["400", "700"],
});

const hind = Hind_Siliguri({
  subsets: ["bengali"],
  variable: "--font-hind-siliguri",
  weight: ["400", "700"],
});

export const metadata = {
  title: {
    template: "DHC - দরদী হেলথ কেয়ার",
    default:
      "DHC - দরদী হেলথ কেয়ার (DHC) Dorodi Health Care- প্রাকৃতিক উপায়ে ব্যথা নিরাময় ও সুস্বাস্থ্য",
  },
  description:
    " DHC - দরদী হেলথ কেয়ার (DHC) - অভিজ্ঞ চিকিৎসকের মাধ্যমে আকুপাংচার, হিজামা, এবং ন্যাচারোপ্যাথি চিকিৎসাসেবা নিন। পার্শ্বপ্রতিক্রিয়াহীন প্রাকৃতিক চিকিৎসায় সুস্থ থাকুন।",
  keywords: [
    "DHC",
    "দরদী হেলথ কেয়ার",
    "Dorodi Health Care",
    "আকুপাংচার",
    "হিজামা",
    "ন্যাচারোপ্যাথি",
    "ব্যথা নিরাময়",
    "প্রাকৃতিক চিকিৎসা",
    "Acupuncture",
    "Hijama",
    "Naturopathy",
    "Pain Relief",
  ],
  authors: [{ name: "DHC - দরদী হেলথ কেয়ার" }],
  creator: " DHC - দরদী হেলথ কেয়ার",
  publisher: "DHC - দরদী হেলথ কেয়ার",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${noto.variable} ${hind.variable} antialiased`}>
        <AppointmentProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </AppointmentProvider>
        <div id="fb-root"></div>
        <div id="fb-customer-chat" className="fb-customerchat"></div>
        <Script id="messenger-chat-init" strategy="afterInteractive">
          {`
            var chatbox = document.getElementById('fb-customer-chat');
            chatbox.setAttribute("page_id", "113974433487554");
            chatbox.setAttribute("attribution", "biz_inbox");

            window.fbAsyncInit = function() {
              FB.init({
                xfbml            : true,
                version          : 'v19.0'
              });
            };

            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
          `}
        </Script>
      </body>
    </html>
  );
}