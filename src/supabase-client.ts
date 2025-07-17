import { createClient} from '@supabase/supabase-js';

const supabaseUrl = 'https://gdtlqgnisicagjkadlca.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkdGxxZ25pc2ljYWdqa2FkbGNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzODU2MzEsImV4cCI6MjA2NDk2MTYzMX0.S5jH0LKsyNq2QWGY2vPwI0yy36hU6fNyZNStoRmjQMk';

export const supabase = createClient(supabaseUrl, supabaseKey);