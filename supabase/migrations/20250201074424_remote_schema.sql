alter table "public"."profiles" drop column "expo-push-token";

alter table "public"."profiles" add column "expo_push_token" text;

alter table "public"."schedule" add column "date" date;


