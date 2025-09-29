-- CreateTable
CREATE TABLE "public"."enterprise" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "enterprise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."flyway_schema_history" (
    "installed_rank" INTEGER NOT NULL,
    "version" VARCHAR(50),
    "description" VARCHAR(200) NOT NULL,
    "type" VARCHAR(20) NOT NULL,
    "script" VARCHAR(1000) NOT NULL,
    "checksum" INTEGER,
    "installed_by" VARCHAR(100) NOT NULL,
    "installed_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "execution_time" INTEGER NOT NULL,
    "success" BOOLEAN NOT NULL,

    CONSTRAINT "flyway_schema_history_pk" PRIMARY KEY ("installed_rank")
);

-- CreateTable
CREATE TABLE "public"."logs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID,
    "action" VARCHAR(100) NOT NULL,
    "entity" VARCHAR(50) NOT NULL,
    "entity_id" UUID,
    "new_value" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sector" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,
    "enterprise_id" UUID NOT NULL,

    CONSTRAINT "sector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sub_sector" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,
    "sector_id" UUID NOT NULL,

    CONSTRAINT "sub_sector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."task_members" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "task_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "task_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."task_sub_sector" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "task_id" UUID NOT NULL,
    "sub_sector_id" UUID NOT NULL,

    CONSTRAINT "task_sub_sector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tasks" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),
    "finished_at" TIMESTAMP(6),
    "enterprise_id" UUID NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "type" VARCHAR(10),
    "enterprise_id" UUID,
    "sub_sector_id" UUID,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "flyway_schema_history_s_idx" ON "public"."flyway_schema_history"("success");

-- CreateIndex
CREATE INDEX "idx_logs_user_action" ON "public"."logs"("user_id", "action");

-- CreateIndex
CREATE INDEX "idx_task_members_user" ON "public"."task_members"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "uq_task_members" ON "public"."task_members"("task_id", "user_id");

-- CreateIndex
CREATE INDEX "idx_task_sub_sector_sub" ON "public"."task_sub_sector"("sub_sector_id");

-- CreateIndex
CREATE UNIQUE INDEX "uq_task_sub_sector" ON "public"."task_sub_sector"("task_id", "sub_sector_id");

-- CreateIndex
CREATE INDEX "idx_task_status" ON "public"."tasks"("status");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- AddForeignKey
ALTER TABLE "public"."logs" ADD CONSTRAINT "fk_log_user" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."sector" ADD CONSTRAINT "fk_sector_enterprise" FOREIGN KEY ("enterprise_id") REFERENCES "public"."enterprise"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."sub_sector" ADD CONSTRAINT "fk_sub_sector_sector" FOREIGN KEY ("sector_id") REFERENCES "public"."sector"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."task_members" ADD CONSTRAINT "fk_task_member_task" FOREIGN KEY ("task_id") REFERENCES "public"."tasks"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."task_members" ADD CONSTRAINT "fk_task_member_user" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."task_sub_sector" ADD CONSTRAINT "fk_task_sub_sector_sub_sector" FOREIGN KEY ("sub_sector_id") REFERENCES "public"."sub_sector"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."task_sub_sector" ADD CONSTRAINT "fk_task_sub_sector_task" FOREIGN KEY ("task_id") REFERENCES "public"."tasks"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."tasks" ADD CONSTRAINT "fk_task_enterprise" FOREIGN KEY ("enterprise_id") REFERENCES "public"."enterprise"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "fk_user_enterprise" FOREIGN KEY ("enterprise_id") REFERENCES "public"."enterprise"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "fk_user_sub_sector" FOREIGN KEY ("sub_sector_id") REFERENCES "public"."sub_sector"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
