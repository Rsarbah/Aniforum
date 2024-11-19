// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sykbrueajiqvitjnjeqw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5a2JydWVhamlxdml0am5qZXF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA4NTkyOTEsImV4cCI6MjA0NjQzNTI5MX0.J6_NoiKNocPd7Vid-H4lmpgr6gEFiHwMgiUqLGBE9fI';

export const supabase = createClient(supabaseUrl, supabaseKey);
