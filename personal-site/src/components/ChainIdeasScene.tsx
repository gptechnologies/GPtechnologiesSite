// Adapted from the supplied public/chainideas_scene.svg; preserve its named vector groups.
export function ChainIdeasScene() {
  return <g className="chainideas-artwork">
    <g id="chainideas-platform">
      <path d="M30 228 L274 110 L531 234 L287 354 Z" fill="#F4F2ED" className="ci-outline" />
      <path d="M30 228 L287 354 L287 365 L30 239 Z" fill="#E0D6C5" className="ci-outline" />
      <path d="M287 354 L531 234 L531 245 L287 365 Z" fill="#D0C3AE" className="ci-outline" />
      <path d="M91 258 L336 140 M155 290 L399 171 M221 322 L466 203 M91 199 L348 323 M152 170 L408 293 M215 140 L470 264" className="ci-gridline" />
    </g>
    <g id="chainideas-source-solana">
      <path d="M73 200 V165 A38 15 0 0 1 149 165 V200 A38 15 0 0 1 73 200" fill="#E0D6C5" className="ci-outline" />
      <ellipse cx="111" cy="165" rx="38" ry="15" fill="#DDE5D6" className="ci-outline" />
      <path d="M95 158 H125 L119 163 H89 Z M95 166 H125 L119 171 H89 Z" fill="#809370" />
      <text x="111" y="192" textAnchor="middle" className="ci-label ci-small">SOLANA</text>
    </g>
    <g id="chainideas-source-robinhood">
      <path d="M73 268 V233 A38 15 0 0 1 149 233 V268 A38 15 0 0 1 73 268" fill="#E0D6C5" className="ci-outline" />
      <ellipse cx="111" cy="233" rx="38" ry="15" fill="#DDE5D6" className="ci-outline" />
      <path d="M105 224 L119 220 L127 225 L119 230 L113 237 L109 235 L115 227 L104 231 Z" fill="#809370" />
      <text x="111" y="257" textAnchor="middle" className="ci-label ci-small">ROBINHOOD</text>
      <text x="111" y="266" textAnchor="middle" className="ci-label ci-small">CHAIN</text>
    </g>
    <g id="chainideas-data-paths">
      <path id="chainideas-route-solana" d="M149 165 C176 164 184 180 216 193" stroke="#809370" strokeWidth="1.6" fill="none" className="ci-moving" />
      <path id="chainideas-route-robinhood" d="M149 237 C182 238 185 214 216 211" stroke="#BC7950" strokeWidth="1.6" fill="none" className="ci-moving" />
      <path d="M209 190 L218 194 L212 197" fill="none" stroke="#809370" strokeWidth="1.4" />
      <path d="M209 207 L218 211 L211 215" fill="none" stroke="#BC7950" strokeWidth="1.4" />
    </g>
    <g id="chainideas-token-solana" className="ci-token">
      <rect x="173" y="164" width="17" height="21" rx="3" fill="#FFFDF7" className="ci-outline" />
      <path d="M178 172 h7 M178 176 h6" className="ci-fine" />
    </g>
    <g id="chainideas-token-robinhood" className="ci-token">
      <rect x="176" y="225" width="17" height="21" rx="3" fill="#FFFDF7" className="ci-outline" />
      <path d="M181 233 h7 M181 237 h6" className="ci-fine" />
    </g>
    <g id="chainideas-discovery-engine">
      <path d="M219 193 L274 167 L343 199 L287 226 Z" fill="#F0E8DC" className="ci-outline" />
      <path d="M219 193 L287 226 V285 L219 251 Z" fill="#ECE5D8" className="ci-outline" />
      <path d="M287 226 L343 199 V259 L287 285 Z" fill="#D0C3AE" className="ci-outline" />
      <circle cx="229" cy="215" r="3" fill="#809370" />
      <circle cx="229" cy="229" r="3" fill="#BC7950" />
      <g transform="matrix(1 .5 0 1 241 212)">
        <text className="ci-label ci-small ci-engine-label">DISCOVERY</text>
        <text y="12" className="ci-label ci-small ci-engine-label">ENGINE</text>
      </g>
      <path d="M299 237 l32 -15 M299 245 l25 -12 M299 253 l29 -14" className="ci-fine" />
      <g id="chainideas-scan-indicator">
        <path d="M256 182 L256 150 Q256 146 260 146 H290 Q294 146 294 150 V184" fill="#FFFDF7" className="ci-outline" />
        <g className="ci-scan-symbol">
          <circle cx="275" cy="165" r="8" fill="none" stroke="#809370" strokeWidth="2" />
          <path d="M281 171 l7 7" stroke="#809370" strokeWidth="2" strokeLinecap="round" />
        </g>
      </g>
    </g>
    <g id="chainideas-output-route">
      <path d="M344 230 C364 228 370 229 393 233" stroke="#BC7950" strokeWidth="1.7" fill="none" className="ci-moving" />
      <path d="M387 229 l8 4 -8 4" fill="none" stroke="#BC7950" strokeWidth="1.4" />
    </g>
    <g id="chainideas-token-qualified" className="ci-token">
      <circle cx="372" cy="229" r="10" fill="#FFFDF7" className="ci-outline" />
      <circle cx="372" cy="229" r="4" fill="#BC7950" />
    </g>
    <g id="chainideas-qualified-pairs">
      <path d="M392 175 L500 191 L500 275 L392 259 Z" fill="#D0C3AE" transform="translate(5 -4)" className="ci-outline" />
      <path d="M392 175 L500 191 V275 L392 259 Z" fill="#FFFDF7" className="ci-outline" />
      <path d="M392 175 L500 191 V211 L392 195 Z" fill="#ECE5D8" />
      <text x="399" y="189" className="ci-label ci-small" transform="rotate(8 399 189)">QUALIFIED PAIRS</text>
      <g id="chainideas-status-indicators" className="ci-status" fill="#809370">
        <circle cx="402" cy="207" r="3.2" />
        <circle cx="402" cy="225" r="3.2" />
        <circle cx="402" cy="243" r="3.2" />
      </g>
      <g id="chainideas-dashboard-rows" className="ci-fine">
        <path d="M410 208 l30 4 M410 214 l22 3 M410 226 l30 4 M410 232 l20 3 M410 244 l30 4 M410 250 l23 3" />
      </g>
      <g id="chainideas-chart-bars" fill="#809370">
        <rect className="ci-bar" x="451" y="212" width="3.5" height="8" />
        <rect className="ci-bar" x="457" y="208" width="3.5" height="13" fill="#BC7950" />
        <rect className="ci-bar" x="463" y="214" width="3.5" height="8" />
        <rect className="ci-bar" x="469" y="210" width="3.5" height="13" />
        <rect className="ci-bar" x="451" y="231" width="3.5" height="8" />
        <rect className="ci-bar" x="457" y="228" width="3.5" height="11" />
        <rect className="ci-bar" x="463" y="232" width="3.5" height="8" fill="#BC7950" />
        <rect className="ci-bar" x="469" y="225" width="3.5" height="14" />
        <rect className="ci-bar" x="451" y="249" width="3.5" height="8" />
        <rect className="ci-bar" x="457" y="247" width="3.5" height="10" />
        <rect className="ci-bar" x="463" y="250" width="3.5" height="8" />
        <rect className="ci-bar" x="469" y="245" width="3.5" height="13" fill="#BC7950" />
      </g>
      <path d="M443 265 L443 279 L457 282 L457 268" fill="#E0D6C5" className="ci-outline" />
      <path d="M431 280 L456 285 L471 279 L448 275 Z" fill="#D0C3AE" className="ci-outline" />
    </g>
  </g>;
}
