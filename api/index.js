const { createRequestHandler } = require('@shopify/remix-oxygen');
const { createAppLoadContext } = require('../../lib/context');
const { storefrontRedirect } = require('@shopify/hydrogen');

module.exports = async (req, res) => {
  const request = new Request(req.url, {
    method: req.method,
    headers: req.headers,
    body: req.body,
  });

  try {
    const appLoadContext = await createAppLoadContext(
      request,
      process.env,
      {}
    );

    const handleRequest = createRequestHandler({
      build: await import('virtual:react-router/server-build'),
      mode: process.env.NODE_ENV,
      getLoadContext: () => appLoadContext,
    });

    const response = await handleRequest(request);

    if (response.status === 404) {
      const redirectResponse = await storefrontRedirect({
        request,
        response,
        storefront: appLoadContext.storefront,
      });
      res.status(redirectResponse.status);
      for (const [key, value] of redirectResponse.headers.entries()) {
        res.setHeader(key, value);
      }
      res.end(await redirectResponse.text());
      return;
    }

    res.status(response.status);
    for (const [key, value] of response.headers.entries()) {
      res.setHeader(key, value);
    }
    res.end(await response.text());
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).end('Internal Server Error');
  }
};
