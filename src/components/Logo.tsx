import Image from 'next/image'

export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/Logo.jpg"
      alt="Pets Safety Training logo featuring a cartoon puppy with a safety shield and paw prints"
      width={400}
      height={400}
      className={['shrink-0 object-contain', className].filter(Boolean).join(' ')}
      sizes="44px"
      priority
    />
  )
}
