"use client";

import {
  createIngredient,
  deleteIngredient,
  getIngredientById,
} from "@/app/lib/data";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";

const Page = ({ params }) => {
  const id = params.id;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getIngredientById(id).then((data) => {
      if (data != null) {
        reset({
          name: data.Name,
          um: data.UM,
          carbs: data.Carbs,
          proteins: data.Proteins,
          fat: data.Fat,
          countable: data.Countable,
          quantity: data.Quantity,
          calories: data.Calories,
        });
      }
    });
  }, []);

  const createIngredientWithId = createIngredient.bind(id, null);

  const onSubmit = (data) => createIngredient(id, data);

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
            <label htmlFor="name" className={`text-sm`}>
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className={`rounded-md border border-[lightGrey] px-4 py-1.5 outline-none ${errors.name && "border-Red placeholder:text-Red placeholder:opacity-50"}`}
              {...register("name", { required: true })}
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
              className={`rounded-md border border-[lightGrey] px-4 py-1.5 outline-none ${errors.um && "border-Red placeholder:text-Red placeholder:opacity-50"}`}
              {...register("um", { required: true })}
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
              step={0.1}
              className={`rounded-md border border-[lightGrey] px-4 py-1.5 outline-none ${errors.carbs && "border-Red placeholder:text-Red placeholder:opacity-50"}`}
              {...register("carbs", { required: true })}
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
              step={0.1}
              className={`rounded-md border border-[lightGrey] px-4 py-1.5 outline-none ${errors.proteins && "border-Red placeholder:text-Red placeholder:opacity-50"}`}
              {...register("proteins", { required: true })}
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
              step={0.1}
              className={`rounded-md border border-[lightGrey] px-4 py-1.5 outline-none ${errors.fat && "border-Red placeholder:text-Red placeholder:opacity-50"}`}
              {...register("fat", { required: true })}
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
              {...register("countable")}
            />
          </div>
          {/* Quantity */}
          {!watch("countable") && (
            <div className="grid gap-y-2">
              <label htmlFor="quantity" className="text-sm">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                className={`rounded-md border border-[lightGrey] px-4 py-1.5 outline-none ${errors.quantity && "border-Red placeholder:text-Red placeholder:opacity-50"}`}
                {...register("quantity", { required: true })}
              />
            </div>
          )}
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
