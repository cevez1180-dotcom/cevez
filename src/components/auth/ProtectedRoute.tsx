import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { AuthLoadingScreen } from './AuthLoadingScreen';

interface ProtectedRouteProps {
  children: React.ReactNode;
  onRedirectToLogin: (attemptedRoute?: string) => void;
  currentRoute?: string;
}

/**
 * Protected Route:
 * Protects application routes (e.g. '/', '/dashboard', '/profile', etc.).
 * If user has no active session, blocks view and redirects to '/login'.
 * Uses zero-flash brand loading screen while verifying session.
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  onRedirectToLogin,
  currentRoute,
}) => {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      onRedirectToLogin(currentRoute);
    }
  }, [isLoading, user, onRedirectToLogin, currentRoute]);

  if (isLoading) {
    return <AuthLoadingScreen />;
  }

  if (!user) {
    return <AuthLoadingScreen />;
  }

  return <>{children}</>;
};
