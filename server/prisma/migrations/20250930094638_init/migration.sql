-- CreateTable
CREATE TABLE "players" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_login" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "player_resources" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "player_id" TEXT NOT NULL,
    "energy_cores" INTEGER NOT NULL DEFAULT 1000,
    "nanobots" INTEGER NOT NULL DEFAULT 500,
    "scrap_metal" INTEGER NOT NULL DEFAULT 500,
    "data_chips" INTEGER NOT NULL DEFAULT 100,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "player_resources_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "bases" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "player_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "bases_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "buildings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "base_id" TEXT NOT NULL,
    "building_type" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "position_x" INTEGER NOT NULL,
    "position_y" INTEGER NOT NULL,
    "upgrade_start_time" DATETIME,
    "upgrade_finish_time" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "buildings_base_id_fkey" FOREIGN KEY ("base_id") REFERENCES "bases" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "heroes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "player_id" TEXT NOT NULL,
    "hero_type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rarity" INTEGER NOT NULL DEFAULT 1,
    "level" INTEGER NOT NULL DEFAULT 1,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "health" INTEGER NOT NULL DEFAULT 100,
    "attack" INTEGER NOT NULL DEFAULT 10,
    "defense" INTEGER NOT NULL DEFAULT 10,
    "speed" INTEGER NOT NULL DEFAULT 10,
    "skills" TEXT NOT NULL DEFAULT '[]',
    "enhancements" TEXT NOT NULL DEFAULT '[]',
    "equipment" TEXT NOT NULL DEFAULT '{}',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "heroes_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "alliances" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "leader_id" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "member_count" INTEGER NOT NULL DEFAULT 1,
    "max_members" INTEGER NOT NULL DEFAULT 30,
    "territory" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "alliance_members" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "alliance_id" TEXT NOT NULL,
    "player_id" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'member',
    "joined_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "alliance_members_alliance_id_fkey" FOREIGN KEY ("alliance_id") REFERENCES "alliances" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "alliance_members_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "combat_logs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "player_id" TEXT NOT NULL,
    "combat_type" TEXT NOT NULL,
    "opponent_id" TEXT,
    "result" TEXT NOT NULL,
    "attacking_team" TEXT NOT NULL,
    "defending_team" TEXT NOT NULL,
    "combat_log" TEXT NOT NULL,
    "rewards" TEXT NOT NULL DEFAULT '{}',
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "combat_logs_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "missions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "mission_type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requirements" TEXT NOT NULL DEFAULT '{}',
    "rewards" TEXT NOT NULL DEFAULT '{}',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "start_time" DATETIME NOT NULL,
    "end_time" DATETIME
);

-- CreateIndex
CREATE UNIQUE INDEX "players_username_key" ON "players"("username");

-- CreateIndex
CREATE UNIQUE INDEX "players_email_key" ON "players"("email");

-- CreateIndex
CREATE UNIQUE INDEX "player_resources_player_id_key" ON "player_resources"("player_id");

-- CreateIndex
CREATE UNIQUE INDEX "bases_player_id_key" ON "bases"("player_id");

-- CreateIndex
CREATE UNIQUE INDEX "alliances_name_key" ON "alliances"("name");

-- CreateIndex
CREATE UNIQUE INDEX "alliances_tag_key" ON "alliances"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "alliance_members_player_id_key" ON "alliance_members"("player_id");
