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
    title: "{{PROJECT_1_TITLE}}",
    description: "{{PROJECT_1_DESC}}",
    impact: "{{PROJECT_1_IMPACT}}",
    tags: ["{{TAG_1}}", "{{TAG_2}}"],
    icon: <Database size={16} className="text-y2k-pink" />,
  },
  {
    title: "{{PROJECT_2_TITLE}}",
    description: "{{PROJECT_2_DESC}}",
    impact: "{{PROJECT_2_IMPACT}}",
    tags: ["{{TAG_3}}", "{{TAG_4}}"],
    icon: <Cpu size={16} className="text-y2k-cyan" />,
  },
];
