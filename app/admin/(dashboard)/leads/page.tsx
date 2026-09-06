'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Inbox,
  Search,
  Filter,
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  Trash2,
  CheckCircle,
  Clock,
  MapPin,
  Home,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import { Lead } from '@/lib/leads';

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [refreshing, setRefreshing] = useState(false);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/consultation');
      const data = await res.json();
      if (data.leads) {
        setLeads(data.leads);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleStatusChange = async (id: string, newStatus: Lead['status']) => {
    setLeads(prev => prev.map(l => (l.id === id ? { ...l, status: newStatus } : l)));
    try {
      await fetch('/api/consultation', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
    } catch {
      fetchLeads();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this consultation request?')) return;
    setLeads(prev => prev.filter(l => l.id !== id));
    try {
      await fetch('/api/consultation', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
    } catch {
      fetchLeads();
    }
  };

  const filtered = leads.filter(l => {
    const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
    const matchesSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      l.propertyLocation.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const countNew = leads.filter(l => l.status === 'new').length;
  const countContacted = leads.filter(l => l.status === 'contacted').length;
  const countScheduled = leads.filter(l => l.status === 'meeting_scheduled').length;

  return (
    <div style={{ padding: '2.5rem' }}>
      {/* Top Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 600, color: '#1B2D45', margin: 0 }}>
              Consultations & Leads
            </h1>
            {countNew > 0 && (
              <span
                style={{
                  background: '#EF4444',
                  color: '#fff',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '0.2rem 0.6rem',
                  borderRadius: '999px',
                }}
              >
                {countNew} New
              </span>
            )}
          </div>
          <p style={{ color: '#6B7280', fontSize: '0.875rem', marginTop: '0.35rem' }}>
            Owner consultation requests received through the website form.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setRefreshing(true);
            fetchLeads();
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.625rem 1.1rem',
            borderRadius: '0.625rem',
            background: '#fff',
            border: '1.5px solid #E5E7EB',
            color: '#1B2D45',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <RefreshCw style={{ width: '0.875rem', height: '0.875rem', animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem',
        }}
      >
        <div style={{ background: '#fff', padding: '1.25rem', borderRadius: '1rem', border: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Total Inquiries
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1B2D45', marginTop: '0.25rem' }}>
            {leads.length}
          </div>
        </div>

        <div style={{ background: '#fff', padding: '1.25rem', borderRadius: '1rem', border: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: '0.75rem', color: '#EF4444', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            New (Uncontacted)
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#EF4444', marginTop: '0.25rem' }}>
            {countNew}
          </div>
        </div>

        <div style={{ background: '#fff', padding: '1.25rem', borderRadius: '1rem', border: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: '0.75rem', color: '#3B82F6', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            In Discussion
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#3B82F6', marginTop: '0.25rem' }}>
            {countContacted}
          </div>
        </div>

        <div style={{ background: '#fff', padding: '1.25rem', borderRadius: '1rem', border: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Meeting Scheduled
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#10B981', marginTop: '0.25rem' }}>
            {countScheduled}
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ position: 'relative', minWidth: '260px', flex: '1 1 260px' }}>
          <Search style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', width: '1rem', height: '1rem', color: '#9CA3AF' }} />
          <input
            type="text"
            placeholder="Search by name, phone, or location..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem 0.65rem 2.4rem',
              borderRadius: '0.625rem',
              border: '1.5px solid #E5E7EB',
              fontSize: '0.85rem',
              background: '#fff',
              outline: 'none',
              color: '#1B2D45',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {[
            { key: 'all', label: 'All Requests' },
            { key: 'new', label: 'New' },
            { key: 'contacted', label: 'Contacted' },
            { key: 'meeting_scheduled', label: 'Scheduled' },
            { key: 'closed', label: 'Closed' },
          ].map(tab => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setStatusFilter(tab.key)}
              style={{
                padding: '0.5rem 0.85rem',
                borderRadius: '0.5rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                background: statusFilter === tab.key ? '#1B2D45' : '#fff',
                color: statusFilter === tab.key ? '#fff' : '#6B7280',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: statusFilter === tab.key ? '#1B2D45' : '#E5E7EB',
                transition: 'all 0.15s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table / Cards */}
      {loading ? (
        <div style={{ background: '#fff', padding: '4rem', textAlign: 'center', borderRadius: '1rem', border: '1px solid #E5E7EB' }}>
          <p style={{ color: '#6B7280', fontSize: '0.9rem' }}>Loading consultations...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ background: '#fff', padding: '4rem', textAlign: 'center', borderRadius: '1rem', border: '1px solid #E5E7EB' }}>
          <Inbox style={{ width: '2.5rem', height: '2.5rem', color: '#9CA3AF', margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1B2D45', margin: 0 }}>No consultations found</h3>
          <p style={{ color: '#6B7280', fontSize: '0.85rem', marginTop: '0.35rem' }}>
            {search ? 'Try adjusting your search criteria.' : 'New consultations submitted on the site will appear here.'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filtered.map(lead => {
            const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
            const waLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
              `Hello ${lead.name}, thank you for contacting Agarli regarding your property in ${lead.propertyLocation}.`
            )}`;

            return (
              <div
                key={lead.id}
                style={{
                  background: '#fff',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  border: lead.status === 'new' ? '1.5px solid #C9A96E' : '1px solid #E5E7EB',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                {/* Header row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1B2D45', margin: 0 }}>
                        {lead.name}
                      </h3>
                      {lead.status === 'new' && (
                        <span style={{ fontSize: '0.6875rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '999px', background: 'rgba(201,169,110,0.2)', color: '#92671A', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          ★ New Request
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginTop: '0.4rem', fontSize: '0.8rem', color: '#6B7280', flexWrap: 'wrap' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Clock style={{ width: '0.85rem', height: '0.85rem' }} />
                        {new Date(lead.createdAt).toLocaleString('en-EG', { dateStyle: 'medium', timeStyle: 'short' })}
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#1B2D45', fontWeight: 500 }}>
                        <MapPin style={{ width: '0.85rem', height: '0.85rem', color: '#C9A96E' }} />
                        {lead.propertyLocation}
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#1B2D45', fontWeight: 500 }}>
                        <Home style={{ width: '0.85rem', height: '0.85rem', color: '#C9A96E' }} />
                        {lead.propertyType}
                      </span>
                    </div>
                  </div>

                  {/* Status Dropdown */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <select
                      value={lead.status}
                      onChange={e => handleStatusChange(lead.id, e.target.value as Lead['status'])}
                      style={{
                        padding: '0.4rem 0.75rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        border: '1.5px solid #E5E7EB',
                        background:
                          lead.status === 'new'
                            ? '#FEF3C7'
                            : lead.status === 'contacted'
                            ? '#EFF6FF'
                            : lead.status === 'meeting_scheduled'
                            ? '#ECFDF5'
                            : '#F3F4F6',
                        color:
                          lead.status === 'new'
                            ? '#92400E'
                            : lead.status === 'contacted'
                            ? '#1E40AF'
                            : lead.status === 'meeting_scheduled'
                            ? '#065F46'
                            : '#374151',
                        cursor: 'pointer',
                        outline: 'none',
                      }}
                    >
                      <option value="new">Status: New</option>
                      <option value="contacted">Status: In Discussion</option>
                      <option value="meeting_scheduled">Status: Meeting Scheduled</option>
                      <option value="closed">Status: Closed</option>
                    </select>

                    <button
                      type="button"
                      onClick={() => handleDelete(lead.id)}
                      aria-label="Delete consultation"
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#9CA3AF',
                        padding: '0.4rem',
                        borderRadius: '0.375rem',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#EF4444')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#9CA3AF')}
                    >
                      <Trash2 style={{ width: '1rem', height: '1rem' }} />
                    </button>
                  </div>
                </div>

                {/* Notes if present */}
                {lead.notes && (
                  <div
                    style={{
                      background: '#FAF8F5',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.625rem',
                      fontSize: '0.85rem',
                      color: '#4B5563',
                      borderLeft: '3px solid #C9A96E',
                    }}
                  >
                    <strong>Notes:</strong> {lead.notes}
                  </div>
                )}

                {/* Action Contact Bar */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid #F3F4F6',
                    flexWrap: 'wrap',
                  }}
                >
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.45rem 0.85rem',
                      borderRadius: '0.5rem',
                      background: '#25D366',
                      color: '#ffffff',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    <MessageSquare style={{ width: '0.85rem', height: '0.85rem' }} />
                    <span>WhatsApp Client</span>
                  </a>

                  <a
                    href={`tel:${lead.phone}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.45rem 0.85rem',
                      borderRadius: '0.5rem',
                      background: '#F3F4F6',
                      color: '#1B2D45',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    <Phone style={{ width: '0.85rem', height: '0.85rem' }} />
                    <span>{lead.phone}</span>
                  </a>

                  <a
                    href={`mailto:${lead.email}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.45rem 0.85rem',
                      borderRadius: '0.5rem',
                      background: '#F3F4F6',
                      color: '#1B2D45',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    <Mail style={{ width: '0.85rem', height: '0.85rem' }} />
                    <span>{lead.email}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
