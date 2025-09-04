'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { UserPlus, Mail, Lock, User } from 'lucide-react';
import Link from 'next/link';

const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      if (authData.user) {
        // Create profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            username: data.username,
          });

        if (profileError) {
          setError('Failed to create profile. Please try again.');
          return;
        }

        router.push(redirect);
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Card className="border-slate-200 shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
              <UserPlus className="h-6 w-6 text-black" />
            </div>
            <CardTitle className="font-poppins font-bold text-2xl text-black">
              Create Account
            </CardTitle>
            <p className="font-lato text-slate-600 text-sm">
              Join the developer community
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="username" className="font-lato font-medium flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Username
                </Label>
                <Input
                  id="username"
                  {...form.register('username')}
                  className="mt-1 border-slate-200 focus:border-black focus:ring-black/20"
                  placeholder="your-username"
                />
                {form.formState.errors.username && (
                  <p className="text-red-600 text-sm mt-1">
                    {form.formState.errors.username.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="font-lato font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...form.register('email')}
                  className="mt-1 border-slate-200 focus:border-black focus:ring-black/20"
                  placeholder="your@email.com"
                />
                {form.formState.errors.email && (
                  <p className="text-red-600 text-sm mt-1">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="password" className="font-lato font-medium flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  {...form.register('password')}
                  className="mt-1 border-slate-200 focus:border-black focus:ring-black/20"
                  placeholder="Create a password"
                />
                {form.formState.errors.password && (
                  <p className="text-red-600 text-sm mt-1">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="font-lato font-medium flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...form.register('confirmPassword')}
                  className="mt-1 border-slate-200 focus:border-black focus:ring-black/20"
                  placeholder="Confirm your password"
                />
                {form.formState.errors.confirmPassword && (
                  <p className="text-red-600 text-sm mt-1">
                    {form.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm font-lato">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black hover:bg-slate-800 text-white font-lato"
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="font-lato text-sm text-slate-600">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-black hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link href="/" className="font-lato text-slate-600 hover:text-black text-sm">
            ← Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}