import Hero from "@/components/Home/Hero";
import ServicesSlider from "@/components/Home/ServicesSlider";
import About from "@/components/Home/About";
import Testimonials from "@/components/Home/Testimonials";
import Contact from "@/components/Home/Contact";
import Blog from "@/components/Home/Blog";
import Services from "@/components/Home/Services";
import CTA from "@/components/Home/CTA";

export const metadata = {
  title: 'দরদী হেলথ কেয়ার (DHC) - সেরা প্রাকৃতিক চিকিৎসা কেন্দ্র | ঢাকা, বাংলাদেশ',
  description: 'দরদী হেলথ কেয়ার (DHC) - ঢাকার সেরা প্রাকৃতিক চিকিৎসা কেন্দ্রে আকুপাংচার, হিজামা ও ন্যাচারোপ্যাথির মাধ্যমে সব ধরনের ব্যথা এবং জটিল রোগের পার্শ্বপ্রতিক্রিয়াহীন চিকিৎসা নিন।',
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <>
      <h1 className="sr-only">দরদী হেলথ কেয়ার (DHC): আপনার বিশ্বস্ত প্রাকৃতিক চিকিৎসা কেন্দ্র</h1>
      <h2 className="sr-only">আন্তর্জাতিক মানের আকুপাংচার, হিজামা, এবং ন্যাচারোপ্যাথি বিশেষজ্ঞ দ্বারা পরিচালিত</h2>
      <Hero />
      <Services/>
      <CTA/>
      <ServicesSlider />
      <About />
      <Testimonials />
      <Blog />
      <Contact />
    </>
  );
}
