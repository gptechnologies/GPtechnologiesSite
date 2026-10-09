import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import type { Project } from '../data/projects';

const delay = (seconds: number): CSSProperties => ({ animationDelay: seconds + 's' });

function Platform() {
  return (
    <g className="platform">
      <path d="M65 289 280 182 495 289 280 396Z" className="platform-top" />
      <path d="m65 289 215 107 215-107v10L280 406 65 299Z" className="platform-edge" />
      <path d="m118 315 215-107m-161 134 214-107m-161 134 214-107M118 263l215 107M172 236l214 107M225 209l214 107" className="grid-line" />
    </g>
  );
}

function Box({ x, y, width = 60, depth = 36, height = 50, children }: {
  x: number; y: number; width?: number; depth?: number; height?: number; children?: ReactNode;
}) {
  const a = x + width; const b = y + width / 2;
  const c = a - depth; const d = b + depth / 2;
  const e = x - depth; const f = y + depth / 2;
  return (
    <g>
      <polygon points={[x, y, a, b, c, d, e, f].join(' ')} className="box-top" />
      <polygon points={[e, f, c, d, c, d + height, e, f + height].join(' ')} className="box-front" />
      <polygon points={[a, b, c, d, c, d + height, a, b + height].join(' ')} className="box-side" />
      {children}
    </g>
  );
}

function Check({ x, y, className = '' }: { x: number; y: number; className?: string }) {
  return <g transform={'translate(' + x + ' ' + y + ')'}><g className={className}>
    <circle r="12" className="check-disc" /><path d="m-5 0 3.5 4 7-8" className="check-mark" />
  </g></g>;
}

function Paper({ x, y, title, className = '', children }: {
  x: number; y: number; title: string; className?: string; children?: ReactNode;
}) {
  return <g transform={'translate(' + x + ' ' + y + ')'}>
    <g className={className}>
      <path d="m4 5 86 0v116H4Z" className="paper-shadow" />
      <path d="M0 0h70l16 16v100H0Z" className="paper" />
      <path d="M70 0v16h16" className="fine-line" />
      <text x="12" y="34" className="svg-title" style={title.length > 10 ? { fontSize: 8 } : undefined}>{title}</text>
      <path d="M12 48h58M12 57h42M12 72h58M12 81h50M12 90h40" className="paper-lines" />
      {children}
    </g>
  </g>;
}

function Token({ x, y, label, className = '', seconds = 0 }: {
  x: number; y: number; label: string; className?: string; seconds?: number;
}) {
  return <g transform={'translate(' + x + ' ' + y + ')'}><g className={className} style={delay(seconds)}>
    <circle r="14" className="token" /><text y="3" textAnchor="middle" className="token-label">{label}</text>
  </g></g>;
}

function ScannerScene() {
  return <>
    <Platform />
    <g className="pool">
      <path d="M150 227v28c0 12 64 12 64 0v-28" className="pool-wall" />
      <ellipse cx="182" cy="227" rx="32" ry="12" className="pool-water" />
      <ellipse cx="182" cy="227" rx="22" ry="7" className="pool-ring breathe" />
      <path d="M125 268v28c0 12 64 12 64 0v-28" className="pool-wall" />
      <ellipse cx="157" cy="268" rx="32" ry="12" className="pool-water" />
      <ellipse cx="157" cy="268" rx="22" ry="7" className="pool-ring breathe" style={delay(-2)} />
      <text x="158" y="208" className="svg-label">SOLANA</text>
      <text x="106" y="325" className="svg-label">ROBINHOOD</text>
    </g>
    <path d="M214 227 262 196 326 227 376 219M186 269 262 231 326 227" className="flow-line" />
    <g transform="translate(244 118)">
      <path d="m0 0 38 19v111L0 111Z" className="filter-back" />
      <path d="m0 0 8-4 38 19-8 4m0 0 8-4v111l-8 4" className="box-side" />
      <path d="m11 33 16 8m-16 11 16 8m-16 11 16 8" className="filter-slots" />
      <circle cx="19" cy="94" r="3" className="warm-light breathe" />
    </g>
    <g transform="translate(311 152)">
      <path d="m0 0 30 15v91L0 91Z" className="filter-back" />
      <path d="m0 0 7-4 30 15-7 4m0 0 7-4v91l-7 4" className="box-side" />
      <path d="m8 27 14 7m-14 10 14 7" className="filter-slots" />
      <circle cx="15" cy="75" r="3" className="green-light breathe" style={delay(-2)} />
    </g>
    <Token x={214} y={227} label="A" className="pair-one" />
    <Token x={186} y={269} label="B" className="pair-two" seconds={-3} />
    <path d="M422 232v43m-16 6 16-8 16 8-16 8Z" className="monitor-stand" />
    <g transform="translate(376 168)">
      <g className="alert-card">
        <rect width="98" height="64" rx="5" className="paper" />
        <circle cx="15" cy="17" r="3" className="green-light" />
        <text x="25" y="20" className="svg-title">MATCH FOUND</text>
        <path d="M13 34h70M13 43h44" className="paper-lines" />
        <path d="m69 52 5-5 5 2 7-9" className="accent-line" />
      </g>
    </g>
    <text x="234" y="312" className="svg-label">SCREENING CRITERIA</text>
  </>;
}

