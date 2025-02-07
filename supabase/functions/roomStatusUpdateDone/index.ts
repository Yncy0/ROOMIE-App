// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2.48.1";
import dayjs from "https://cdn.skypack.dev/dayjs";

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

// const timeNow = dayjs().format("HH:mm:ssZ");
const today = dayjs().format("dddd");

const updateRoomsDone = async () => {
  const { data: schedules, error: scheduleError } = await supabase
    .from("schedule")
    .select("room_id")
    .eq("status", "DONE");

  if (scheduleError) throw scheduleError;

  for (const schedule of schedules) {
    const { error } = await supabase
      .from("rooms")
      .update({ status: "AVAILABLE" })
      .eq("id", schedule.room_id);

    if (error) throw error;
  }
};

Deno.serve(async (req) => {
  const { name } = await req.json();

  // Call the main function
  const updatedData = await updateRoomsDone();
  const data = {
    message: `Hello ${name}!`,
    updatedData,
  };

  return new Response(
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json" } },
  );
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/update_schedule_done' \
    --header 'Authorization: Bearer YOUR_TOKEN_HERE' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
