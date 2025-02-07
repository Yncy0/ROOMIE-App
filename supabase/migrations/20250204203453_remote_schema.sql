create table "public"."building" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "building_name" text,
    "Num_of_rooms" text,
    "Num_of_floors" text,
    "building_image" text
);


alter table "public"."building" enable row level security;

CREATE UNIQUE INDEX building_pkey ON public.building USING btree (id);

alter table "public"."building" add constraint "building_pkey" PRIMARY KEY using index "building_pkey";

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

grant delete on table "public"."building" to "anon";

grant insert on table "public"."building" to "anon";

grant references on table "public"."building" to "anon";

grant select on table "public"."building" to "anon";

grant trigger on table "public"."building" to "anon";

grant truncate on table "public"."building" to "anon";

grant update on table "public"."building" to "anon";

grant delete on table "public"."building" to "authenticated";

grant insert on table "public"."building" to "authenticated";

grant references on table "public"."building" to "authenticated";

grant select on table "public"."building" to "authenticated";

grant trigger on table "public"."building" to "authenticated";

grant truncate on table "public"."building" to "authenticated";

grant update on table "public"."building" to "authenticated";

grant delete on table "public"."building" to "service_role";

grant insert on table "public"."building" to "service_role";

grant references on table "public"."building" to "service_role";

grant select on table "public"."building" to "service_role";

grant trigger on table "public"."building" to "service_role";

grant truncate on table "public"."building" to "service_role";

grant update on table "public"."building" to "service_role";

create policy "ALL"
on "public"."booked_rooms"
as permissive
for all
to public
using (true)
with check (true);


create policy "Enable update for users based on public"
on "public"."rooms"
as permissive
for update
to public
using (true)
with check (true);



