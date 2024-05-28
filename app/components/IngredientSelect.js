import { useEffect, useState } from "react";
import UpdateIngredient from "./UpdateIngredient";
import { MdEdit } from "react-icons/md";

const IngredientSelect = ({ index, ingredients, register }) => {
  const [showEditIngredient, setShowEditIngredient] = useState(false);

  const [ingredientId, setIngredientId] = useState(0);

  console.log(ingredients);
  return (
    <div className="flex items-center gap-3" id="ingredientRow">
      <select
        className="h-full w-full basis-2/3 rounded-md border border-[lightGrey] bg-White px-4 py-1.5"
        name={`ingredients[${index}].id`}
        {...register(`ingredients[${index}].id`)}
      >
        <option value="">Select Ingredient</option>
        {ingredients &&
          ingredients.length > 1 &&
          ingredients.map((item, index) => {
            return <option key={index}>{item.Name}</option>;
          })}
      </select>

      <input
        type="number"
        name={`ingredients[${index}].quantity`}
        placeholder="Qty"
        className="w-full basis-1/3 rounded-md border border-[lightGrey] px-4 py-1.5"
        {...register(`ingredients[${index}].quantity`)}
      />
      <UpdateIngredient
        showEditIngredient={showEditIngredient}
        id={ingredientId}
        icon={<MdEdit className="m-auto h-full font-OutfitBold text-Nutmeg" />}
      />
    </div>
  );
};

export default IngredientSelect;
