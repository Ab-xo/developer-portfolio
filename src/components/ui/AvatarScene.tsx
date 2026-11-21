export function AvatarScene() {
  return (
    <div
      role="img"
      aria-label="Portrait of Abraham Gebeyehu"
      className="relative aspect-square w-full"
    >
      <div
        aria-hidden="true"
        className="absolute inset-[10%] rounded-full bg-[radial-gradient(ellipse,rgba(83,224,194,0.16),rgba(83,224,194,0.04)_48%,transparent_76%)] blur-xl"
      />
      <img
        src="/avatar.png"
        alt=""
        aria-hidden="true"
        width="700"
        height="700"
        fetchPriority="high"
        className="hero-portrait-image relative h-full w-full object-contain"
      />
    </div>
  )
}
