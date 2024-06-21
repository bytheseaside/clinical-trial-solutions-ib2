import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';
import { NextResponse } from 'next/server';

export default withMiddlewareAuthRequired({
  returnTo(req) {
    // There are 2 main points for this:
    // 1. This is the only way to make sure the searchParams are included
    // in the returnTo URL if there is more than one query param
    // 2. Later, we can add more logic here to handle more complex cases
    // for different pathnames
    return `${req.nextUrl.pathname}${req.nextUrl.search}`;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async middleware(req) {
    return NextResponse.next();
  },
});

export const config = {
  // This are the paths that will be protected
  matcher: ['/protected', '/not-allowed'],
};
