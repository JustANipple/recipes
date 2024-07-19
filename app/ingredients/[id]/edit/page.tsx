"use client";
import {
  createIngredient,
  deleteIngredient,
  getIngredients,
  updateIngredient,
} from "../../../lib/data/ingredients";
import Link from "next/link";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { ingredient } from "../../../lib/utils/interfaces";

const Page = ({ params }) => {
  const id = params.id;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ingredient>();

  useEffect(() => {
    if (id > 0) {
      getIngredients(parseInt(id)).then((data) => {
        if (data != null) {
          console.log(data[0]);
          reset(data[0]);
        }
      });
    }
  }, []);

  const createIngredientWithId = createIngredient.bind(id, null);

  const onSubmit: SubmitHandler<ingredient> = (data) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }

    if (formData.get("Id") != null) {
      updateIngredient(parseInt(formData.get("Id").toString()), formData);
    } else {
      createIngredient(formData);
    }
  };

  return (
    <div
      className={`m-auto grid gap-y-9 bg-White p-8 md:my-32 md:max-w-desktop md:rounded-3xl md:p-10 md:pb-6`}
    >
      <div className="flex justify-between">
        <h1 className="font-Youngserif text-4xl text-DarkCharcoal md:text-[2.5rem]">
          {id > 0 ? "Edit" : "New"} Ingredient
        </h1>
        <Link href="/ingredients">
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
              className={`rounded-md border border-[lightGrey] px-4 py-1.5 outline-none ${errors.Name && "border-Red placeholder:text-Red placeholder:opacity-50"}`}
              {...register("Name", { required: true })}
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
              step={0.01}
              className={`rounded-md border border-[lightGrey] px-4 py-1.5 outline-none ${errors.Carbs && "border-Red placeholder:text-Red placeholder:opacity-50"}`}
              {...register("Carbs", { required: true })}
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
              step={0.01}
              className={`rounded-md border border-[lightGrey] px-4 py-1.5 outline-none ${errors.Proteins && "border-Red placeholder:text-Red placeholder:opacity-50"}`}
              {...register("Proteins", { required: true })}
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
              step={0.01}
              className={`rounded-md border border-[lightGrey] px-4 py-1.5 outline-none ${errors.Fat && "border-Red placeholder:text-Red placeholder:opacity-50"}`}
              {...register("Fat", { required: true })}
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
              {...register("Countable")}
            />
          </div>
          {/* Quantity */}
          {!watch("Countable") && (
            <div className="grid gap-y-2">
              <label htmlFor="quantity" className="text-sm">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                className={`rounded-md border border-[lightGrey] px-4 py-1.5 outline-none ${errors.Quantity && "border-Red placeholder:text-Red placeholder:opacity-50"}`}
                {...register("Quantity", { required: true })}
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
          onClick={() => deleteIngredient(parseInt(id))}
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
