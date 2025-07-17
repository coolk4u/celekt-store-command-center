
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Eye, EyeOff, Smartphone } from 'lucide-react';

const Login = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!employeeId || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    const success = await login(employeeId, password);
    
    if (success) {
      toast.success('Login successful!');
      navigate('/', { replace: true });
    } else {
      toast.error('Invalid credentials. Try EMP001 / password123');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-red-600 rounded-3xl mb-6 shadow-lg">
            <Smartphone className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Celekt Store</h1>
          <p className="text-muted-foreground">Store Manager Portal</p>
        </div>

        <Card className="shadow-xl border-0 bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-center text-xl font-semibold">Welcome Back</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="employeeId" className="text-sm font-medium text-gray-700">
                  Employee ID / Mobile
                </Label>
                <Input
                  id="employeeId"
                  type="text"
                  placeholder="Enter your Employee ID"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="h-12 rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20 bg-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20 pr-10 bg-white"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-primary to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-xl shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  className="text-sm text-primary hover:text-red-700 font-medium"
                  onClick={() => toast.info('Please contact your administrator')}
                >
                  Forgot Password?
                </button>
              </div>
            </form>

            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-600 text-center">
                <span className="font-medium">Demo credentials:</span><br />
                ID: EMP001 | Password: password123
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
