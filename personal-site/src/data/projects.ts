export interface Project {
  id: string;
  category: string;
  figure: string;
  activity: string;
  visualDescription: string;
  date: string;
  title: string;
  description: string;
  link?: string;
  resources?: Array<{
    label: string;
    href: string;
  }>;
}

// Add, remove, or reorder projects here. Dates display in Month Year format.
export const projects: Project[] = [
  {
    id: 'chainideas',
    category: 'Discovery & markets',
    figure: 'The discovery engine',
    activity: 'Discover → screen → alert',
    visualDescription: 'Solana and Robinhood Chain send data into Discovery. Age, Volume, and Liquidity indicators turn green before a qualified token travels to the results dashboard.',
    date: 'October 2026',
    title: 'ChainIdeas',
    description:
      'A free scanner similar to TradeIdeas that discovers new trading pairs through liquidity pools on Solana and Robinhood Chain, then screens them using professional stock-screening criteria. Includes alerts and customizable filters to build a variety of screeners.',
  },
  {
    id: 'crow',
    category: 'Onchain agreements',
    figure: 'A shared agreement',
    activity: 'Terms → funding → settlement → release',
    visualDescription: 'An illustrative escrow with a $250 amount and settlement date. The provider creates the terms and designates the arbitrator above the contract. The buyer deposits coins, filling the funds bar gold. The provider accepts the funded agreement, turning the bar green. At settlement, the arbitrator sends a signature and the funds are released to the provider.',
    date: 'July 2026',
    title: 'Crow',
    description:
      'A decentralized P2P escrow protocol on Ethereum and Arbitrum. Parties set their terms and arbitrators, then an immutable contract holds funds until settlement through mutual confirmation or arbitration. Signed transactions, no custody of funds, and no wallet approvals. Successful escrows pay a 1% fee capped at $1 USDC.',
    link: 'https://sendacrow.xyz',
    resources: [
      {
        label: 'Arbitrum contract',
        href: 'https://arbiscan.io/address/0x0798065Ea3867CaEBa7bBF124E0B599f70226ABE#code',
      },
      {
        label: 'Ethereum contract',
        href: 'https://etherscan.io/address/0x0798065Ea3867CaEBa7bBF124E0B599f70226ABE#code',
      },
    ],
  },
  {
    id: 'cot',
    category: 'Market research',
    figure: 'Positions, in perspective',
    activity: 'Weekly reports → a clearer picture',
    visualDescription: 'Weekly data flows into a chart with two evolving position lines and a report beside it.',
    date: 'October 2026',
    title: 'Commitment of Traders Charts',
    description:
      'A public tool that visualizes weekly Commitment of Traders data for non-commercial positions, built because I could not find an existing tool that did it. Updates weekly.',
    link: 'https://cot-chartsv4.vercel.app/',
  },
  {
    id: 'purchase-offer',
    category: 'Property & paperwork',
    figure: 'From address to agreement',
    activity: 'Find → fill → export',
    visualDescription: 'Property details travel from a house into an agreement, and the completed document receives a checkmark.',
    date: 'July 2026',
    title: 'Purchase and Offer Agreement Tool',
    description:
      'Turn a property address into a purchase and offer agreement. Pull property information from the MLS or public sources, then use a plain-English text or voice message to fill the remaining details with AI. Save your progress, export a PDF, and update the template in one click.',
    link: 'https://purchaseandoffertool.vercel.app/',
  },
  {
    id: 'audit',
    category: 'Financial operations',
    figure: 'A second set of eyes',
    activity: 'Review → reconcile → verify',
    visualDescription: 'A scanning bar reviews financial documents, flags a mismatch, and verifies the reconciled totals.',
    date: 'July 2026',
    title: 'Private Equity Audit Tool',
    description:
      'An audit tool that reviews financial statements, investor notices, and capital calls for alignment, formatting, grammar, and footing.',
  },
  {
    id: 'voicemail',
    category: 'Conversations & coordination',
    figure: 'The call gets answered',
    activity: 'Answer → understand → coordinate',
    visualDescription: 'A ringing phone sends a voice waveform to an agent, which creates a transcript and an appointment.',
    date: 'July 2026',
    title: 'AI Voicemail Agent',
    description:
      'An AI agent answers the calls you would otherwise miss. It knows your business, answers questions, schedules appointments, and directs callers to the right person. Call details are automatically recorded in the software systems you already use.',
  },
  {
    id: 'forecasting',
    category: 'Planning & reporting',
    figure: 'The road ahead',
    activity: 'Ingest → forecast → report',
    visualDescription: 'Contract records feed a billing timeline, and forecast bars rise into a board reporting chart.',
    date: 'January 2026',
    title: 'Private Equity Contract Forecasting Agent',
    description:
      'Automatically ingests data from Salesforce, transforms it, and populates board reporting packages. Creates lifetime billing schedules and invoices to automate billing review and forecasting.',
  },
  {
    id: 'rfp',
    category: 'Knowledge & proposals',
    figure: 'Knowledge becomes an answer',
    activity: 'Gather → synthesize → draft',
    visualDescription: 'Knowledge sources send information into an agent, which assembles a proposal document.',
    date: 'July 2026',
    title: 'RFP Agent',
    description:
      'Automatically generates answers to RFPs using company data, knowledge bases, past work, current events, and other relevant sources.',
  },
  {
    id: 'billing',
    category: 'Financial operations',
    figure: 'Everything accounted for',
    activity: 'Collect → organize → invoice',
    visualDescription: 'Travel and expense receipts move into a ledger and become one organized invoice.',
    date: 'January 2026',
    title: 'Portfolio Company Billing',
    description:
      'Automates the creation of portfolio company expense invoices from travel and entertainment expenses and the general ledger system.',
  },
];
