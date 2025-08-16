"use client";

import { Mail, Twitter, Instagram, Facebook, Linkedin } from 'lucide-react';

const Contacts: React.FC = () => {
  const socialLinks = [
    { icon: Mail, href: "mailto:pakkahadsri@gmail.com", label: "Email", color: "hover:text-red-400" },
    { icon: Twitter, href: "https://x.com/Molybdena025", label: "Twitter", color: "hover:text-blue-400" },
    { icon: Instagram, href: "https://www.instagram.com/tatar025/", label: "Instagram", color: "hover:text-pink-400" },
    { icon: Facebook, href: "https://www.facebook.com/patiphan.akkahadsri/", label: "Facebook", color: "hover:text-blue-600" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/patiphan-akkahadsri-959535271/", label: "LinkedIn", color: "hover:text-blue-500" }
  ];

  return (
    <section className="bg-black py-12 px-4 flex items-center justify-center">
      <div className="text-center space-y-4 max-w-sm">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Get In Touch
          </h2>
          <p className="text-gray-300 text-sm">
            Let&apos;s connect through any of these platforms.
          </p>
        </div>
        
        <div className="flex justify-center items-center space-x-4">
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon;
            return (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-400 ${social.color} transition-all duration-300 transform hover:scale-110`}
                aria-label={social.label}
              >
                <IconComponent size={28} />
              </a>
            );
          })}
        </div>
        
        <div className="pt-2">
          <p className="text-gray-400 text-xs">
            or email{' '}
            <a
              href="mailto:pakkahadsri@gmail.com"
              className="text-white hover:text-blue-400 transition-colors duration-300"
            >
              pakkahadsri@gmail.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contacts;