import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAdminStore } from '@/lib/store';
import { Check, X, Image as ImageIcon, Users, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const { isAuthenticated, pendingImages, approveImage, rejectImage, doctors } = useAdminStore();

  if (!isAuthenticated) {
    navigate('/admin');
    return null;
  }

  const handleApprove = (id: string) => {
    approveImage(id);
    toast.success('Image approved and moved to dataset');
  };

  const handleReject = (id: string) => {
    rejectImage(id);
    toast.success('Image rejected and removed from pending list');
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-yellow-100 text-yellow-600">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{pendingImages.length}</p>
                    <p className="text-sm text-gray-500">Pending Reviews</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
                    <ImageIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {pendingImages.reduce((acc, img) => 
                        acc + (img.status === 'approved' ? 1 : 0), 0
                      )}
                    </p>
                    <p className="text-sm text-gray-500">Approved Images</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-green-100 text-green-600">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{doctors.length}</p>
                    <p className="text-sm text-gray-500">Registered Doctors</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Pending Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingImages.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    No pending images to review
                  </p>
                ) : (
                  pendingImages.map((image) => (
                    <motion.div
                      key={image.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <img
                        src={image.preview}
                        alt="X-ray"
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-medium">
                          Grade: {image.grade} ({image.confidence.toFixed(1)}% confidence)
                        </p>
                        <p className="text-sm text-gray-500">
                          Uploaded by: {image.uploadedBy}
                        </p>
                        <p className="text-sm text-gray-500">
                          Date: {new Date(image.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleApprove(image.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleReject(image.id)}
                          variant="outline"
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}