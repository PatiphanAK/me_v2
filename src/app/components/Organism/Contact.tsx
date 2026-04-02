"use client";
import { Mail, Linkedin, Github } from "lucide-react";

const Contacts: React.FC = () => {
  const socialLinks = [
    { icon: Mail, href: "mailto:pakkahadsri@gmail.com", label: "Email" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/patiphan-akkahadsri-959535271/",
      label: "LinkedIn",
    },
    { icon: Github, href: "https://github.com/PatiphanAK", label: "GitHub" },
  ];

  return (
    <footer
      className="
        relative w-full
        border-t border-[var(--border-muted)]
        bg-[var(--bg-elevated)]
        overflow-hidden
      "
    >
      {/* subtle top line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-[var(--border)] opacity-60" />

      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* LEFT */}
        <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
          <div className="text-base font-mono text-[var(--text-primary)]">
            let’s build systems that scale.
          </div>

          <div className="text-sm text-[var(--text-muted)] max-w-md">
            backend · distributed systems · cloud-native infrastructure
          </div>

          <a
            href="mailto:pakkahadsri@gmail.com"
            className="
              mt-3 inline-block
              px-4 py-2 text-sm font-mono
              border border-[var(--border)]
              text-[var(--text-secondary)]
              hover:text-[var(--text-primary)]
              hover:border-[var(--accent-dim)]
              transition
            "
          >
            → contact
          </a>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <a
            href="mailto:pakkahadsri@gmail.com"
            className="
              text-sm font-mono
              text-[var(--text-secondary)]
              hover:text-[var(--accent)]
              transition
            "
          >
            pakkahadsri@gmail.com
          </a>

          <div className="flex items-center gap-4">
            {socialLinks.map((social, i) => {
              const Icon = social.icon;
              return (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    p-2
                    text-[var(--text-muted)]
                    hover:text-[var(--accent)]
                    transition
                  "
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>

          <div className="text-xs text-[var(--text-muted)]">
            © {new Date().getFullYear()} Patiphan Akkahadsri
          </div>
        </div>
      </div>

      {/* grid (เบาลงมาก) */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          opacity-[0.03]
          [background-image:linear-gradient(var(--grid-color)_1px,transparent_1px),linear-gradient(90deg,var(--grid-color)_1px,transparent_1px)]
          [background-size:40px_40px]
        "
      />
    </footer>
  );
};

export default Contacts;
