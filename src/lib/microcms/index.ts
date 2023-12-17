import { createClient } from 'microcms-js-sdk';

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

if (!serviceDomain) {
  throw new Error('Environment variable not found: MICROCMS_SERVICE_DOMAIN');
}
if (!apiKey) {
  throw new Error('Environment variable not found: MICROCMS_API_KEY');
}

export const client = createClient({
  serviceDomain,
  apiKey,
});
