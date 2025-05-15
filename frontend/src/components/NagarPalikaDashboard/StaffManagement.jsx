import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Pencil, Trash2, Users, RefreshCw } from 'lucide-react';
import StaffForm from './StaffForm';

const StaffManagement = () => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const { currentUser } = useAuth();
  const [staff, setStaff] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editStaff, setEditStaff] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/staff`);
      const data = await response.json();
      setStaff(data);
    } catch (error) {
      console.error('Error fetching staff:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      try {
        await fetch(`${baseUrl}/api/staff/${id}`, { method: 'DELETE' });
        fetchStaff();
      } catch (error) {
        console.error('Error deleting staff:', error);
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border-l-4 border-green-500">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-green-800 flex items-center">
          <Users className="mr-2 text-green-600" size={24} />
          Staff Management
        </h2>
        <div className="flex gap-2">
          <button
            onClick={fetchStaff}
            className="bg-gray-100 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors flex items-center"
          >
            <RefreshCw size={16} className="mr-1" />
            Refresh
          </button>
          {currentUser?.role === 'admin' && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Add New Staff
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full">
            <thead className="bg-green-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-green-800 border-b border-gray-200">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-green-800 border-b border-gray-200">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-green-800 border-b border-gray-200">Role</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-green-800 border-b border-gray-200">Active Assignments</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-green-800 border-b border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {staff.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No staff members found
                  </td>
                </tr>
              ) : (
                staff.map((member) => (
                  <tr key={member._id} className="hover:bg-green-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-700">{member.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{member.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">
                        {member.role === 'collector' ? 'Garbage Collector' : 
                         member.role === 'supervisor' ? 'Area Supervisor' : 
                         member.role === 'inspector' ? 'Cleanliness Inspector' : 
                         member.role === 'driver' ? 'Vehicle Driver' : member.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {member.currentAssignments?.length ? (
                        <span className="font-medium">{member.currentAssignments.length}</span>
                      ) : (
                        <span className="text-gray-400">None</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setEditStaff(member);
                            setShowForm(true);
                          }}
                          className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
                        >
                          <Pencil className="h-4 w-4 mr-2 text-green-600" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(member._id)}
                          className="inline-flex items-center px-3 py-1 border border-transparent rounded-md bg-red-100 text-red-700 hover:bg-red-200"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <StaffForm
          staff={editStaff}
          onClose={() => {
            setShowForm(false);
            setEditStaff(null);
          }}
          refresh={fetchStaff}
        />
      )}
    </div>
  );
};

export default StaffManagement;