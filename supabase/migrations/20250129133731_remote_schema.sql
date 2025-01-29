drop policy "Users can insert their own profile." on "public"."profiles";

alter table "public"."rooms" drop constraint "rooms_building_id_fkey";

alter table "public"."schedule" drop constraint "schedule_course_id_fkey";

alter table "public"."schedule" drop constraint "schedule_profile_id_fkey";

alter table "public"."schedule" drop constraint "schedule_room_id_fkey";

alter table "public"."schedule" drop constraint "schedule_subject_id_fkey";

create table "public"."backlogs" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "action" text,
    "event" text
);


alter table "public"."backlogs" enable row level security;

alter table "public"."booked_rooms" alter column "date" set data type date using "date"::date;

alter table "public"."profiles" add column "email" text;

alter table "public"."profiles" add column "expo-push-token" text;

alter table "public"."profiles" add column "is_archived" boolean;

alter table "public"."profiles" add column "mobile_number" text;

alter table "public"."profiles" add column "user_department" text;

alter table "public"."profiles" add column "user_role" text;

alter table "public"."rooms" add column "is_archived" boolean;

CREATE UNIQUE INDEX backlogs_pkey ON public.backlogs USING btree (id);

alter table "public"."backlogs" add constraint "backlogs_pkey" PRIMARY KEY using index "backlogs_pkey";

alter table "public"."rooms" add constraint "rooms_building_id_fkey" FOREIGN KEY (building_id) REFERENCES building(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."rooms" validate constraint "rooms_building_id_fkey";

alter table "public"."schedule" add constraint "schedule_course_id_fkey" FOREIGN KEY (course_id) REFERENCES course(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."schedule" validate constraint "schedule_course_id_fkey";

alter table "public"."schedule" add constraint "schedule_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."schedule" validate constraint "schedule_profile_id_fkey";

alter table "public"."schedule" add constraint "schedule_room_id_fkey" FOREIGN KEY (room_id) REFERENCES rooms(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."schedule" validate constraint "schedule_room_id_fkey";

alter table "public"."schedule" add constraint "schedule_subject_id_fkey" FOREIGN KEY (subject_id) REFERENCES subject(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

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

grant delete on table "public"."backlogs" to "anon";

grant insert on table "public"."backlogs" to "anon";

grant references on table "public"."backlogs" to "anon";

grant select on table "public"."backlogs" to "anon";

grant trigger on table "public"."backlogs" to "anon";

grant truncate on table "public"."backlogs" to "anon";

grant update on table "public"."backlogs" to "anon";

grant delete on table "public"."backlogs" to "authenticated";

grant insert on table "public"."backlogs" to "authenticated";

grant references on table "public"."backlogs" to "authenticated";

grant select on table "public"."backlogs" to "authenticated";

grant trigger on table "public"."backlogs" to "authenticated";

grant truncate on table "public"."backlogs" to "authenticated";

grant update on table "public"."backlogs" to "authenticated";

grant delete on table "public"."backlogs" to "service_role";

grant insert on table "public"."backlogs" to "service_role";

grant references on table "public"."backlogs" to "service_role";

grant select on table "public"."backlogs" to "service_role";

grant trigger on table "public"."backlogs" to "service_role";

grant truncate on table "public"."backlogs" to "service_role";

grant update on table "public"."backlogs" to "service_role";

create policy "Enable insert for authenticated users only"
on "public"."backlogs"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable insert for public users only"
on "public"."backlogs"
as permissive
for insert
to anon
with check (true);


create policy "Enable read access for all users"
on "public"."backlogs"
as permissive
for select
to public
using (true);


create policy "Enable update public"
on "public"."booked_rooms"
as permissive
for update
to public
using (true)
with check (true);


create policy "Enable insert for anon only"
on "public"."profiles"
as permissive
for insert
to anon
with check (true);


create policy "Enable insert for authenticated users only"
on "public"."profiles"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable update for users based on email"
on "public"."profiles"
as permissive
for update
to public
using (true)
with check (true);



