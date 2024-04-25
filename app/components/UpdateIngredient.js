import Link from "next/link";
import React from "react";
import { MdEdit } from "react-icons/md";

const UpdateIngredient = ({ showEditIngredient, id, icon }) => {
  return (
    <>
      {showEditIngredient ? (
        <Link
          href={`/ingredients/${id}/edit`}
          className="text-black aspect-square h-full rounded-md bg-LightGrey"
        >
          {/* <MdEdit className="m-auto h-full font-OutfitBold text-Nutmeg" /> */}
          {icon}
        </Link>
      ) : null}
    </>
  );
};

export default UpdateIngredient;