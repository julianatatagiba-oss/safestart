export function AppIcon({ size = 256 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="tileBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="starGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="100%" stopColor="#ede9fe" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="1024" height="1024" rx="230" ry="230" fill="url(#tileBg)" />
      <rect x="0" y="0" width="1024" height="512" rx="230" ry="230" fill="white" fillOpacity="0.06" />
      <path
        d="M 512,168 L 604,420 L 856,512 L 604,604 L 512,856 L 420,604 L 168,512 L 420,420 Z"
        fill="url(#starGlow)"
      />
      <circle cx="512" cy="512" r="68" fill="#F59E0B" />
      <circle cx="512" cy="512" r="26" fill="white" fillOpacity="0.9" />
    </svg>
  )
}
