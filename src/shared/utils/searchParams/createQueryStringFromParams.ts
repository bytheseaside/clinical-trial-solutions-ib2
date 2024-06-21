type SearchParams<BaseParams> = { [K in keyof BaseParams]: string | string[] | undefined };

export function createQueryStringFromParams<BaseParams>(
  params: SearchParams<BaseParams>,
): string {
  const queryStringComponents: string[] = [];

  Object.keys(params).forEach((key) => {
    const value = params[key as keyof BaseParams];

    if (typeof value === 'string') {
      queryStringComponents.push(`${key}=${encodeURIComponent(value)}`);
    } else if (Array.isArray(value)) {
      value.forEach((item) => {
        if (typeof item === 'string') {
          queryStringComponents.push(`${key}=${encodeURIComponent(item)}`);
        }
      });
    }
  });

  return queryStringComponents.length > 0 ? `?${queryStringComponents.join('&')}` : '';
}
