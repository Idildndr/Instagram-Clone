import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zqhfyaogkxyaxbujetnx.supabase.co' //username and below it is the password
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxaGZ5YW9na3h5YXhidWpldG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA3NzcwOTksImV4cCI6MjAyNjM1MzA5OX0.h0_4uglHgy2O9bLQmyYN8FOX0dDi6fgfyNwHvXd-oq8"
export const supabase = createClient(supabaseUrl, supabaseKey)