function EscrowCoin({ x, y, className }: { x: number; y: number; className: string }) {
  return <g transform={'translate(' + x + ' ' + y + ')'}><g className={className}>
    <ellipse cx="2" rx="9" ry="11" className="crow-coin-edge" />
    <ellipse rx="9" ry="11" className="crow-coin-face" />
    <text y="3.5" textAnchor="middle" className="crow-coin-symbol">$</text>
  </g></g>;
}

function EscrowScene() {
  return <>
    <g transform="translate(280 300) scale(1.16 1.06) translate(-280 -289)">
      <Platform />
    </g>

    <path d="M180 260 218 270M364 269 398 261M280 103v41" className="flow-line" />

    <g transform="translate(108 226)">
      <path d="m0 0 58 12v52L0 52Z" className="wallet" />
      <path d="m38 28 26 5v20l-26-5Z" className="wallet-flap" />
      <circle cx="49" cy="39" r="2" className="warm-light" />
      <text x="31" y="81" textAnchor="middle" className="crow-role">BUYER</text>
      <text x="31" y="94" textAnchor="middle" className="crow-role-note crow-wallet-note">Funds escrow</text>
    </g>

    <g transform="translate(397 229)">
      <path d="m0 0 58 12v52L0 52Z" className="wallet" />
      <path d="m38 28 26 5v20l-26-5Z" className="wallet-flap" />
      <circle cx="49" cy="39" r="2" className="warm-light" />
      <text x="31" y="81" textAnchor="middle" className="crow-role">PROVIDER</text>
      <text x="31" y="94" textAnchor="middle" className="crow-role-note crow-wallet-note">Creates terms</text>
    </g>

    <g>
      <path d="M218 158 240 144 364 162 342 176Z" className="box-top" />
      <path d="M218 158 342 176v136l-124-18Z" className="crow-contract-front" />
      <path d="M342 176 364 162v136l-22 14Z" className="box-side" />
      <path d="m265 158 32 5 13-7-32-5Z" className="vault-slot" />
      <g transform="matrix(1 .145 0 1 226 173)">
        <text y="10" className="crow-contract-label">ESCROW CONTRACT</text>
        <text y="35" className="crow-amount">$250</text>
        <rect x="-2" y="40" width="94" height="16" rx="2" className="crow-date-highlight" />
        <text y="51" className="crow-date">31 OCT 2026</text>
        <g className="crow-terms">
          <path d="m1 64 7-3 7 4 5-3 12 2 5-4 11 4 11-2 6 3 15-3 13 2M1 72l8 2 6-3 11 4 9-3 11 2 7-4 9 4 9-2 8 3M1 80l8-3 6 4 7-2 14 2 8-3 12 2" className="crow-terms-script" />
        </g>
        <text y="99" className="crow-balance-label">FUNDS HELD</text>
        <rect y="105" width="106" height="7" rx="2" className="crow-funding-track" />
        <rect y="105" width="106" height="7" rx="2" className="crow-funding-gold" />
        <rect y="105" width="106" height="7" rx="2" className="crow-funding-green" />
      </g>
      <circle cx="353" cy="284" r="3" className="crow-release-light" />
    </g>

    <g transform="translate(385 225)">
      <g className="crow-terms-transfer">
        <rect x="-8" y="-10" width="16" height="21" rx="2" className="paper" />
        <path d="M-4-4h8M-4 0h6M-4 4h8" className="fine-line" />
      </g>
    </g>

    <EscrowCoin x={181} y={260} className="crow-deposit crow-deposit-one" />
    <EscrowCoin x={181} y={260} className="crow-deposit crow-deposit-two" />
    <EscrowCoin x={181} y={260} className="crow-deposit crow-deposit-three" />
    <Check x={395} y={222} className="crow-provider-check" />
    <Check x={449} y={217} className="crow-provider-approved" />

    <g>
      <text x="280" y="27" textAnchor="middle" className="crow-role">ARBITRATOR</text>
      <rect x="246" y="38" width="68" height="54" rx="5" className="paper" />
      <path d="M255 53h19M255 59h12" className="paper-lines" />
      <path d="m280 70 10-8 4 10 7-9 3 7M280 79h23" className="crow-arbitrator-approved crow-signature-script" />
      <text x="280" y="107" textAnchor="middle" className="crow-role-note">Signs at settlement</text>
    </g>

    <g transform="translate(280 112)">
      <g className="crow-signature-transfer">
        <circle r="13" className="crow-signature-disc" />
        <path d="m-7 3 6-9 2 11 5-7 2 5M-7 8h14" className="crow-signature-script" />
      </g>
    </g>

    <EscrowCoin x={367} y={269} className="crow-release crow-release-one" />
    <EscrowCoin x={367} y={269} className="crow-release crow-release-two" />
    <EscrowCoin x={367} y={269} className="crow-release crow-release-three" />

    <g transform="translate(280 366)">
      <rect x="-102" y="-17" width="204" height="29" rx="5" className="crow-status-card" />
      <g className="crow-phase-created"><text textAnchor="middle" className="crow-status-text">Terms created</text></g>
      <g className="crow-phase-funded"><text textAnchor="middle" className="crow-status-text">Escrow funded</text></g>
      <g className="crow-phase-accepted"><text textAnchor="middle" className="crow-status-text">Funded · terms accepted</text></g>
      <g className="crow-phase-due"><text textAnchor="middle" className="crow-status-text">Settlement date reached</text></g>
      <g className="crow-phase-released">
        <rect x="-102" y="-17" width="204" height="29" rx="5" className="crow-released-card" />
        <text textAnchor="middle" className="crow-status-text crow-released-text">Funds released</text>
      </g>
    </g>
  </>;
}

