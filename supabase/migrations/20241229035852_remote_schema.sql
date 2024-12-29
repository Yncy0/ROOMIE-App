create policy "Enable read access for all users"
on "public"."schedule"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."subject"
as permissive
for select
to public
using (true);



