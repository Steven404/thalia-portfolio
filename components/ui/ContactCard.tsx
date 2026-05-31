"use client";

import type { ContactItem } from "@/lib/data";

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.58 1.25h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const icons = { phone: PhoneIcon, email: EmailIcon, instagram: InstagramIcon };

interface ContactCardProps {
  item: ContactItem;
}

export default function ContactCard({ item }: ContactCardProps) {
  const Icon = icons[item.icon];

  return (
    <a
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
      className="group flex flex-col gap-4 p-10 transition-colors duration-300"
      style={{ background: "var(--bg)" }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "var(--bg)")}
    >
      {/* Icon badge */}
      <div
        className="w-10 h-10 flex items-center justify-center rounded-sm transition-colors duration-300"
        style={{ background: "var(--border)", color: "var(--gold)" }}
      >
        <Icon />
      </div>

      <div>
        <p
          className="text-xs font-semibold tracking-widest uppercase mb-2"
          style={{ color: "var(--gold-dim)" }}
        >
          {item.label}
        </p>
        <p
          className="text-lg font-medium transition-colors duration-300 group-hover:text-[var(--gold)]"
          style={{ color: "var(--ink)" }}
        >
          {item.value}
        </p>
        <p className="mt-1 text-xs" style={{ color: "var(--ink-dim)" }}>
          {item.subtitle}
        </p>
      </div>
    </a>
  );
}
