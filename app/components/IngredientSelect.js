import { useEffect, useState } from "react";
import UpdateIngredient from "./UpdateIngredient";
import { MdEdit } from "react-icons/md";

const IngredientSelect = ({
  index,
  ingredients,
  register,
  setValue,
  id,
  watch,
}) => {
  const [showEditIngredient, setShowEditIngredient] = useState(false);

  useEffect(() => {
    if (ingredients && id > 0) {
      setValue(
        `ingredients[${index}].Ingredient.Name`,
        ingredients[index].Ingredient.Name,
      );
      setValue(`ingredients[${index}].quantity`, ingredients[index].Quantity);
      setShowEditIngredient(true);
    }
  });

  return (
    <div className="flex items-center gap-3" id="ingredientRow">
      <select
        className="h-full w-full basis-2/3 rounded-md border border-[lightGrey] bg-White px-4 py-1.5"
        name="ingredient"
        {...register(`ingredients[${index}].Ingredient.Name`)}
      >
        <option value="" onClick={() => setShowEditIngredient(false)}>
          Select Ingredient
        </option>
        {ingredients &&
          ingredients.map((item, index) => {
            return (
              <option key={index} onClick={() => setShowEditIngredient(true)}>
                {item.Ingredient.Name}
              </option>
            );
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
        id={watch(`ingredients[${index}].IngredientId`)}
        icon={<MdEdit className="m-auto h-full font-OutfitBold text-Nutmeg" />}
      />
    </div>
  );
};

export default IngredientSelect;
