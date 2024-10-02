-- CreateTable
CREATE TABLE "Type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workout" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "elapsed_time" INTEGER NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "total_elevation_gain" DOUBLE PRECISION NOT NULL,
    "sport_type" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "start_date_local" TIMESTAMP(3) NOT NULL,
    "timezone" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "calories" DOUBLE PRECISION NOT NULL,
    "utc_offset" INTEGER,
    "start_latlng" JSONB,
    "end_latlng" JSONB,
    "achievement_count" INTEGER,
    "kudos_count" INTEGER,
    "comment_count" INTEGER,
    "athlete_count" INTEGER,
    "photo_count" INTEGER,
    "map" JSONB,
    "average_speed" DOUBLE PRECISION,
    "max_speed" DOUBLE PRECISION,
    "average_cadence" DOUBLE PRECISION,
    "average_temp" INTEGER,
    "average_watts" DOUBLE PRECISION,
    "weoghted_average_watts" DOUBLE PRECISION,
    "kilojoules" DOUBLE PRECISION,
    "max_watts" DOUBLE PRECISION,
    "elev_high" DOUBLE PRECISION,
    "elev_low" DOUBLE PRECISION,
    "workout_type" TEXT,
    "suffer_score" DOUBLE PRECISION,
    "typeId" INTEGER NOT NULL,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
