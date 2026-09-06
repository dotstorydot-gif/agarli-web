import fs from 'fs';
import path from 'path';

export interface Lead {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email: string;
  propertyLocation: string;
  propertyType: string;
  status: 'new' | 'contacted' | 'meeting_scheduled' | 'closed';
  notes?: string;
}

const LEADS_PATH = path.join(process.cwd(), 'data', 'leads.json');

function ensureLeadsFile(): void {
  if (!fs.existsSync(LEADS_PATH)) {
    fs.writeFileSync(LEADS_PATH, JSON.stringify([], null, 2), 'utf-8');
  }
}

export function getLeads(): Lead[] {
  ensureLeadsFile();
  try {
    const raw = fs.readFileSync(LEADS_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveLeads(leads: Lead[]): void {
  fs.writeFileSync(LEADS_PATH, JSON.stringify(leads, null, 2), 'utf-8');
}

export function addLead(data: Omit<Lead, 'id' | 'createdAt' | 'status'> & { notes?: string }): Lead {
  const leads = getLeads();
  const newLead: Lead = {
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    status: 'new',
    ...data,
  };
  leads.unshift(newLead); // newest first
  saveLeads(leads);
  return newLead;
}

export function updateLeadStatus(id: string, status: Lead['status']): Lead | null {
  const leads = getLeads();
  const lead = leads.find(l => l.id === id);
  if (!lead) return null;
  lead.status = status;
  saveLeads(leads);
  return lead;
}

export function deleteLead(id: string): boolean {
  const leads = getLeads();
  const filtered = leads.filter(l => l.id !== id);
  if (filtered.length === leads.length) return false;
  saveLeads(filtered);
  return true;
}
