import React from 'react';
import { Hand, Zap, Droplets, HeartPulse } from 'lucide-react';
import Image from 'next/image';

const Services = () => {
const services = [
  {
    name: "অ্যাকুপ্রেশার",
    description:
      "এটি একটি প্রাচীন ও বৈজ্ঞানিক চিকিৎসা পদ্ধতি, যা দেহের সুনির্দিষ্ট  বিন্দু যেখানে সরু কাঠি অথবা হাতের আঙুল দ্বারা মৃদু চাপ প্রয়োগ করে  স্টিমুলেট বা উদ্দীপ্ত করার মাধ্যমে জৈব শক্তি প্রবাহের মাত্রা স্থীর করে রোগ প্রতিরোধ ক্ষমতা বাড়ানো এবং নিরাময়ের সহজ প্রাকৃতিক মাধ্যম।",
    icon: "/images/acu.webp",
  },
  {
    name: "অ্যাকুপাংচার",
    description:
      "এটি আকুপ্রেসার চিকিৎসা পদ্ধতির বৈজ্ঞানিক আধুনিক রূপ, যা দেহের সুনির্দিষ্ট  বিন্দু যেখানে সূক্ষ্ম সুচ প্রয়োগ করে  স্টিমুলেট বা উদ্দীপ্ত করার মাধ্যমে জৈব শক্তি প্রবাহের মাত্রা স্থীর করে রোগ প্রতিরোধ ক্ষমতা বাড়ানো এবং নিরাময়ের  মাধ্যম।",
    icon: "/images/acup.webp",
  },
  {
    name: "হিজামা",
    description:
      "হিজামা একটি সুন্নাহ ভিত্তিক অতি প্রাচীন ও বৈজ্ঞানিক চিকিৎসা পদ্ধতি, যাতে নেগেটিভ সাকশন-এর মাধ্যমে শরীর থেকে দূষিত রক্ত (Toxic Blood) বের করে দিয়ে রক্ত বিশুদ্ধ (Blood Purification) করা হয়।",
    icon: "/images/hijamaIcon.webp",
  },
  {
    name: "পেইন ম্যানেজমেন্ট",
    description:
      "এটি একটি সমন্বিত চিকিৎসা পদ্ধতি, যা আধুনিক ও প্রাকৃতিক উপায় অবলম্বন করে কোমরের ব্যথা, হাঁটু ও ঘাড়ের দীর্ঘস্থায়ী যন্ত্রণা এবং মাইগ্রেনের মতো জটিল ব্যথাকে কার্যকরভাবে নিয়ন্ত্রণ ও সম্পূর্ণ নিরাময়ে সাহায্য করে।",
    icon: "/images/pain.webp",
  },
  {
    name: "ন্যাচারোপ্যাথি",
    description:
      "এটি সম্পূর্ণ প্রাকৃতিক উপায়ে চিকিৎসা করার একটি সামগ্রিক পদ্ধতি, যেখানে সঠিক খাদ্য, জীবনযাত্রা ও প্রকৃতির নিরাময় শক্তিকে কাজে লাগিয়ে শরীরের অভ্যন্তরীণ রোগ প্রতিরোধ ক্ষমতা বৃদ্ধি করা হয় এবং ভেষজ ওষুধের মাধ্যমে দীর্ঘস্থায়ী রোগের কারণ নির্ণয় করে সেগুলির সমাধান করা হয়।",
    icon: "/images/naturo.webp",
  },
];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            আমাদের সেবাসমূহ
          </h2>
          <p className="text-lg text-text-color mt-2">
            আমরা যে সকল সেবা প্রদান করে থাকি
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service.name}
              className="bg-neutral-grey p-8 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-4 text-blue-500 text-3xl">
                <Image
                  src={service.icon}
                  width={60}
                  height={60}
                  alt=""
                  className="mx-auto"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 text-text-color mb-3">
                {service.name}
              </h3>
              <p className="text-text-color text-justify">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;