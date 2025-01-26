alter table "public"."booked_rooms" drop constraint "profile_id";

alter table "public"."booked_rooms" drop constraint "room_id";

alter table "public"."booked_rooms" add column "date" text;

alter table "public"."booked_rooms" add column "status" text;


