import React from 'react';
import { Quote } from 'lucide-react';

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-12">
          রোগীদের মতামত
        </h2>
        <div className="relative max-w-3xl mx-auto">
          <Quote
            size={60}
            className="absolute -top-8 -left-8 text-secondary-blue opacity-20"
          />
          <blockquote className="text-xl md:text-2xl italic text-text-color">
            "এখানকার চিকিৎসায় আমি খুবই সন্তুষ্ট। তাদের ব্যবহার এবং সেবার মান
            দুটোই অসাধারণ। আমি এখন পুরোপুরি সুস্থ।"
          </blockquote>
          <p className="mt-6 font-bold text-lg text-primary-green">
            - একজন সুখী রোগী
          </p>
          <Quote
            size={60}
            className="absolute -bottom-8 -right-8 text-secondary-blue opacity-20 transform scale-x-[-1]"
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;