import React, { useState } from 'react';
import { Lock, Upload } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';

export function DoctorContribution() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    securityKey: '',
    name: '',
    licenseNumber: '',
    institution: ''
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png']
    },
    disabled: !isAuthenticated
  });

  const handleAuthentication = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual authentication
    if (formData.securityKey === 'demo123') {
      setIsAuthenticated(true);
      toast.success('Authentication successful');
    } else {
      toast.error('Invalid security key');
    }
  };

  const handleContribution = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual contribution
    toast.success('Contribution submitted successfully');
  };

  return (
    <section id="contribute" className="py-12 px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Doctor Contribution Portal</h2>

        {!isAuthenticated ? (
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-center mb-6">
                <Lock size={48} className="text-blue-600" />
              </div>
              <form onSubmit={handleAuthentication}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Security Key
                  </label>
                  <input
                    type="password"
                    value={formData.securityKey}
                    onChange={(e) => setFormData({ ...formData, securityKey: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Authenticate
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Doctor Information</h3>
              <form onSubmit={handleContribution}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      License Number
                    </label>
                    <input
                      type="text"
                      value={formData.licenseNumber}
                      onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Institution
                    </label>
                    <input
                      type="text"
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
              </form>
            </div>

            <div>
              <div
                {...getRootProps()}
                className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
              >
                <input {...getInputProps()} />
                <Upload className="mx-auto mb-4 text-blue-500" size={48} />
                <p className="text-gray-600">Upload X-ray images with verified OA grades</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}