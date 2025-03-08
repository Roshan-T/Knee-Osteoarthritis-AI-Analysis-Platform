import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Loader2, Shield, User, Building2, Stethoscope, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';

interface DoctorAuthProps {
  onAuthenticated: () => void;
}

export function DoctorAuth({ onAuthenticated }: DoctorAuthProps) {
  const [step, setStep] = useState<'security' | 'details'>('security');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    securityKey: '',
    name: '',
    licenseNumber: '',
    institution: '',
    specialization: '',
    yearsOfExperience: '',
    email: '',
    phone: ''
  });

  const handleSecurityCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate security check
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (formData.securityKey === 'demo123') {
      setStep('details');
      toast.success('Security key verified');
    } else {
      toast.error('Invalid security key');
    }

    setLoading(false);
  };

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate verification
    await new Promise(resolve => setTimeout(resolve, 2000));

    onAuthenticated();
    toast.success('Authentication successful');
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md mx-auto"
    >
      {step === 'security' ? (
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Lock className="h-6 w-6 text-blue-600" />
              Doctor Authentication
            </CardTitle>
            <p className="text-sm text-gray-500">
              Please enter your security key to access the contribution portal
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSecurityCheck} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Security Key
                </label>
                <div className="relative">
                  <Shield className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="Enter your security key"
                    className="pl-10"
                    value={formData.securityKey}
                    onChange={(e) => setFormData({ ...formData, securityKey: e.target.value })}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Continue'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
            <p className="text-sm text-gray-500">
              Please provide your professional details
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleDetailsSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Dr. John Doe"
                    className="pl-10"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">License Number</label>
                <div className="relative">
                  <Award className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Medical license number"
                    className="pl-10"
                    value={formData.licenseNumber}
                    onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Institution</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Hospital or clinic name"
                    className="pl-10"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Specialization</label>
                <div className="relative">
                  <Stethoscope className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="e.g., Orthopedics"
                    className="pl-10"
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Complete Authentication'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}