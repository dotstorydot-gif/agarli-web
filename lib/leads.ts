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

const SEED_LEADS_PATH = path.join(process.cwd(), 'data', 'leads.json');
const TMP_LEADS_PATH = path.join('/tmp', 'leads.json');

// In-memory cache for serverless invocation lifetime
let memoryLeads: Lead[] | null = null;

function getStoragePath(): string {
  try {
    // If the data directory is writable (e.g. local dev), write to data/leads.json
    fs.accessSync(path.dirname(SEED_LEADS_PATH), fs.constants.W_OK);
    return SEED_LEADS_PATH;
  } catch {
    // Vercel serverless filesystem is read-only outside of /tmp
    return TMP_LEADS_PATH;
  }
}

export function getLeads(): Lead[] {
  if (memoryLeads) return memoryLeads;

  let leads: Lead[] = [];

  // 1. Read seed file from project if it exists
  try {
    if (fs.existsSync(SEED_LEADS_PATH)) {
      const raw = fs.readFileSync(SEED_LEADS_PATH, 'utf-8');
      leads = JSON.parse(raw);
    }
  } catch (e) {
    console.warn('[Leads] Error reading seed leads:', e);
  }

  // 2. Merge with any leads stored in /tmp during serverless run
  try {
    if (fs.existsSync(TMP_LEADS_PATH)) {
      const tmpRaw = fs.readFileSync(TMP_LEADS_PATH, 'utf-8');
      const tmpLeads: Lead[] = JSON.parse(tmpRaw);
      const existingIds = new Set(leads.map(l => l.id));
      for (const item of tmpLeads) {
        if (!existingIds.has(item.id)) {
          leads.unshift(item);
        }
      }
    }
  } catch (e) {
    console.warn('[Leads] Error reading tmp leads:', e);
  }

  memoryLeads = leads;
  return leads;
}

export function saveLeads(leads: Lead[]): void {
  memoryLeads = leads;
  const targetPath = getStoragePath();

  try {
    fs.writeFileSync(targetPath, JSON.stringify(leads, null, 2), 'utf-8');
  } catch (err) {
    // Fallback attempt to write into /tmp
    try {
      fs.writeFileSync(TMP_LEADS_PATH, JSON.stringify(leads, null, 2), 'utf-8');
    } catch (tmpErr) {
      console.warn('[Leads Storage Notice] Could not write to disk, preserved in serverless memory cache:', tmpErr);
    }
  }
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
