
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://lzrzrzzmaqgojftpjzce.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
// https://youtu.be/25hbImI36zA?si=bnOyvEdfDo1tcn5p