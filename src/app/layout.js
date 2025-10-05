import { Noto_Sans_Bengali, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import { AppointmentProvider } from "@/context/AppointmentContext";

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
    template: "দরদী হেলথ কেয়ার (DHC)",
    default:
      "দরদী হেলথ কেয়ার (DHC) Dorodi Health Care- প্রাকৃতিক উপায়ে ব্যথা নিরাময় ও সুস্বাস্থ্য",
  },
  description:
    "দরদী হেলথ কেয়ার (DHC) - অভিজ্ঞ চিকিৎসকের মাধ্যমে আকুপাংচার, হিজামা, এবং ন্যাচারোপ্যাথি চিকিৎসাসেবা নিন। পার্শ্বপ্রতিক্রিয়াহীন প্রাকৃতিক চিকিৎসায় সুস্থ থাকুন।",
  keywords: [
    "দরদী হেলথ কেয়ার",
    "Dorodi Health Care",
    "DHC",
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
  authors: [{ name: "দরদী হেলথ কেয়ার" }],
  creator: "দরদী হেলথ কেয়ার",
  publisher: "দরদী হেলথ কেয়ার",
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
      </body>
    </html>
  );
}