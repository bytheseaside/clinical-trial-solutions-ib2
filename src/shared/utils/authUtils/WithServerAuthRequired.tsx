import { AppRouterPageRoute, withPageAuthRequired, WithPageAuthRequiredAppRouterOptions } from '@auth0/nextjs-auth0';

const WithServerAuthRequired = <P extends object>(
  Component: React.FC<P>,
  options: WithPageAuthRequiredAppRouterOptions,
) => {
  const AuthComponent = withPageAuthRequired(
    Component as unknown as AppRouterPageRoute,
    { ...options },
  );
  return (props: P) => <AuthComponent {...props} />;
};

export default WithServerAuthRequired;