function ChartScene() {
  return <>
    <Platform />
    <g transform="matrix(1 .28 0 1 118 56)">
      <rect x="6" y="5" width="304" height="199" rx="5" className="monitor-edge" />
      <rect width="304" height="199" rx="5" className="monitor" />
      <text x="20" y="26" className="svg-title">NON-COMMERCIAL POSITIONS</text>
      <circle cx="281" cy="22" r="3" className="green-light breathe" />
      <path d="M28 50v119h251M28 80h251M28 110h251M28 140h251M78 50v119M128 50v119M178 50v119M228 50v119" className="chart-grid" />
      <g className="chart-reveal">
        <path d="m28 132 22-10 21 6 23-34 20 10 24-30 22 11 20-21 23 5 22-22 22 10 32-20" className="chart-long" />
        <path d="m28 100 22 9 21-13 23 25 20-7 24 26 22-12 20 21 23-7 22 14 22-7 32 14" className="chart-short" />
      </g>
      <path d="M18 185h30" className="chart-long" /><text x="56" y="188" className="svg-label">LONG</text>
      <path d="M125 185h30" className="chart-short" /><text x="163" y="188" className="svg-label">SHORT</text>
      <path d="M40 48v123" className="chart-cursor" />
    </g>
    <path d="m260 301 0 20 50 15 0-19" className="monitor-stand" />
    <path d="m260 321-35 18 50 25 35-18Z" className="box-top" />
    <g transform="translate(350 241) rotate(12) scale(.7)"><Paper x={0} y={0} title="CFTC" /><path d="M12 99h55" className="accent-line" /></g>
  </>;
}

function PropertyScene() {
  return <>
    <Platform />
    <g transform="translate(167 144)">
      <path d="M-52 42-19-22 15 75v78l-67-34Z" className="house-front" />
      <path d="m15 75 64-32v78l-64 32Z" className="house-side" />
      <path d="M-65 45-19-39 28 70l-9 4-38-94-39 69Z" className="roof-front" />
      <path d="M-19-39 43-70 90 39 28 70Z" className="roof-back" />
      <path d="m-25 93 22 11v34l-22-11Z" className="house-door" />
      <path d="m36 80 21-10v24l-21 10Z" className="house-window" />
      <path d="m-42 67 15 8v20l-15-8Z" className="house-window" />
      <path d="m54-49 0-23 15 7v35" className="chimney" />
    </g>
    <path d="M236 237 291 265 335 243" className="flow-line" />
    <g transform="translate(332 143) rotate(8)">
      <Paper x={0} y={0} title="AGREEMENT">
        <path d="M12 48h58M12 57h42M12 72h58M12 81h50" className="filled-fields" />
        <path d="m14 101 10-5 5 6 9-8 8 7 4-4" className="signature" />
      </Paper>
      <Check x={70} y={101} className="document-check" />
    </g>
    <g className="property-packet"><rect x="230" y="232" width="12" height="9" rx="2" className="packet" /></g>
  </>;
}

