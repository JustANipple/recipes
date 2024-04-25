"use client";

import {
  createIngredient,
  deleteIngredient,
  getIngredient,
} from "@/app/lib/data";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";

const Page = ({ params }) => {
  const id = params.id;

  const [name, setName] = useState("");
  const [um, setUm] = useState("");
  const [carbs, setCarbs] = useState(0);
  const [proteins, setProteins] = useState(0);
  const [fat, setFat] = useState(0);
  const [countable, setCountable] = useState(false);

  const [ingredient, setIngredient] = useState({});

  useEffect(() => {
    getIngredient(id).then((data) => {
      setIngredient(data);
    });
  }, []);

  const createIngredientWithId = createIngredient.bind(null, id);

  return (
    <div
      className={`m-auto grid gap-y-9 bg-White p-8 md:my-32 md:max-w-desktop md:rounded-3xl md:p-10 md:pb-6`}
    >
      <div className="flex justify-between">
        <h1 className="font-Youngserif text-4xl text-DarkCharcoal md:text-[2.5rem]">
          New/Edit Ingredient
        </h1>
        <Link href="/">
          <RxCross2 className="font-OutfitBold text-Nutmeg" />
        </Link>
      </div>
      <hr className="border-LightGrey" />
      <div className="grid gap-y-5">
        <form
          action={createIngredientWithId}
          className="grid gap-y-4 font-Outfit text-WengeBrown"
          id="editForm"
        >
          {/* Name */}
          <div className="grid gap-y-2">
            <label htmlFor="name" className="text-sm">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="rounded-md border border-[lightGrey] px-4 py-1.5"
              onChange={(e) => setName(e.target.value)}
              defaultValue={ingredient != null ? ingredient.Name : ""}
            />
          </div>
          {/* UM */}
          <div className="grid gap-y-2">
            <label htmlFor="um" className="text-sm">
              UM
            </label>
            <input
              type="text"
              name="um"
              placeholder="UM"
              className="rounded-md border border-[lightGrey] px-4 py-1.5"
              onChange={(e) => setUm(e.target.value)}
              defaultValue={ingredient != null ? ingredient.UM : ""}
            />
          </div>
          {/* Carbs */}
          <div className="grid gap-y-2">
            <label htmlFor="carbs" className="text-sm">
              Carbs
            </label>
            <input
              type="number"
              name="carbs"
              placeholder="Carbs"
              className="rounded-md border border-[lightGrey] px-4 py-1.5"
              onChange={(e) => setCarbs(e.target.value)}
              defaultValue={ingredient != null ? ingredient.Carbs : ""}
            />
          </div>
          {/* Proteins */}
          <div className="grid gap-y-2">
            <label htmlFor="proteins" className="text-sm">
              Proteins
            </label>
            <input
              type="number"
              name="proteins"
              placeholder="Proteins"
              className="rounded-md border border-[lightGrey] px-4 py-1.5"
              onChange={(e) => setProteins(e.target.value)}
              defaultValue={ingredient != null ? ingredient.Proteins : ""}
            />
          </div>
          {/* Fat */}
          <div className="grid gap-y-2">
            <label htmlFor="name" className="text-sm">
              Fat
            </label>
            <input
              type="number"
              name="fat"
              placeholder="Fat"
              className="rounded-md border border-[lightGrey] px-4 py-1.5"
              onChange={(e) => setFat(e.target.value)}
              defaultValue={ingredient != null ? ingredient.Fat : ""}
            />
          </div>
          {/* Countable */}
          <div className="grid gap-y-2">
            <label htmlFor="countable" className="text-sm">
              Countable
            </label>
            <input
              type="checkbox"
              name="countable"
              placeholder="Countable"
              id="countable"
              className="w-fit rounded-md border border-[lightGrey] px-4 py-1.5"
              onChange={(e) => setCountable(e.target.checked)}
              defaultChecked={countable ? true : false}
            />
          </div>
          è contabile o no? {ingredient.Countable ? "si" : "no"}
        </form>
      </div>
      <hr className="border-LightGrey" />
      <div className="flex justify-end gap-3 align-middle">
        <button
          className="text-black flex gap-1 rounded-md bg-Red/30 px-4 py-2"
          type="button"
          onClick={() => deleteIngredient(id)}
        >
          <p className="my-auto font-Outfit text-Nutmeg">Delete</p>
        </button>
        <button
          className="text-black flex gap-1 rounded-md bg-LightGrey px-4 py-2"
          type="submit"
          form="editForm"
        >
          <p className="my-auto font-Outfit text-Nutmeg">Save</p>
        </button>
      </div>
    </div>
  );
};

export default Page;
