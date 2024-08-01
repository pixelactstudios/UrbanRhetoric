// Global Imports

// Internal Imports

// Types
type AuthLayoutProps = {
  children: React.ReactNode;
};

// Component
const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <div className="min-h-screen">{children}</div>;
};

// Exports
export default AuthLayout;
