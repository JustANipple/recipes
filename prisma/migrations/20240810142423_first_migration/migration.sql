-- CreateTable
CREATE TABLE "ingredients" (
    "Name" VARCHAR NOT NULL,
    "Carbs" REAL,
    "Proteins" REAL,
    "Fat" REAL,
    "Countable" BOOLEAN,
    "Id" SERIAL NOT NULL,
    "Quantity" REAL,

    CONSTRAINT "ingredients_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "ingredientsRelationships" (
    "RecipeId" INTEGER NOT NULL,
    "IngredientId" INTEGER NOT NULL,
    "Quantity" REAL,

    CONSTRAINT "ingredientsRelationships_pkey" PRIMARY KEY ("RecipeId","IngredientId")
);

-- CreateTable
CREATE TABLE "instructions" (
    "Id" SERIAL NOT NULL,
    "Title" VARCHAR NOT NULL,
    "Description" VARCHAR,
    "RecipeId" INTEGER,

    CONSTRAINT "instructions_pkey" PRIMARY KEY ("Title")
);

-- CreateTable
CREATE TABLE "recipes" (
    "Id" SERIAL NOT NULL,
    "ImageLink" VARCHAR,
    "Title" VARCHAR,
    "Description" VARCHAR,
    "PreparationTime" DOUBLE PRECISION,
    "CookingTime" DOUBLE PRECISION,

    CONSTRAINT "recipes_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ingredients_Id_key" ON "ingredients"("Id");

-- CreateIndex
CREATE UNIQUE INDEX "instructions_Id_key" ON "instructions"("Id");

-- AddForeignKey
ALTER TABLE "ingredientsRelationships" ADD CONSTRAINT "ingredientsRelationships_IngredientId_fkey" FOREIGN KEY ("IngredientId") REFERENCES "ingredients"("Id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ingredientsRelationships" ADD CONSTRAINT "ingredientsRelationships_RecipeId_fkey" FOREIGN KEY ("RecipeId") REFERENCES "recipes"("Id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "instructions" ADD CONSTRAINT "instructions_RecipeId_fkey" FOREIGN KEY ("RecipeId") REFERENCES "recipes"("Id") ON DELETE CASCADE ON UPDATE NO ACTION;