function AuditScene() {
  return <>
    <Platform />
    <g transform="translate(120 151) rotate(-8)">
      <Paper x={0} y={0} title="STATEMENT" />
      <path d="M14 65h56M42 42v52" className="fine-line" />
      <text x="12" y="109" className="svg-title" style={{ fontSize: 6.5 }}>FORMATTING</text>
    </g>
    <g transform="translate(234 114)">
      <Paper x={0} y={0} title="CAPITAL CALL" />
      <rect x="7" y="64" width="72" height="17" rx="2" className="audit-flag" />
      <path d="M7 42h72" className="scan-beam" />
      <text x="12" y="109" className="svg-title" style={{ fontSize: 6.5 }}>FOOTING</text>
      <Check x={70} y={101} className="audit-check" />
    </g>
    <g transform="translate(346 150) rotate(8)">
      <Paper x={0} y={0} title="NOTICE" />
      <text x="12" y="109" className="svg-title" style={{ fontSize: 6.5 }}>ALIGNMENT</text>
      <Check x={70} y={101} className="audit-check" />
    </g>
  </>;
}

function VoiceScene() {
  return <>
    <Platform />
    <g transform="translate(134 141) rotate(-8)">
      <rect x="5" y="5" width="63" height="118" rx="10" className="monitor-edge" />
      <rect width="63" height="118" rx="10" className="phone" />
      <rect x="6" y="14" width="51" height="87" rx="3" className="phone-screen" />
      <path d="M25 8h13" className="fine-line" />
      <circle cx="32" cy="58" r="17" className="call-ring" />
      <path d="m23 48 5-3 5 8-4 3c2 5 4 7 9 9l3-4 8 5-3 5c-9 5-27-14-23-23Z" className="receiver" />
      <circle cx="32" cy="109" r="3" className="fine-line" />
    </g>
    <path d="M204 208h119" className="flow-line" />
    <g transform="translate(219 181)">
      {[12, 25, 42, 29, 55, 35, 20].map((height, index) =>
        <rect key={index} x={index * 12} y={(55 - height) / 2} width="4" height={height} rx="2" className="wave-bar" style={delay(-index * .23)} />
      )}
    </g>
    <g transform="translate(329 139) rotate(5)">
      <Paper x={0} y={0} title="CALL NOTES" />
      <path d="M12 48h58M12 57h42" className="filled-fields" />
    </g>
    <g transform="translate(300 265)">
      <rect width="118" height="59" rx="5" className="paper" />
      <path d="M0 17h118M17-5v13M101-5v13" className="fine-line" />
      <text x="12" y="38" className="svg-title">APPOINTMENT</text>
      <path d="M12 47h56" className="paper-lines" />
      <Check x={100} y={41} className="document-check" />
    </g>
  </>;
}

function ForecastScene() {
  return <>
    <Platform />
    <g transform="translate(92 179) rotate(-9) scale(.8)">
      <Paper x={0} y={0} title="CONTRACT" />
      <path d="M12 101h58" className="accent-line" />
    </g>
    <path d="M168 247 257 343 383 280" className="flow-line" />
    <g transform="matrix(1 .25 0 1 209 79)">
      <rect width="224" height="155" rx="5" className="monitor" />
      <text x="16" y="23" className="svg-title">BILLING FORECAST</text>
      <path d="M20 42v89h188M20 70h188M20 100h188" className="chart-grid" />
      {[36, 51, 46, 67, 79, 87].map((height, i) =>
        <rect key={i} x={33 + i * 28} y={129 - height} width="15" height={height} rx="1" className={'forecast-bar bar-' + i} style={delay(-i * .3)} />
      )}
      <path d="m35 99 28-18 28 4 28-26 28-14 28-6" className="forecast-line" />
    </g>
    <g>
      {[0, 1, 2, 3].map(i => <g key={i} transform={'translate(' + (235 + i * 42) + ' ' + (344 - i * 21) + ')'}>
        <path d="m0 0 26-13 20 10-26 13Z" className="schedule-tile" />
        <circle cx="22" cy="-1" r="3" className="warm-light breathe" style={delay(-i)} />
      </g>)}
    </g>
  </>;
}

