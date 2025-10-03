import { useState } from 'react';
import { useTeamMembers } from '@/lib/hooks/useTeam';
import TeamTable from '@/Components/Admin/Tables/TeamTable';
import TeamForm from '@/Components/Admin/Forms/TeamForm';
import toast from 'react-hot-toast';

const Team = () => {
  const [view, setView] = useState('list');
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  const { teamMembers, loading, createTeamMember, updateTeamMember, deleteTeamMember } = useTeamMembers({
    search: searchTerm || undefined,
    limit: 50,
  });

  const handleCreate = () => {
    setSelectedMember(null);
    setView('create');
  };

  const handleEdit = (member) => {
    setSelectedMember(member);
    setView('edit');
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;

    try {
      await deleteTeamMember(id);
      toast.success('Team member deleted successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to delete team member');
    }
  };

  const handleSubmit = async (data) => {
    try {
      setFormLoading(true);

      if (selectedMember) {
        await updateTeamMember(selectedMember.id, data);
        toast.success('Team member updated successfully');
      } else {
        await createTeamMember(data);
        toast.success('Team member created successfully');
      }

      setView('list');
      setSelectedMember(null);
    } catch (error) {
      toast.error(error.message || 'Failed to save team member');
    } finally {
      setFormLoading(false);
    }
  };

  const handleCancel = () => {
    setView('list');
    setSelectedMember(null);
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          {view === 'list' && (
            <div className="card bg-dark border-0 shadow-lg">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="text-white mb-0">
                    <i className="bi bi-people me-2" style={{ color: '#6A47ED' }}></i>
                    Team Management
                  </h3>
                  <button
                    className="btn"
                    style={{ background: '#6A47ED', color: 'white' }}
                    onClick={handleCreate}
                  >
                    <i className="bi bi-plus-circle me-2"></i>
                    Add Team Member
                  </button>
                </div>

                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <div className="input-group">
                      <span className="input-group-text bg-dark border-secondary">
                        <i className="bi bi-search text-white-50"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control bg-dark text-white border-secondary"
                        placeholder="Search by name, role, or bio..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <TeamTable
                  teamMembers={teamMembers}
                  loading={loading}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            </div>
          )}

          {(view === 'create' || view === 'edit') && (
            <TeamForm
              teamMember={selectedMember}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              loading={formLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Team;
