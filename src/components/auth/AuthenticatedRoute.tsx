import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { AuthLoadingScreen } from './AuthLoadingScreen';

interface AuthenticatedRouteProps {
  children: React.ReactNode;
  onRedirectToHome: () => void;
}

/**
 * Reverse Protected Route:
 * If user is ALREADY authenticated with a valid session,
 * prevent them from seeing /login, /register, etc., and redirect to '/'
 */
export const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({
  children,
  onRedirectToHome,
}) => {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && user) {
      onRedirectToHome();
    }
  }, [isLoading, user, onRedirectToHome]);

  if (isLoading) {
    return <AuthLoadingScreen />;
  }

  if (user) {
    return <AuthLoadingScreen />;
  }

  return <>{children}</>;
};
