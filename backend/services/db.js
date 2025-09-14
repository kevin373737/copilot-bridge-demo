import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export async function runQuery(sql) {
  const { data, error } = await supabase.rpc("run_sql", { query: sql });
  if (error) throw error;
  return data;
}
