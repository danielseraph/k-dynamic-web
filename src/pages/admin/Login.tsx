import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, Lock, User, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../../services/api';
import SEO from '../../components/shared/SEO';

const loginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(4, 'Password must be at least 4 characters')
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/admin';

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await api.auth.login(data.username, data.password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO title="Admin Login - K-TECH" description="K-TECH DYNAMIC LTD Administrator Access Login." />
      
      <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
        {/* Background decorative glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full space-y-8 p-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl relative z-10"
        >
          <div className="text-center">
            <div className="mx-auto w-12 h-12 rounded-xl bg-teal-500 flex items-center justify-center font-bold text-slate-950 text-2xl shadow-lg shadow-teal-500/20">
              K
            </div>
            <h2 className="mt-6 font-headings font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              Control Panel Access
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-400">
              Enter credentials to access K-TECH management dashboard.
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs sm:text-sm rounded-2xl flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Username / Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  {...register('username')}
                  className={`w-full pl-10 pr-4 py-3.5 bg-slate-950 border ${
                    errors.username ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-teal-500'
                  } rounded-2xl text-sm focus:outline-none transition-colors text-white placeholder-slate-600`}
                  placeholder="admin"
                />
              </div>
              {errors.username && (
                <span className="text-rose-500 text-[10px] font-bold mt-0.5">{errors.username.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  {...register('password')}
                  className={`w-full pl-10 pr-4 py-3.5 bg-slate-950 border ${
                    errors.password ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-teal-500'
                  } rounded-2xl text-sm focus:outline-none transition-colors text-white placeholder-slate-600`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <span className="text-rose-500 text-[10px] font-bold mt-0.5">{errors.password.message}</span>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 mt-4 bg-teal-500 hover:bg-teal-400 disabled:bg-slate-700 disabled:text-slate-500 text-slate-950 font-bold rounded-2xl shadow-lg shadow-teal-500/10 hover:shadow-teal-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Access Dashboard</span>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </>
  );
}
