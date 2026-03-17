import { Terminal, Code, Database, Cpu, Globe } from 'lucide-react';
import type { ReactNode } from 'react';

export interface Project {
  title: string;
  description: string;
  impact: string;
  tags: string[];
  icon: ReactNode;
  link?: string;
}

export const projects: Project[] = [
  {
    title: "Crow",
    description:
      "Instant P2P payments protocol for creating escrows, accepting stablecoins, and enabling P2P wagering.",
    impact: "No bank, no middleman, no fees — all you need is a wallet.",
    tags: ["Web3", "Escrow", "Stablecoins", "P2P"],
    link: "https://sendacrow.xyz",
    icon: <Globe size={16} className="text-y2k-cyan" />,
  },
  {
    title: "Petra Vision",
    description:
      "Proprietary audit tool reviewing financial statements, investor notices, and capital calls for alignment, formatting, grammar, and footing.",
    impact: "Saves senior directors and MDs hours each week in review time across all financial statements, investor notices, and capital calls.",
    tags: ["Python", "Financial Analysis", "Automation"],
    icon: <Database size={16} className="text-y2k-pink" />,
  },
  {
    title: "AI Voicemail Agent",
    description:
      "Lightweight, shareable AI application designed to intelligently replace traditional business voicemails, inform callers of status, and take messages.",
    impact: "Streamlines communication by routing transcripts directly to mobile.",
    tags: ["Telnyx", "RunPod", "Airtable", "AI"],
    icon: <Cpu size={16} className="text-y2k-cyan" />,
  },
  {
    title: "Contract Forecasting Agent",
    description:
      "Creates lifetime billing and revenue recognition schedules for sign-off by Billing & Finance.",
    impact: "Reduced billing errors identified during QC audits by 50%.",
    tags: ["AI", "Finance", "Workflow Integration"],
    icon: <Globe size={16} className="text-y2k-green" />,
  },
  {
    title: "RFP Agent",
    description:
      "AI agent built to automatically draft and prefill answers to highly complex Request for Proposals.",
    impact: "Drafts and prefills 200+ question RFPs, cutting turnaround from days to hours.",
    tags: ["Langchain", "FastAPI", "AI"],
    icon: <Code size={16} className="text-y2k-purple" />,
  },
  {
    title: "Automated Invoice System",
    description:
      "Automated monthly invoice creation for Due to Manager expenses across a large portfolio.",
    impact: "Scaled across 40+ Riverstone portfolio companies, eliminating manual entry entirely.",
    tags: ["Power Query", "Python", "VBA"],
    icon: <Terminal size={16} className="text-y2k-pink" />,
  },
];
