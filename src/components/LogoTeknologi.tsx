import * as React from "react";

interface LogoProps {
  className?: string;
}

export function LogoNextjs({ className = "w-6 h-6" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 180 180" fill="none">
      <mask height="180" id="mask0_next" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style={{ maskType: "alpha" }}>
        <circle cx="90" cy="90" fill="black" r="90" />
      </mask>
      <g mask="url(#mask0_next)">
        <circle cx="90" cy="90" data-framer-name="Outer" fill="black" r="90" />
        <path d="M149.508 157.1L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 159.997 149.508 157.1Z" fill="white" />
        <rect fill="white" height="72" width="12" x="115" y="54" />
      </g>
    </svg>
  );
}

export function LogoTypescript({ className = "w-6 h-6" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#3178C6" />
      <path d="M12.5 13.5H15C15.8 13.5 16.5 14.2 16.5 15C16.5 15.8 15.8 16.5 15 16.5H12.5V13.5Z" fill="white" />
      <path d="M11.5 8H5.5V10H7.5V17H9.5V10H11.5V8Z" fill="white" />
      <path d="M13.5 17H11.5V8H15C16.7 8 18 9.3 18 11C18 12.3 17.2 13.4 16 13.8V17H13.5Z" fill="white" />
    </svg>
  );
}

