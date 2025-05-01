import React, { useState } from 'react';
import { X, User, Mail, Phone, UserCheck } from 'lucide-react';

const StaffForm = ({ staff, onClose, refresh }) => {
  const [formData, setFormData] = useState({
    name: staff?.name || '',
    email: staff?.email || '',
    role: staff?.role || 'collector',
    phone: staff?.phone || '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = staff ? `http://localhost:5000/api/staff/${staff._id}` : 'http://localhost:5000/api/staff';
      const method = staff ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to save staff');
      
      refresh();
      onClose();
    } catch (error) {
      console.error('Error saving staff:', error);
      alert('Error saving staff: ' + error.message);
    }
  };

  // Role options specific to waste management
  const roleOptions = [
    { value: 'collector', label: 'Garbage Collector' },
    { value: 'supervisor', label: 'Area Supervisor' },
    { value: 'inspector', label: 'Cleanliness Inspector' },
    { value: 'driver', label: 'Vehicle Driver' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl border-l-4 border-green-500">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-green-800 flex items-center">
            <UserCheck className="mr-2 text-green-600" size={20} />
            {staff ? 'Edit Staff Member' : 'Add Waste Management Staff'}
          </h3>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-red-600 transition-colors p-1 rounded-full hover:bg-red-50"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div className="relative">
              <div className="absolute left-3 top-3 text-green-600">
                <User size={18} />
              </div>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="pl-10 pr-3 py-2 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder="Enter staff name"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <div className="absolute left-3 top-3 text-green-600">
                <Mail size={18} />
              </div>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="pl-10 pr-3 py-2 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder="email@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="pl-3 pr-3 py-2 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-green-500 focus:ring-green-500"
            >
              {roleOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <div className="relative">
              <div className="absolute left-3 top-3 text-green-600">
                <Phone size={18} />
              </div>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="pl-10 pr-3 py-2 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder="+91 1234567890"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
            >
              {staff ? 'Update' : 'Add'} Staff Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StaffForm;