function KnowledgeScene() {
  return <>
    <Platform />
    <g transform="translate(186 208)">
      <Box x={0} y={0} width={43} depth={27} height={22} />
      <Box x={0} y={-22} width={43} depth={27} height={22} />
      <Box x={0} y={-44} width={43} depth={27} height={22} />
      <path d="m-19 1 20 10m-20-32 20 10m-20 12 20 10" className="fine-line" />
      <g transform="matrix(1 .5 0 1 -19 -16)">
        <text className="svg-title" style={{ fontSize: 6, letterSpacing: 0 }}>PAST WORK</text>
      </g>
    </g>
    <g transform="translate(185 270) scale(.65)">
      <Paper x={0} y={0} title="KNOWLEDGE" />
    </g>
    <path d="M233 241 257 227M244 302 264 262M313 232 351 212" className="flow-line" />
    <g transform="translate(280 180)">
      <Box x={0} y={0} width={44} depth={44} height={52} />
      <circle cx="-16" cy="57" r="3" className="green-light breathe" />
      <circle cx="-3" cy="64" r="3" className="green-light breathe" style={delay(-1)} />
      <path d="m-23 40 29 14" className="fine-line" />
    </g>
    <Token x={233} y={241} label="•" className="knowledge-one" />
    <Token x={244} y={302} label="•" className="knowledge-two" seconds={-2} />
    <g transform="translate(351 154) rotate(5)">
      <Paper x={0} y={0} title="PROPOSAL" />
      <path d="M12 48h58M12 57h42M12 72h58M12 81h50M12 90h40" className="filled-fields" />
      <Check x={70} y={101} className="document-check" />
    </g>
  </>;
}

function BillingScene() {
  return <>
    <Platform />
    <g transform="translate(139 186) rotate(-14) scale(.72)"><Paper x={0} y={0} title="TRAVEL" /><text x="12" y="105" className="svg-title">$</text></g>
    <g transform="translate(148 239) rotate(8) scale(.65)"><Paper x={0} y={0} title="EXPENSE" /><text x="12" y="105" className="svg-title">$</text></g>
    <g transform="translate(244 146)">
      <Box x={0} y={0} width={64} depth={42} height={101} />
      <g transform="matrix(1 .5 0 1 -33 42)">
        <text y="18" className="svg-title">LEDGER</text>
        <path d="M0 32h40M0 51h40M0 70h40" className="ledger-lines" />
      </g>
    </g>
    <path d="M209 238 234 253M209 292 234 277M298 261 368 228" className="flow-line" />
    <g className="receipt-one"><rect x="204" y="228" width="12" height="16" rx="2" className="paper" /><path d="M207 234h6M207 239h4" className="fine-line" /></g>
    <g className="receipt-two"><rect x="204" y="282" width="12" height="16" rx="2" className="paper" /><path d="M207 288h6M207 293h4" className="fine-line" /></g>
    <g transform="translate(364 151) rotate(7)">
      <Paper x={0} y={0} title="INVOICE" />
      <path d="M12 79h58" className="fine-line" />
      <text x="12" y="105" className="svg-title">TOTAL</text>
      <Check x={70} y={101} className="document-check" />
    </g>
  </>;
}

const scenes: Record<string, () => ReactNode> = {
  chainideas: ScannerScene,
  crow: EscrowScene,
  cot: ChartScene,
  'purchase-offer': PropertyScene,
  audit: AuditScene,
  voicemail: VoiceScene,
  forecasting: ForecastScene,
  rfp: KnowledgeScene,
  billing: BillingScene,
};

export function ProjectScene({ project, index, paused }: { project: Project; index: number; paused: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .05 });
    if (ref.current) observer.observe(ref.current);
    const onVisibilityChange = () => setPageVisible(!document.hidden);
    onVisibilityChange();
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  const Scene = scenes[project.id];
  return (
    <figure ref={ref} className="project-figure" data-playing={visible && pageVisible && !paused}>
      <div className="figure-heading"><span>Fig. {String(index + 1).padStart(2, '0')}</span><span>{project.figure}</span></div>
      <svg className={'project-scene scene-' + project.id} viewBox="0 0 560 430" role="img" aria-label={project.visualDescription}>
        <Scene />
      </svg>
      <figcaption><span className="activity-dot" aria-hidden="true" />{project.activity}<span className="illustration-label">Illustration</span></figcaption>
    </figure>
  );
}
