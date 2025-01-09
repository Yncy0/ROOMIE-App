drop policy "ALL" on "public"."booked_rooms";

drop policy "Enable read access for all users" on "public"."booked_rooms";

alter table "public"."rooms" drop constraint "rooms_building_id_fkey";

alter table "public"."schedule" drop constraint "schedule_course_id_fkey";

alter table "public"."schedule" drop constraint "schedule_profile_id_fkey";

alter table "public"."schedule" drop constraint "schedule_subject_id_fkey";

alter table "public"."booked_rooms" drop column "time_in";

alter table "public"."booked_rooms" drop column "time_out";

alter table "public"."booked_rooms" add column "course_and_section" text;

alter table "public"."booked_rooms" add column "profile_id" uuid;

alter table "public"."booked_rooms" add column "room_id" uuid;

alter table "public"."booked_rooms" add column "subject_name" text;

alter table "public"."booked_rooms" add column "time" text;

alter table "public"."booked_rooms" alter column "id" set default gen_random_uuid();

alter table "public"."booked_rooms" alter column "id" drop identity;

alter table "public"."booked_rooms" alter column "id" set data type uuid using "id"::uuid;

alter table "public"."booked_rooms" add constraint "booked_rooms_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."booked_rooms" validate constraint "booked_rooms_profile_id_fkey";

alter table "public"."booked_rooms" add constraint "booked_rooms_room_id_fkey" FOREIGN KEY (room_id) REFERENCES rooms(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."booked_rooms" validate constraint "booked_rooms_room_id_fkey";

alter table "public"."rooms" add constraint "rooms_building_id_fkey" FOREIGN KEY (building_id) REFERENCES building(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."rooms" validate constraint "rooms_building_id_fkey";

alter table "public"."schedule" add constraint "schedule_course_id_fkey" FOREIGN KEY (course_id) REFERENCES course(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."schedule" validate constraint "schedule_course_id_fkey";

alter table "public"."schedule" add constraint "schedule_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."schedule" validate constraint "schedule_profile_id_fkey";

alter table "public"."schedule" add constraint "schedule_subject_id_fkey" FOREIGN KEY (subject_id) REFERENCES subject(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."schedule" validate constraint "schedule_subject_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$function$
;


