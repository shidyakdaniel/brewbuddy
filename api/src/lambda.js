import serverless from 'serverless-http';
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

import app from './app.js';

function parseLooseKeyValueSecret(secretString) {
  const out = {};

  const withoutBraces = String(secretString || '')
    .trim()
    .replace(/^\{/, '')
    .replace(/\}$/, '');

  const re = /([A-Za-z0-9_]+)\s*:\s*([^,\n\r}]+)/g;
  let match;
  while ((match = re.exec(withoutBraces)) !== null) {
    const key = match[1];
    let value = String(match[2]).trim();

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    out[key] = value;
  }

  return Object.keys(out).length > 0 ? out : null;
}

async function loadSecretsIntoEnv() {
  if (process.env.IS_OFFLINE) {
    try {
      await import('dotenv/config');
    } catch {
      // ignore
    }
    return;
  }

  const secretId = process.env.SECRETS_ID;
  if (!secretId) return;

  try {
    console.log('fetching secret', secretId);
    const client = new SecretsManagerClient({});
    const result = await client.send(new GetSecretValueCommand({ SecretId: secretId }));
    console.log('secret response', JSON.stringify(result));

    const secretString = result?.SecretString;
    if (!secretString) return;

    console.log('raw SecretString:', secretString);

    let parsed;
    try {
      parsed = JSON.parse(secretString);
    } catch (e) {
      console.log('JSON parse error:', e?.message);
      parsed = parseLooseKeyValueSecret(secretString);
    }

    if (!parsed || typeof parsed !== 'object') return;

    console.log('parsed secrets keys', Object.keys(parsed));

    for (const [key, value] of Object.entries(parsed)) {
      if (value === undefined || value === null) continue;
      if (process.env[key] === undefined) process.env[key] = String(value);
    }

    console.log('env vars set:', Object.keys(parsed));
  } catch {
    // never throw on cold start
  }
}

const init = loadSecretsIntoEnv();

export const handler = async (event, context) => {
  await init;
  // eslint-disable-next-line no-console
  console.log('env_debug', {
    SECRETS_ID: process.env.SECRETS_ID,
    SUPABASE_URL: process.env.SUPABASE_URL
  });
  const wrapped = serverless(app);
  return wrapped(event, context);
};
