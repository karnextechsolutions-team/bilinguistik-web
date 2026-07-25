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

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function tryInsertEmpty(tableName) {
  console.log(`\n--- Inserting empty row to ${tableName} ---`);
  // Try inserting an empty object to trigger default values and retrieve the column names
  const { data, error } = await supabase.from(tableName).insert({}).select();
  if (error) {
    console.log('Error:', error.message);
    console.log('Details:', error.details);
    console.log('Hint:', error.hint);
    console.log('Full Error:', JSON.stringify(error, null, 2));
  } else {
    console.log('Inserted successfully!');
    console.log('Returned data:', JSON.stringify(data, null, 2));
  }
}

async function run() {
  await tryInsertEmpty('site_settings');
  await tryInsertEmpty('jobs');
}

run().catch(console.error);
