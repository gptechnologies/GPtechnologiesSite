// Adapted from public/chainideas_still_isometric FINAL.svg.
// The website supplies the figure heading, background, and footer.
export function ChainIdeasScene() {
  return <g className="chainideas-artwork">
    <g id="chainideas-connection-lines" fill="none" strokeWidth="1.7" strokeDasharray="5 8" strokeLinecap="round">
      <path id="chainideas-solana-route" d="M134 156 C164 155 172 183 213 187" stroke="#a4aa93" />
      <path id="chainideas-robinhood-route" d="M134 277 C165 276 179 242 213 235" stroke="#c8ab89" />
      <path id="chainideas-qualified-route" d="M332 211 C364 210 382 211 400 211" stroke="#b6a28a" />
    </g>
    <g id="chainideas-sources">
      <g id="chainideas-solana-source" className="ci-outline">
        <path d="M40 133V177C40 194 134 194 134 177V133" fill="#e5e1d6" />
        <ellipse cx="87" cy="133" rx="47" ry="17" fill="#d9e5d4" />
        <ellipse cx="87" cy="133" rx="34" ry="10" fill="none" stroke="#b2c1a6" />
        <path d="M79 127h24l-5 4H74zM77 135h24l-5 4H72z" fill="#849b82" stroke="none" />
      </g>
      <text className="ci-mono" x="87" y="109" fontSize="11" textAnchor="middle">SOLANA</text>
      <g id="chainideas-robinhood-source" className="ci-outline">
        <path d="M40 257V300C40 317 134 317 134 300V257" fill="#e5e1d6" />
        <ellipse cx="87" cy="257" rx="47" ry="17" fill="#d9e5d4" />
        <ellipse cx="87" cy="257" rx="34" ry="10" fill="none" stroke="#b2c1a6" />
        <path d="M78 264L97 245l12-1-19 26-5-8 9-9z" fill="#849b82" stroke="none" />
      </g>
      <text className="ci-mono" x="87" y="333" fontSize="10.5" textAnchor="middle">ROBINHOOD CHAIN</text>
    </g>
    <g id="chainideas-incoming-tokens" className="ci-outline">
      <g id="chainideas-solana-token" className="ci-token">
        <rect x="166" y="167" width="20" height="27" rx="2" fill="#eee9df" />
        <path d="M171 176h9M171 183h9" className="ci-fine" fill="none" />
      </g>
      <g id="chainideas-robinhood-token" className="ci-token">
        <rect x="166" y="247" width="20" height="27" rx="2" fill="#eee9df" />
        <path d="M171 256h9M171 263h9" className="ci-fine" fill="none" />
      </g>
    </g>
    <g id="chainideas-output-token" className="ci-token">
      <circle cx="370" cy="211" r="13.5" fill="#f7f5ef" stroke="#bb9974" strokeWidth="1.4" />
      <circle cx="370" cy="211" r="4.3" fill="#c9926c" />
    </g>
    <g id="chainideas-engine">
      <text className="ci-mono" x="274" y="97" fontSize="11" textAnchor="middle">DISCOVERY ENGINE</text>
      <g id="chainideas-engine-body" className="ci-outline">
        <path d="M213 152L228 143L341 172L326 181Z" fill="#d8cbbb" />
        <path d="M326 181L341 172V284L326 293Z" fill="#d5c7b4" />
        <path d="M213 152L326 181V293L213 264Z" fill="#eae5da" />
      </g>
      <g id="chainideas-criteria" transform="matrix(1 .256637 0 1 213 152)">
        <circle cx="19" cy="30" r="7" className="ci-criterion-empty" />
        <circle cx="19" cy="30" r="7" className="ci-criterion-fill ci-criterion-age" />
        <text x="34" y="34" className="ci-criteria-label">Age</text>
        <circle cx="19" cy="61" r="7" className="ci-criterion-empty" />
        <circle cx="19" cy="61" r="7" className="ci-criterion-fill ci-criterion-volume" />
        <text x="34" y="65" className="ci-criteria-label">Volume</text>
        <circle cx="19" cy="92" r="7" className="ci-criterion-empty" />
        <circle cx="19" cy="92" r="7" className="ci-criterion-fill ci-criterion-liquidity" />
        <text x="34" y="96" className="ci-criteria-label">Liquidity</text>
      </g>
      <g id="chainideas-engine-side-slashes" stroke="#a89d8c" strokeWidth="2" strokeLinecap="round">
        <path d="M331 199l6-4M331 222l6-4M331 245l6-4" />
      </g>
    </g>
    <g id="chainideas-monitor">
      <text className="ci-mono" x="466" y="97" fontSize="11" textAnchor="middle">QUALIFIED PAIRS</text>
      <g id="chainideas-monitor-case" className="ci-outline">
        <path d="M399 130L411 122L524 150L512 158Z" fill="#d9cdbd" />
        <path d="M512 158L524 150V294L512 302Z" fill="#d4c5b4" />
        <path d="M399 130L512 158V302L399 274Z" fill="#f2efe8" />
        <path d="M449 288L449 322L468 327L468 293" fill="#dcd1c3" />
        <path d="M434 327L478 338L489 333L448 322Z" fill="#e7e0d6" />
      </g>
      <g id="chainideas-monitor-rows" transform="matrix(1 0.247 0 1 0 -98.5)">
        <path d="M408 169H501M408 197H501M408 225H501" stroke="#e1dbd2" strokeWidth="1" />
        <g id="chainideas-qualified-row-1" className="ci-result-row">
          <circle cx="416" cy="152" r="4.5" fill="#a5b29e" />
          <path d="M428 149h31M428 155h21" stroke="#d0c9bf" strokeWidth="3" strokeLinecap="round" />
          <g fill="#93a98f">
            <rect x="473" y="150" width="5" height="13" className="ci-bar" />
            <rect x="482" y="142" width="5" height="21" className="ci-bar" />
          </g>
          <rect x="491" y="136" width="5" height="27" fill="#c99f84" className="ci-bar" />
        </g>
        <g id="chainideas-qualified-row-2" className="ci-result-row">
          <circle cx="416" cy="180" r="4.5" fill="#a5b29e" />
          <path d="M428 177h31M428 183h21" stroke="#d0c9bf" strokeWidth="3" strokeLinecap="round" />
          <g fill="#93a98f">
            <rect x="473" y="175" width="5" height="16" className="ci-bar" />
            <rect x="482" y="169" width="5" height="22" className="ci-bar" />
          </g>
          <rect x="491" y="178" width="5" height="13" fill="#c99f84" className="ci-bar" />
        </g>
        <g id="chainideas-qualified-row-3" className="ci-result-row">
          <circle cx="416" cy="208" r="4.5" fill="#a5b29e" />
          <path d="M428 205h31M428 211h21" stroke="#d0c9bf" strokeWidth="3" strokeLinecap="round" />
          <g fill="#93a98f">
            <rect x="473" y="206" width="5" height="13" className="ci-bar" />
            <rect x="482" y="199" width="5" height="20" className="ci-bar" />
          </g>
          <rect x="491" y="195" width="5" height="24" fill="#c99f84" className="ci-bar" />
        </g>
        <g id="chainideas-qualified-row-4" className="ci-result-row">
          <circle cx="416" cy="236" r="4.5" fill="#a5b29e" />
          <path d="M428 233h31M428 239h21" stroke="#d0c9bf" strokeWidth="3" strokeLinecap="round" />
          <g fill="#93a98f">
            <rect x="473" y="235" width="5" height="12" className="ci-bar" />
            <rect x="482" y="226" width="5" height="21" className="ci-bar" />
          </g>
          <rect x="491" y="220" width="5" height="27" fill="#c99f84" className="ci-bar" />
        </g>
      </g>
    </g>
  </g>;
}
