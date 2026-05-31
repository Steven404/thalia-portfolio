"use client";

import { useState, useEffect } from "react";
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

const ArrowDiagIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M17 7H7M17 7v10" />
  </svg>
);

const icons = { phone: PhoneIcon, email: EmailIcon, instagram: InstagramIcon };

interface ContactCardProps {
  item: ContactItem;
  index: number;
  inView: boolean;
}

const EXPO = "cubic-bezier(0.16, 1, 0.3, 1)";
const STAGGER_MS = 80;

export default function ContactCard({ item, index, inView }: ContactCardProps) {
  const Icon = icons[item.icon];
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const enterDelay = index * STAGGER_MS;

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const hoverTransform = pressed
    ? "translateY(-1px) scale(0.98)"
    : hovered
      ? "translateY(-3px)"
      : "translateY(0)";

  return (
    <div
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 600ms ${enterDelay}ms ${EXPO}, transform 600ms ${enterDelay}ms ${EXPO}`,
      }}
    >
      <a
        href={item.href}
        target={item.external ? "_blank" : undefined}
        rel={item.external ? "noopener noreferrer" : undefined}
        className="flex flex-col gap-4 p-6 sm:p-10 relative overflow-hidden"
        style={{
          background: hovered ? "oklch(10.9% 0.006 133)" : "var(--bg)",
          boxShadow: hovered
            ? "0 12px 40px oklch(67% 0.055 133 / 0.1), 0 2px 8px oklch(0% 0 0 / 0.3)"
            : "none",
          transform: hoverTransform,
          transition: `background 300ms ${EXPO}, box-shadow 300ms ${EXPO}, transform 200ms ${EXPO}`,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setPressed(false); }}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onTouchStart={() => { setHovered(true); setPressed(true); }}
        onTouchEnd={() => { setPressed(false); setTimeout(() => setHovered(false), 180); }}
        onTouchCancel={() => { setHovered(false); setPressed(false); }}
      >
        {/* Icon badge */}
        <div
          className="w-10 h-10 flex items-center justify-center rounded-sm"
          style={{
            background: hovered ? "oklch(67% 0.055 133 / 0.15)" : "var(--border)",
            color: hovered ? "var(--sage-bright)" : "var(--sage)",
            transition: `background 300ms ${EXPO}, color 300ms ${EXPO}`,
          }}
        >
          <Icon />
        </div>

        <div>
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-2"
            style={{ color: "var(--sage-dim)" }}
          >
            {item.label}
          </p>
          <p
            className="text-lg font-medium"
            style={{
              color: hovered ? "var(--sage)" : "var(--ink)",
              transition: `color 300ms ${EXPO}`,
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            {item.value}
          </p>
          <p className="mt-1 text-xs" style={{ color: "var(--ink-dim)" }}>
            {item.subtitle}
          </p>
        </div>

        {/* Diagonal arrow — always visible on touch, slides in on hover for mouse */}
        <div
          className="absolute bottom-5 right-5 sm:bottom-8 sm:right-8"
          style={{
            opacity: hovered || isTouch ? 1 : 0,
            transform: hovered || isTouch ? "translate(0, 0)" : "translate(-5px, 5px)",
            transition: `opacity 250ms ${EXPO}, transform 250ms ${EXPO}`,
            color: isTouch ? "var(--sage-dim)" : "var(--sage)",
          }}
          aria-hidden
        >
          <ArrowDiagIcon />
        </div>
      </a>
    </div>
  );
}
