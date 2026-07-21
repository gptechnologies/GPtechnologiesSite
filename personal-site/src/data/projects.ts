export interface Project {
  date: string;
  title: string;
  description: string;
  link?: string;
}

// Add, remove, or reorder projects here. Dates display in Month Year format.
export const projects: Project[] = [
  {
    date: 'July 2026',
    title: 'Crow',
    description:
      'Decentralized P2P escrow protocol deployed on Ethereum and Arbitrum. Any parties with a wallet can set terms and arbitrators to deploy an escrow from the factory. The immutable escrow contract holds funds until the settlement date, then releases them through mutual confirmation or designated arbitrators. Everything uses signed transactions with no custody of funds or wallet approvals. Successful escrows pay a 1% fee capped at $1 USDC.',
    link: 'https://sendacrow.xyz',
  },
  {
    date: 'July 2026',
    title: 'Purchase and Offer Agreement Tool',
    description:
      'Enter an address to automatically retrieve property information from the MLS or public data providers such as Zillow and Redfin, then populate a purchase and offer agreement template. Send a plain-English text or voice message to an AI agent to extract the remaining details and complete the fields. Save your progress, export a PDF, and update the template in one click.',
    link: 'https://purchaseandoffertool.vercel.app/',
  },
  {
    date: 'July 2026',
    title: 'Private Equity Audit Tool',
    description:
      'An audit tool that reviews financial statements, investor notices, and capital calls for alignment, formatting, grammar, and footing.',
  },
  {
    date: 'July 2026',
    title: 'AI Voicemail Agent',
    description:
      'If you or your business misses a call, an AI agent picks up instead of sending the caller to voicemail. The agent only answers calls that would otherwise be missed, knows your business, and can answer questions, schedule meetings or appointments, and direct callers to the right person. Call data is automatically recorded in the software systems you already use.',
  },
  {
    date: 'January 2026',
    title: 'Private Equity Contract Forecasting Agent',
    description:
      'Automatically ingests data from Salesforce, transforms it, and populates board reporting packages. Creates lifetime billing schedules and invoices to automate billing review and forecasting.',
  },
  {
    date: 'July 2026',
    title: 'RFP Agent',
    description:
      'Automatically generates answers to RFPs using company data, knowledge bases, past work, current events, and other relevant sources.',
  },
  {
    date: 'January 2026',
    title: 'Portfolio Company Billing',
    description:
      'Automates the creation of portfolio company expense invoices from travel and entertainment expenses and the general ledger system.',
  },
];
