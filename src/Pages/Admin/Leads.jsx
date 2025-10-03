import { useState } from 'react';
import { useLeads } from '@/lib/hooks/useLeads';
import LeadsTable from '@/Components/Admin/Tables/LeadsTable';
import LeadsFilters from '@/Components/Admin/LeadsFilters';
import LeadDetailModal from '@/Components/Admin/LeadDetailModal';
import { exportLeadsToCSV } from '@/lib/utils/exportCSV';
import { SupabaseLeadRepository } from '@/lib/adapters/supabase/SupabaseLeadRepository';
import { toast } from 'react-hot-toast';

const repository = new SupabaseLeadRepository();

const Leads = () => {
  const [statusFilter, setStatusFilter] = useState(undefined);
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { leads, loading, counts, updateLeadStatus, refresh } = useLeads({
    status: statusFilter,
    search: searchFilter,
  });

  const handleStatusChange = async (leadId, newStatus) => {
    await updateLeadStatus(leadId, newStatus);
    if (selectedLead?.id === leadId) {
      // Update selected lead in modal
      const updated = await repository.findById(leadId);
      setSelectedLead(updated);
    }
  };

  const handleExport = async () => {
    try {
      // Fetch all leads matching current filters for export
      const allLeads = await repository.findAll({
        status: statusFilter,
        search: searchFilter,
      });
      exportLeadsToCSV(allLeads);
      toast.success(`Exported ${allLeads.length} lead${allLeads.length !== 1 ? 's' : ''}`);
    } catch (error) {
      toast.error('Failed to export leads');
    }
  };

  const handleRowClick = (lead) => {
    setSelectedLead(lead);
    setShowModal(true);
  };

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex align-items-center mb-4">
            <i className="bi bi-inbox" style={{ fontSize: '2rem', color: '#6A47ED', marginRight: '1rem' }}></i>
            <div>
              <h2 className="text-white mb-1">Leads Inbox</h2>
              <p className="text-white-50 mb-0">Manage and respond to contact form submissions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card bg-dark border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{ width: '48px', height: '48px', background: 'rgba(106, 71, 237, 0.1)' }}
                >
                  <i className="bi bi-inbox" style={{ fontSize: '1.5rem', color: '#6A47ED' }}></i>
                </div>
                <div>
                  <h3 className="text-white mb-0">{counts.new}</h3>
                  <small className="text-white-50">New Leads</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-dark border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{ width: '48px', height: '48px', background: 'rgba(13, 110, 253, 0.1)' }}
                >
                  <i className="bi bi-telephone" style={{ fontSize: '1.5rem', color: '#0d6efd' }}></i>
                </div>
                <div>
                  <h3 className="text-white mb-0">{counts.contacted}</h3>
                  <small className="text-white-50">Contacted</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-dark border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{ width: '48px', height: '48px', background: 'rgba(25, 135, 84, 0.1)' }}
                >
                  <i className="bi bi-check-circle" style={{ fontSize: '1.5rem', color: '#198754' }}></i>
                </div>
                <div>
                  <h3 className="text-white mb-0">{counts.closed}</h3>
                  <small className="text-white-50">Closed</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-dark border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{ width: '48px', height: '48px', background: 'rgba(106, 71, 237, 0.1)' }}
                >
                  <i className="bi bi-people" style={{ fontSize: '1.5rem', color: '#6A47ED' }}></i>
                </div>
                <div>
                  <h3 className="text-white mb-0">{counts.total}</h3>
                  <small className="text-white-50">Total Leads</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card bg-dark border-0 shadow-sm">
            <div className="card-body">
              <LeadsFilters
                counts={counts}
                currentStatus={statusFilter}
                currentSearch={searchFilter}
                onStatusChange={setStatusFilter}
                onSearchChange={setSearchFilter}
                onExport={handleExport}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="row">
        <div className="col-12">
          <div className="card bg-dark border-0 shadow-sm">
            <div className="card-body p-0">
              <LeadsTable
                leads={leads}
                loading={loading}
                onStatusChange={handleStatusChange}
                onRowClick={handleRowClick}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Lead Detail Modal */}
      <LeadDetailModal
        lead={selectedLead}
        show={showModal}
        onHide={() => setShowModal(false)}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default Leads;
