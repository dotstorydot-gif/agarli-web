import { NextRequest, NextResponse } from 'next/server';
import { getLeads, addLead, updateLeadStatus, deleteLead } from '@/lib/leads';
import { sendLeadNotificationEmail } from '@/lib/email';
import { cookies } from 'next/headers';

// Public POST endpoint to submit consultation requests
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, propertyLocation, propertyType, notes } = body;

    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: 'Name, phone number, and email are required.' },
        { status: 400 }
      );
    }

    let lead;
    try {
      lead = addLead({
        name: String(name).trim(),
        phone: String(phone).trim(),
        email: String(email).trim(),
        propertyLocation: propertyLocation ? String(propertyLocation).trim() : 'Unspecified',
        propertyType: propertyType ? String(propertyType).trim() : 'Residential',
        notes: notes ? String(notes).trim() : '',
      });
    } catch (storageErr) {
      console.error('[AddLead Storage Fallback]:', storageErr);
      lead = {
        id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        createdAt: new Date().toISOString(),
        status: 'new' as const,
        name: String(name).trim(),
        phone: String(phone).trim(),
        email: String(email).trim(),
        propertyLocation: propertyLocation ? String(propertyLocation).trim() : 'Unspecified',
        propertyType: propertyType ? String(propertyType).trim() : 'Residential',
        notes: notes ? String(notes).trim() : '',
      };
    }

    // Dispatch email notification to Joe.mounir0@gmail.com
    sendLeadNotificationEmail({
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      propertyLocation: lead.propertyLocation,
      propertyType: lead.propertyType,
      notes: lead.notes,
      createdAt: lead.createdAt,
    }).catch(err => console.error('[Email Notification Error]:', err));

    return NextResponse.json({
      ok: true,
      message: 'Consultation request received successfully.',
      leadId: lead.id,
    });
  } catch (error: any) {
    console.error('[Consultation API Critical Error]:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to process consultation request.' },
      { status: 500 }
    );
  }
}

// Protected GET endpoint to retrieve leads for Admin dashboard
export async function GET() {
  const cookieStore = await cookies();
  const auth = cookieStore.get('admin_auth');
  if (!auth || auth.value !== 'authenticated') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const leads = getLeads();
  return NextResponse.json({ leads });
}

// Protected PATCH endpoint to update lead status
export async function PATCH(req: NextRequest) {
  const cookieStore = await cookies();
  const auth = cookieStore.get('admin_auth');
  if (!auth || auth.value !== 'authenticated') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: 'Missing ID or status' }, { status: 400 });
    }
    const updated = updateLeadStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }
    return NextResponse.json({ ok: true, lead: updated });
  } catch {
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
  }
}

// Protected DELETE endpoint to remove a lead
export async function DELETE(req: NextRequest) {
  const cookieStore = await cookies();
  const auth = cookieStore.get('admin_auth');
  if (!auth || auth.value !== 'authenticated') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: 'Missing lead ID' }, { status: 400 });
    }
    const success = deleteLead(id);
    return NextResponse.json({ ok: success });
  } catch {
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 });
  }
}
