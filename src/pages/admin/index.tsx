import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, LogOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAdminStore } from '@/lib/store';
import toast from 'react-hot-toast';

export function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, isAuthenticated, logout } = useAdminStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      toast.success('Successfully logged in as admin');
      navigate('/admin/dashboard');
    } else {
      toast.error('Invalid password');
    }
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">Already Authenticated</h2>
                <p className="text-gray-600 mb-6">
                  You're already logged in as an administrator.
                </p>
                <div className="flex justify-center gap-4">
                  <Button onClick={() => navigate('/admin/dashboard')}>
                    Go to Dashboard
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      logout();
                      toast.success('Logged out successfully');
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-md mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-blue-100">
                  <Lock className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <CardTitle className="text-center">Admin Authentication</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Admin Password
                  </label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login as Admin
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}