import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '../hooks/useToast';
import { Mail, Lock, LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast({
        title: 'Success',
        description: 'Logged in successfully',
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Invalid email or password. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md overflow-hidden border-l-2 border-l-green-800 border-t border-r-2 border-r-green-800 border-b border-gray-200">
          <div className="p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-medium text-green-900">Login</h2>
              <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 flex items-center">
                  <Mail className="h-4 w-4 mr-1 text-green-700" />
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 flex items-center">
                  <Lock className="h-4 w-4 mr-1 text-green-700" />
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  required
                />
              </div>
              
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center items-center px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-md transition-colors"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </button>
              </div>
            </form>
            
            <div className="mt-6 text-center text-sm">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-green-700 hover:text-green-800">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;