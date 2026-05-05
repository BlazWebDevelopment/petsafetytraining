export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label="Pet Safety Training"
      className={className}
    >
      <rect
        x="2"
        y="2"
        width="60"
        height="60"
        fill="#f3ead4"
        stroke="#1a1410"
        strokeWidth="3"
      />
      <rect
        x="6"
        y="6"
        width="52"
        height="52"
        fill="none"
        stroke="#1a1410"
        strokeWidth="1"
      />
      <text
        x="32"
        y="29"
        textAnchor="middle"
        fontFamily="Georgia, 'Playfair Display', serif"
        fontWeight="900"
        fontSize="18"
        fill="#1a1410"
        letterSpacing="1"
      >
        PST
      </text>
      <line x1="14" y1="36" x2="50" y2="36" stroke="#1a1410" strokeWidth="1" />
      <text
        x="32"
        y="49"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontWeight="700"
        fontSize="7"
        fill="#8a1c1c"
        letterSpacing="2.5"
      >
        EST · MMXXVI
      </text>
    </svg>
  )
}
