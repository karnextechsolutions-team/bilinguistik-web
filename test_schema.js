const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envContent = fs.readFileSync('.env.local', 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }
    env[match[1]] = value;
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function run() {
  const url = `${supabaseUrl}/rest/v1/`;
  console.log('Fetching OpenAPI spec from:', url);
  const res = await fetch(url, {
    headers: {
      'apikey': supabaseAnonKey,
      'Authorization': `Bearer ${supabaseAnonKey}`
    }
  });
  if (!res.ok) {
    const text = await res.text();
    console.error('Fetch failed:', res.status, text);
    return;
  }
  const spec = await res.json();
  console.log('Definitions:', Object.keys(spec.definitions));
  if (spec.definitions.site_settings) {
    console.log('site_settings properties:', Object.keys(spec.definitions.site_settings.properties));
  }
  if (spec.definitions.jobs) {
    console.log('jobs properties:', Object.keys(spec.definitions.jobs.properties));
  }
}

run().catch(console.error);
