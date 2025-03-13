CREATE TABLE "category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255),
	CONSTRAINT "category_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "customer" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" text NOT NULL,
	"comments" text NOT NULL,
	CONSTRAINT "customer_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "datebook" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" timestamp with time zone NOT NULL,
	"eventname" text,
	"notes" text,
	CONSTRAINT "datebook_date_unique" UNIQUE("date")
);
--> statement-breakpoint
CREATE TABLE "faq" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" text NOT NULL,
	"answers" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "image" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"catid" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "image" ADD CONSTRAINT "image_catid_category_id_fk" FOREIGN KEY ("catid") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE no action;