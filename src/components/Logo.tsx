export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label="Pet Safety Training"
      className={className}
    >
      <defs>
        <linearGradient id="pst-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22c55e" />
          <stop offset="0.5" stopColor="#38bdf8" />
          <stop offset="1" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      <path
        fill="url(#pst-g)"
        d="M32 6c14.36 0 26 11.64 26 26S46.36 58 32 58 6 46.36 6 32 17.64 6 32 6Z"
      />
      <path
        fill="rgba(2,6,23,0.9)"
        d="M26.8 25.2c-2.5-3.2-7.2-3-9.1.4-1.4 2.4-.7 5.5 1.6 7.1 2 1.4 4.6 1.3 6.5-.2 1.4-1.2 2.2-3 1-4.8Zm19.5.4c-1.9-3.4-6.6-3.6-9.1-.4-1.2 1.8-.4 3.6 1 4.8 1.9 1.5 4.5 1.6 6.5.2 2.3-1.6 3-4.7 1.6-7.1ZM24 37.2c0-4.2 3.6-7.6 8-7.6s8 3.4 8 7.6c0 6.2-6.1 10.8-8 11.8-1.9-1-8-5.6-8-11.8Z"
      />
      <path
        fill="rgba(2,6,23,0.9)"
        d="M30.6 37.2c0-1.1.9-2 2-2s2 .9 2 2c0 2.7-2.8 5.1-4 5.9-1.2-.8-4-3.2-4-5.9 0-1.1.9-2 2-2s2 .9 2 2Z"
        opacity="0.6"
      />
    </svg>
  )
}

