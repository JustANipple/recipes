import Link from "next/link";
import { RxCross2 } from "react-icons/rx";

const Ingredient = ({
  showIngredientsForm,
  setShowIngredientsForm,
  handlePlusClick,
}) => {
  return (
    <>
      <div
        className={`m-auto grid gap-y-9 bg-White p-8 md:my-32 md:max-w-desktop md:rounded-3xl md:p-10 md:pb-6 ${showIngredientsForm ? "" : "hidden"}`}
      >
        <div className="flex justify-between">
          <h1 className="font-Youngserif text-4xl text-DarkCharcoal md:text-[2.5rem]">
            New/Edit Ingredient
          </h1>
          <Link href="/">
            <RxCross2
              className="font-OutfitBold text-Nutmeg"
              onClick={handlePlusClick}
            />
          </Link>
        </div>
        <hr className="border-LightGrey" />
        <div className="grid gap-y-5">
          <form
            action="#"
            className="grid gap-y-4 font-Outfit text-WengeBrown"
            id="editForm"
          >
            {/* Name */}
            <div className="grid gap-y-2">
              <label htmlFor="name" className="text-sm">
                ImageLink
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                className="rounded-md border border-[lightGrey] px-4 py-1.5"
              />
            </div>
            {/* UM */}
            <div className="grid gap-y-2">
              <label htmlFor="um" className="text-sm">
                Title
              </label>
              <input
                type="text"
                name="um"
                id="um"
                placeholder="UM"
                className="rounded-md border border-[lightGrey] px-4 py-1.5"
              />
            </div>
          </form>
        </div>
        <hr className="border-LightGrey" />
        <button
          className="text-black ml-auto flex gap-1 rounded-md bg-LightGrey px-4 py-2"
          type="submit"
          form="editForm"
        >
          <p className="my-auto font-Outfit text-Nutmeg">Save</p>
        </button>
      </div>
    </>
  );
};

export default Ingredient;
