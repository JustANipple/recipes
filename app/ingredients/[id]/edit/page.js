"use client";

import {
  createIngredient,
  deleteIngredient,
  getIngredient,
} from "@/app/lib/data";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";

const Page = ({ params }) => {
  const id = params.id;

  const [name, setName] = useState();
  const [um, setUm] = useState();
  const [carbs, setCarbs] = useState();
  const [proteins, setProteins] = useState();
  const [fat, setFat] = useState();
  const [countable, setCountable] = useState(false);

  useEffect(() => {
    getIngredient(id).then((data) => {
      if (data != null) {
        setName(data.Name);
        setUm(data.UM);
        setCarbs(data.Carbs);
        setProteins(data.Proteins);
        setFat(data.Fat);
        setCountable(data.Countable);
      }
    });
  }, []);

  const createIngredientWithId = createIngredient.bind(null, id);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div
      className={`m-auto grid gap-y-9 bg-White p-8 md:my-32 md:max-w-desktop md:rounded-3xl md:p-10 md:pb-6`}
    >
      <div className="flex justify-between">
        <h1 className="font-Youngserif text-4xl text-DarkCharcoal md:text-[2.5rem]">
          {id > 0 ? "Edit" : "New"} Ingredient
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
          onSubmit={handleSubmit(onSubmit)}
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
              defaultValue={name}
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-xs text-Red">This field is required</span>
            )}
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
              defaultValue={um}
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
              defaultValue={carbs}
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
              defaultValue={proteins}
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
              defaultValue={fat}
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
              id="countable"
              className="w-fit rounded-md border border-[lightGrey] px-4 py-1.5"
              onChange={(e) => setCountable(e.target.checked)}
              checked={countable}
            />
          </div>
        </form>
      </div>
      <hr className="border-LightGrey" />
      <div className="flex justify-end gap-3 align-middle">
        <button
          className="text-black flex gap-1 rounded-md bg-Nutmeg px-4 py-2"
          type="button"
          onClick={() => deleteIngredient(id)}
        >
          <p className="my-auto font-Outfit text-White">Delete</p>
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