export function LogoReact({ className = "w-6 h-6" }: LogoProps) {
  return (
    <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" fill="none">
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

export function LogoTailwind({ className = "w-6 h-6" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" fill="#38BDF8" />
    </svg>
  );
}

export function LogoNodejs({ className = "w-6 h-6" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <path d="M16 2L3 9.5V24.5L16 32L29 24.5V9.5L16 2Z" fill="#5FA04E" />
      <path d="M16 4.5L5.5 10.5V22.5L16 28.5L26.5 22.5V10.5L16 4.5Z" fill="#333333" />
      <path d="M16 8L22 11.5V18.5L16 22L10 18.5V11.5L16 8Z" fill="#5FA04E" />
    </svg>
  );
}

export function LogoPrisma({ className = "w-6 h-6" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M21.2 18.8L13.7 2.4C13.4 1.8 12.6 1.8 12.3 2.4L2.8 18.8C2.5 19.3 2.9 20 3.5 20H20.5C21.1 20 21.5 19.3 21.2 18.8ZM12 6.5L17.5 18H6.5L12 6.5Z" fill="#2D3748" className="dark:fill-slate-100" />
      <path d="M12 6.5L6.5 18H17.5L12 6.5Z" fill="#5A67D8" />
    </svg>
  );
}

export function LogoNginx({ className = "w-6 h-6" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L2 7.8V16.2L12 22L22 16.2V7.8L12 2Z" fill="#009639" />
      <path d="M8 8V16L16 8V16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LogoDocker({ className = "w-6 h-6" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M13 8.5H15V10.5H13V8.5ZM10 8.5H12V10.5H10V8.5ZM7 8.5H9V10.5H7V8.5ZM10 6H12V8H10V6ZM13 6H15V8H13V6ZM16 8.5H18V10.5H16V8.5ZM4 11H20C20 15 17 18 12 18C7 18 4 15 4 11Z" fill="#2496ED" />
    </svg>
  );
}

export function LogoFigma({ className = "w-6 h-6" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect x="5" y="2" width="7" height="7" rx="3.5" fill="#F24E1E" />
      <rect x="12" y="2" width="7" height="7" rx="3.5" fill="#FF7262" />
      <rect x="5" y="9" width="7" height="7" rx="3.5" fill="#A259FF" />
      <circle cx="15.5" cy="12.5" r="3.5" fill="#1ABCFE" />
      <path d="M5 16H8.5C10.433 16 12 17.567 12 19.5C12 21.433 10.433 23 8.5 23C6.567 23 5 21.433 5 19.5V16Z" fill="#0ACF83" />
    </svg>
  );
}

export function LogoLinux({ className = "w-6 h-6" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#FCC624" />
      <circle cx="9" cy="10" r="1.5" fill="#000000" />
      <circle cx="15" cy="10" r="1.5" fill="#000000" />
      <ellipse cx="12" cy="14" rx="3" ry="1.5" fill="#E95420" />
    </svg>
  );
}

export function LogoGoogleDrive({ className = "w-6 h-6" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M8.2 4L15.8 4L22 15L14.4 15L8.2 4Z" fill="#FFC107" />
      <path d="M2 15L8.2 4L12 10.6L5.8 21.6L2 15Z" fill="#0066DA" />
      <path d="M5.8 21.6L14.4 15L22 15L13.4 21.6L5.8 21.6Z" fill="#00AC47" />
    </svg>
  );
}

export function LogoSqlite({ className = "w-6 h-6" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="4" fill="#003B57" />
      <path d="M6 8H18M6 12H18M6 16H13" stroke="#00A3E0" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function LogoZip({ className = "w-6 h-6" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect x="4" y="3" width="16" height="18" rx="3" fill="#D97706" />
      <path d="M10 6H14M10 9H14M10 12H14M11 15H13V18H11V15Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function LogoGit({ className = "w-6 h-6" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M21.7 10.7L13.3 2.3C12.9 1.9 12.3 1.9 11.9 2.3L10.3 3.9L12.5 6.1C13.2 5.9 14 6.2 14.5 6.7C15.1 7.3 15.3 8.2 15 9L17.2 11.2C18 10.9 18.9 11.1 19.5 11.7C20.3 12.5 20.3 13.8 19.5 14.6C18.7 15.4 17.4 15.4 16.6 14.6C16.1 14.1 15.8 13.3 16 12.5L13.9 10.4V15.4C14.1 15.6 14.3 15.9 14.4 16.2C14.9 17.3 14.4 18.6 13.3 19.1C12.2 19.6 10.9 19.1 10.4 18C9.9 16.9 10.4 15.6 11.5 15.1V10.1C10.4 9.6 9.9 8.3 10.4 7.2C10.7 6.5 11.3 6 12.1 5.7L9.9 3.5L2.3 11.1C1.9 11.5 1.9 12.1 2.3 12.5L10.7 20.9C11.1 21.3 11.7 21.3 12.1 20.9L21.7 11.3C22.1 10.9 22.1 11.1 21.7 10.7Z" fill="#F05032" />
    </svg>
  );
}

export function LogoSpotify({ className = "w-6 h-6" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#1DB954" />
      <path d="M17.5 10.8C14.1 8.8 8.4 8.6 5.1 9.6C4.6 9.8 4 9.5 3.9 8.9C3.7 8.4 4 7.8 4.6 7.7C8.4 6.5 14.7 6.7 18.6 9C19.1 9.3 19.3 9.9 19 10.4C18.7 10.8 18 11 17.5 10.8ZM17.3 13.7C17.1 14.1 16.6 14.2 16.2 14C13.4 12.3 9.2 11.8 6 12.8C5.5 12.9 5.1 12.7 4.9 12.2C4.8 11.8 5 11.3 5.5 11.2C9.2 10.1 13.8 10.6 17 12.6C17.4 12.8 17.5 13.3 17.3 13.7ZM16.1 16.6C15.9 16.9 15.5 17 15.2 16.8C12.9 15.4 9.9 15.1 6.3 15.9C5.9 16 5.6 15.8 5.5 15.4C5.4 15 5.6 14.7 6 14.6C9.9 13.7 13.3 14.1 15.8 15.6C16.2 15.9 16.3 16.3 16.1 16.6Z" fill="white" />
    </svg>
  );
}

export function LogoGoogle({ className = "w-6 h-6" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
    </svg>
  );
}

export function LogoSlack({ className = "w-6 h-6" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M6 15a2 2 0 0 1-2-2 2 2 0 0 1 2-2h2v2a2 2 0 0 1-2 2z" fill="#E01E5A" />
      <path d="M9 15a2 2 0 0 1 2-2 2 2 0 0 1 2 2v5a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-5z" fill="#E01E5A" />
      <path d="M9 6a2 2 0 0 1 2-2 2 2 0 0 1 2 2v2H9V6z" fill="#36C5F0" />
      <path d="M9 9a2 2 0 0 1 2-2 2 2 0 0 1 2 2v2H9V9z" fill="#36C5F0" />
      <path d="M18 9a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-2V9h2z" fill="#2EB67D" />
      <path d="M15 9a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2 2 2 0 0 1 2 2v5z" fill="#2EB67D" />
      <path d="M15 18a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-2h2v2z" fill="#ECB22E" />
      <path d="M15 15a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-2h2v2z" fill="#ECB22E" />
    </svg>
  );
}

export function LogoNotion({ className = "w-6 h-6" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#000000" />
      <path d="M6 7.5L8.5 7L17 6.5L18 8.5V17L15 17.5L7 18L6 16.5V7.5Z" fill="white" />
      <path d="M8.5 8.5V15.5L11 16V9L8.5 8.5ZM13 9.5V16.5L15.5 16V9L13 9.5Z" fill="#000000" />
    </svg>
  );
}

export function LogoDiscord({ className = "w-6 h-6" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="5" fill="#5865F2" />
      <path d="M17.5 6.5C16.3 5.9 15 5.5 13.6 5.3C13.4 5.7 13.2 6.1 13 6.6C11.5 6.4 10 6.4 8.5 6.6C8.3 6.1 8.1 5.7 7.9 5.3C6.5 5.5 5.2 5.9 4 6.5C1.8 9.9 1.2 13.2 1.5 16.5C3.3 17.8 5 18.7 6.6 19.2C7 18.6 7.4 18 7.7 17.3C7.1 17.1 6.5 16.8 6 16.4C6.1 16.3 6.3 16.2 6.4 16C9.6 17.5 13.1 17.5 16.3 16C16.4 16.2 16.6 16.3 16.7 16.4C16.2 16.8 15.6 17.1 15 17.3C15.3 18 15.7 18.6 16.1 19.2C17.7 18.7 19.4 17.8 21.2 16.5C21.6 12.6 20.3 9.3 17.5 6.5ZM8.5 14.3C7.6 14.3 6.8 13.4 6.8 12.4C6.8 11.4 7.5 10.5 8.5 10.5C9.5 10.5 10.2 11.4 10.2 12.4C10.2 13.4 9.5 14.3 8.5 14.3ZM14.2 14.3C13.3 14.3 12.5 13.4 12.5 12.4C12.5 11.4 13.2 10.5 14.2 10.5C15.2 10.5 15.9 11.4 15.9 12.4C15.9 13.4 15.2 14.3 14.2 14.3Z" fill="white" />
    </svg>
  );
}

export function LogoDropbox({ className = "w-6 h-6" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="5" fill="#0061FF" />
      <path d="M7 6L12 9.5L7 13L2 9.5L7 6ZM17 6L22 9.5L17 13L12 9.5L17 6ZM2 13L7 16.5L12 13L7 9.5L2 13ZM17 13L22 9.5L17 6L12 9.5L17 13ZM7 17.5L12 21L17 17.5L12 14.2L7 17.5Z" fill="white" />
    </svg>
  );
}

export function LogoGitlab({ className = "w-6 h-6" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M22.65 14.39L20.64 8.21C20.5 7.79 19.92 7.79 19.78 8.21L18.42 12.4H5.58L4.22 8.21C4.08 7.79 3.5 7.79 3.36 8.21L1.35 14.39C1.22 14.8 1.37 15.25 1.71 15.5L12 23L22.29 15.5C22.63 15.25 22.78 14.8 22.65 14.39Z" fill="#E24329" />
      <path d="M12 23L18.42 12.4H5.58L12 23Z" fill="#E24329" />
      <path d="M12 23L5.58 12.4H1.35L12 23Z" fill="#FC6D26" />
      <path d="M12 23L18.42 12.4H22.65L12 23Z" fill="#FC6D26" />
      <path d="M1.35 14.39L4.22 8.21L5.58 12.4L1.35 14.39Z" fill="#FCA326" />
      <path d="M22.65 14.39L19.78 8.21L18.42 12.4L22.65 14.39Z" fill="#FCA326" />
    </svg>
  );
}

export function LogoShopify({ className = "w-6 h-6" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M19.5 5.5L17.5 3L14.5 3.5L14 2L10 3L9 5L5.5 6L2.5 19L15 22L21.5 18.5L19.5 5.5Z" fill="#95BF47" />
      <path d="M14 6.5L11 8.5V17L16 15.5L14 6.5Z" fill="#5E8E3E" />
      <path d="M14 6.5L11 8.5L12.5 13L14 6.5Z" fill="white" />
    </svg>
  );
}

export function LogoLinear({ className = "w-6 h-6" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="5" fill="#5E6AD2" />
      <path d="M5.5 18.5L18.5 5.5M5.5 14.5L14.5 5.5M5.5 10.5L10.5 5.5M9.5 18.5L18.5 9.5M13.5 18.5L18.5 13.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function LogoFacebook({ className = "w-6 h-6" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#1877F2" />
      <path d="M13.5 19V12.5H15.5L16 10H13.5V8.5C13.5 7.8 13.8 7.3 15 7.3H16.2V5.1C15.6 5 14.8 5 14 5C11.8 5 10.5 6.3 10.5 8.7V10H8.5V12.5H10.5V19H13.5Z" fill="white" />
    </svg>
  );
}

export function LogoSketch({ className = "w-6 h-6" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M6 3L2 9L12 21L22 9L18 3H6Z" fill="#FDB300" />
      <path d="M6 3L12 9L18 3M2 9H22M12 9V21" stroke="#EA6C00" strokeWidth="1.5" />
    </svg>
  );
}

export function LogoVercel({ className = "w-6 h-6" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L22 19.5H2L12 2Z" fill="#000000" className="dark:fill-white" />
    </svg>
  );
}

export function LogoSupabase({ className = "w-6 h-6" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M13.5 2L3 14.5H11.5L10.5 22L21 9.5H12.5L13.5 2Z" fill="#3ECF8E" />
    </svg>
  );
}

export function LogoProductHunt({ className = "w-6 h-6" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#DA552F" />
      <path d="M10.5 8H13.5C14.88 8 16 9.12 16 10.5C16 11.88 14.88 13 13.5 13H10.5V16H8.5V8H10.5ZM10.5 10V11H13.5C13.78 11 14 10.78 14 10.5C14 10.22 13.78 10 13.5 10H10.5Z" fill="white" />
    </svg>
  );
}

export function LogoBrave({ className = "w-6 h-6" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L4 6V11C4 16.5 7.5 21.2 12 22C16.5 21.2 20 16.5 20 11V6L12 2Z" fill="#FB542B" />
      <path d="M12 6L8 9V14L12 18L16 14V9L12 6Z" fill="#FF1B2D" />
    </svg>
  );
}

export function LogoGatsby({ className = "w-6 h-6" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#663399" />
      <path d="M19 12A7 7 0 1 1 12 5C14.5 5 16.7 6.3 17.9 8.3L16.2 9.5C15.3 7.8 13.7 6.8 12 6.8A5.2 5.2 0 1 0 17.2 12H12.5V13.8H19Z" fill="white" />
    </svg>
  );
}

export function LogoAstro({ className = "w-6 h-6" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M8.5 17.5L12 4.5L15.5 17.5M9.8 13.5H14.2" stroke="#FF5D01" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="18" r="2" fill="#BC52EE" />
    </svg>
  );
}

export function LogoXTwitter({ className = "w-6 h-6" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#000000" />
      <path d="M17.5 6H15.2L11.8 10.6L8 6H5L10.2 12.3L5 18H7.3L11 13.2L15 18H18L12.6 11.5L17.5 6ZM8.2 7.2H9.6L15 16.8H13.6L8.2 7.2Z" fill="white" />
    </svg>
  );
}
