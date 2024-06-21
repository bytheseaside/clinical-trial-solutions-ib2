import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { UserProps, WithPageAuthRequiredOptions } from '@auth0/nextjs-auth0/dist/client/with-page-auth-required';

const WithClientAuthRequired = <P extends object>(
  Component: React.FC<P>,
  options?: WithPageAuthRequiredOptions,
) => {
  const AuthComponent = withPageAuthRequired(
    Component as React.ComponentType<P & UserProps>,
    { ...options },
  );
  return (props: P) => <AuthComponent {...props} />;
};

export default WithClientAuthRequired;
