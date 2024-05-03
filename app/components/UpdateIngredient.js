import Link from "next/link";
import React from "react";

const UpdateIngredient = ({ showEditIngredient, id, icon }) => {
  return (
    <>
      <Link
        href={`/ingredients/${id}/edit`}
        className={`text-black aspect-square h-full rounded-md bg-LightGrey ${showEditIngredient ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-50"}`}
      >
        {icon}
      </Link>
    </>
  );
};

export default UpdateIngredient;
