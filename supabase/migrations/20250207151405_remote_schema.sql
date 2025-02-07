alter table "public"."building" drop column "Num_of_floors";

alter table "public"."building" drop column "Num_of_rooms";

alter table "public"."building" add column "num_of_floors" bigint;

alter table "public"."building" add column "num_of_rooms" bigint;

create policy "Enable insert for anon users only"
on "public"."building"
as permissive
for insert
to anon
with check (true);


create policy "Enable read access for all users"
on "public"."building"
as permissive
for select
to public
using (true);


create policy "Enable update for anyone"
on "public"."building"
as permissive
for update
to public
using (true)
with check (true);



