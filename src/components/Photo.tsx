const PALETTES = [
  ['#ffe3e8', '#ffd0c2'],
  ['#e8f0e2', '#d3e4d0'],
  ['#fdeedd', '#f7dcc4'],
  ['#e6edf7', '#d3dff0'],
  ['#f6e6f2', '#e9d2e6'],
  ['#fbf0d9', '#f2e0bd'],
]

function hash(seed: string): number {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0
  return Math.abs(h)
}

/**
 * Photo in the pink frame used throughout the layout. Falls back to a
 * deterministic pastel placeholder when no `src` is supplied.
 */
export function Photo({
  seed,
  src,
  alt = '',
  className = '',
  ratio = 'aspect-[4/3]',
  frame = true,
  rounded = '',
}: {
  seed: string
  src?: string
  alt?: string
  className?: string
  ratio?: string
  /** Pink 8px picture frame. Disable for the bare sidebar portraits. */
  frame?: boolean
  /** Corner rounding applied when `frame` is false. */
  rounded?: string
}) {
  const [from, to] = PALETTES[hash(seed) % PALETTES.length]
  const rotate = (hash(seed + 'r') % 14) - 7

  const shell = frame
    ? 'thumb-frame'
    : `overflow-hidden bg-panel ${rounded || 'rounded-full'}`

  return (
    <div className={`relative w-full ${shell} ${ratio} ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(140deg, ${from}, ${to})` }}
        >
          <svg
            viewBox="0 0 100 100"
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-16 w-16 opacity-45"
            style={{ transform: `translate(-50%, -50%) rotate(${rotate}deg)` }}
          >
            <ellipse cx="50" cy="62" rx="21" ry="18" fill="#fff" />
            <ellipse cx="28" cy="36" rx="9" ry="12" fill="#fff" />
            <ellipse cx="45" cy="26" rx="9" ry="13" fill="#fff" />
            <ellipse cx="64" cy="28" rx="9" ry="12" fill="#fff" />
            <ellipse cx="78" cy="44" rx="8" ry="11" fill="#fff" />
          </svg>
        </div>
      )}
    </div>
  )
}

/** Small paw glyph used as the sidebar heading icon. */
export function PawIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <ellipse cx="50" cy="62" rx="21" ry="18" fill="#f0a8b8" />
      <ellipse cx="28" cy="36" rx="9" ry="12" fill="#f0a8b8" />
      <ellipse cx="45" cy="26" rx="9" ry="13" fill="#f0a8b8" />
      <ellipse cx="64" cy="28" rx="9" ry="12" fill="#f0a8b8" />
      <ellipse cx="78" cy="44" rx="8" ry="11" fill="#f0a8b8" />
    </svg>
  )
}
