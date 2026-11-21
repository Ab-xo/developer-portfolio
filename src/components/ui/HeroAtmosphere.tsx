export function HeroAtmosphere() {
  return (
    <div className="hero-atmosphere" aria-hidden="true">
      <svg
        className="hero-atmosphere__contours"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <defs>
          <linearGradient id="hero-contour-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#53e0c2" stopOpacity="0.28" />
            <stop offset="0.52" stopColor="#53e0c2" stopOpacity="0.92" />
            <stop offset="1" stopColor="#e6a77a" stopOpacity="0.52" />
          </linearGradient>
          <radialGradient id="hero-bloom-gradient">
            <stop stopColor="#53e0c2" stopOpacity="0.16" />
            <stop offset="0.56" stopColor="#53e0c2" stopOpacity="0.06" />
            <stop offset="1" stopColor="#53e0c2" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse
          className="hero-atmosphere__bloom"
          cx="1020"
          cy="400"
          rx="600"
          ry="440"
          fill="url(#hero-bloom-gradient)"
        />
        <g className="hero-atmosphere__ridges" fill="none" stroke="url(#hero-contour-gradient)">
          <path pathLength="100" d="M-120 590C106 536 162 380 354 388c174 8 190 190 378 178 165-10 213-228 410-221 180 6 258 174 482 105" />
          <path pathLength="100" d="M-120 626C116 568 185 416 362 421c165 4 200 191 384 177 170-13 213-221 404-214 175 6 260 170 474 102" />
          <path pathLength="100" d="M-120 664C130 601 207 452 371 454c157 2 210 191 390 176 174-15 211-213 397-207 169 6 263 167 462 99" />
          <path pathLength="100" d="M-120 702C142 636 228 490 380 489c147 0 218 191 396 175 178-17 209-206 390-199 163 6 265 163 450 96" />
          <path pathLength="100" d="M-120 740C154 671 249 528 389 524c138-3 226 190 402 174 182-18 207-198 383-192 157 6 267 160 438 93" />
          <path pathLength="100" d="M-120 778C168 705 270 566 398 558c129-8 234 189 408 173 185-19 205-190 377-184 151 5 269 156 426 90" />
          <path pathLength="100" d="M-120 816C180 740 292 604 407 593c120-12 242 187 414 172 190-17 203-181 370-177 146 4 272 153 414 86" />
        </g>
        <g className="hero-atmosphere__petals" fill="none" stroke="url(#hero-contour-gradient)">
          <path pathLength="100" d="M930 411c-115-94-141-218-66-310 94 18 174 123 161 250-8 77-46 119-95 151" />
          <path pathLength="100" d="M930 411c-24-147 47-260 164-276 59 75 55 206-24 305-48 61-101 77-156 82" />
          <path pathLength="100" d="M930 411c73-131 201-176 294-103-17 97-121 176-248 162-77-8-120-46-153-95" />
          <path pathLength="100" d="M930 411c146-24 260 47 276 164-75 59-206 55-305-24-61-48-77-101-82-156" />
        </g>
      </svg>
    </div>
  )
}
