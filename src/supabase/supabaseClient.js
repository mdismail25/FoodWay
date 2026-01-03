import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://saxlglhkgbxlwwzyngub.supabase.co"
const supabaseAnonKey =
  "sb_publishable_l8OCaRPY759JDS-IDew7HA_RXCVlvHP"

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)
