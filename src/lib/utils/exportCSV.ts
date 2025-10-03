import type { Lead } from '@/lib/schemas/lead';

export function exportLeadsToCSV(leads: Lead[]): void {
  if (leads.length === 0) {
    return;
  }

  // Define CSV headers
  const headers = ['Name', 'Email', 'Phone', 'Subject', 'Message', 'Source', 'Status', 'Date'];

  // Convert leads to CSV rows
  const rows = leads.map((lead) => [
    escapeCSVValue(lead.name),
    escapeCSVValue(lead.email),
    escapeCSVValue(lead.phone || ''),
    escapeCSVValue(lead.subject || ''),
    escapeCSVValue(lead.message),
    escapeCSVValue(lead.source || ''),
    escapeCSVValue(lead.status),
    escapeCSVValue(new Date(lead.created_at).toLocaleString()),
  ]);

  // Combine headers and rows
  const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  const filename = `devmart-leads-${new Date().toISOString().split('T')[0]}.csv`;

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function escapeCSVValue(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
