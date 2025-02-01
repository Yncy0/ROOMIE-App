drop policy "ALL" on "public"."building";

drop policy "Enable read access for all users" on "public"."building";

revoke delete on table "public"."building" from "anon";

revoke insert on table "public"."building" from "anon";

revoke references on table "public"."building" from "anon";

revoke select on table "public"."building" from "anon";

revoke trigger on table "public"."building" from "anon";

revoke truncate on table "public"."building" from "anon";

revoke update on table "public"."building" from "anon";

revoke delete on table "public"."building" from "authenticated";

revoke insert on table "public"."building" from "authenticated";

revoke references on table "public"."building" from "authenticated";

revoke select on table "public"."building" from "authenticated";

revoke trigger on table "public"."building" from "authenticated";

revoke truncate on table "public"."building" from "authenticated";

revoke update on table "public"."building" from "authenticated";

revoke delete on table "public"."building" from "service_role";

revoke insert on table "public"."building" from "service_role";

revoke references on table "public"."building" from "service_role";

revoke select on table "public"."building" from "service_role";

revoke trigger on table "public"."building" from "service_role";

revoke truncate on table "public"."building" from "service_role";

revoke update on table "public"."building" from "service_role";

alter table "public"."rooms" drop constraint "rooms_building_id_fkey";

alter table "public"."building" drop constraint "building_pkey";

drop index if exists "public"."building_pkey";

drop table "public"."building";

create table "public"."notifications" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid default gen_random_uuid(),
    "body" text
);


alter table "public"."notifications" enable row level security;

alter table "public"."rooms" drop column "building_id";

alter table "public"."rooms" add column "location" text;

alter table "public"."rooms" add column "status" text;

CREATE UNIQUE INDEX notifications_pkey ON public.notifications USING btree (id);

alter table "public"."notifications" add constraint "notifications_pkey" PRIMARY KEY using index "notifications_pkey";

alter table "public"."notifications" add constraint "notifications_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."notifications" validate constraint "notifications_user_id_fkey";

alter table "public"."notifications" add constraint "notifications_user_id_fkey1" FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."notifications" validate constraint "notifications_user_id_fkey1";

grant delete on table "public"."notifications" to "anon";

grant insert on table "public"."notifications" to "anon";

grant references on table "public"."notifications" to "anon";

grant select on table "public"."notifications" to "anon";

grant trigger on table "public"."notifications" to "anon";

grant truncate on table "public"."notifications" to "anon";

grant update on table "public"."notifications" to "anon";

grant delete on table "public"."notifications" to "authenticated";

grant insert on table "public"."notifications" to "authenticated";

grant references on table "public"."notifications" to "authenticated";

grant select on table "public"."notifications" to "authenticated";

grant trigger on table "public"."notifications" to "authenticated";

grant truncate on table "public"."notifications" to "authenticated";

grant update on table "public"."notifications" to "authenticated";

grant delete on table "public"."notifications" to "service_role";

grant insert on table "public"."notifications" to "service_role";

grant references on table "public"."notifications" to "service_role";

grant select on table "public"."notifications" to "service_role";

grant trigger on table "public"."notifications" to "service_role";

grant truncate on table "public"."notifications" to "service_role";

grant update on table "public"."notifications" to "service_role";

create policy "Enable insert for anon users only"
on "public"."notifications"
as permissive
for insert
to anon
with check (true);


create policy "Enable read access for all users"
on "public"."notifications"
as permissive
for select
to public
using (true);


CREATE TRIGGER "notif push" AFTER INSERT OR UPDATE ON public.notifications FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request('https://vjvuhazfxkuqegqlkums.supabase.co/functions/v1/notifications', 'POST', '{"Content-type":"application/json","Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqdnVoYXpmeGt1cWVncWxrdW1zIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMDcyNjM1MSwiZXhwIjoyMDQ2MzAyMzUxfQ.b97QQyab0KNztTyatPeKy-iZGxy3p3tlmuiTOSOTwa8"}', '{}', '1000');


