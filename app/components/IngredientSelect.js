import { useEffect, useState } from "react";
import UpdateIngredient from "./UpdateIngredient";
import { MdEdit } from "react-icons/md";

const IngredientSelect = ({
  index,
  ingredientsRecipe,
  register,
  setValue,
  id,
  watch,
}) => {
  const [showEditIngredient, setShowEditIngredient] = useState(false);

  useEffect(() => {
    if (id > 0) {
      setShowEditIngredient(true);
      if (ingredientsRecipe) {
        setValue(
          `ingredients[${index}].Ingredient.Id`,
          ingredientsRecipe[index].Ingredient.Id,
        );
        setValue(
          `ingredients[${index}].quantity`,
          ingredientsRecipe[index].Quantity,
        );
      }
    }
  }, [setValue]);

  return (
    <div className="flex items-center gap-3" id="ingredientRow">
      <select
        className={`h-full w-full basis-2/3 rounded-md border border-[lightGrey] bg-White px-4 py-1.5 disabled:opacity-50`}
        disabled={id > 0}
        name="ingredient"
        {...register(`ingredients[${index}].Ingredient.Id`)}
      >
        <option value="" onClick={() => setShowEditIngredient(false)}>
          Select Ingredient
        </option>
        {ingredientsRecipe &&
          ingredientsRecipe.map((item, index) => {
            return (
              <option
                key={index}
                onClick={() => setShowEditIngredient(true)}
                value={item.Ingredient.Id}
              >
                {item.Ingredient.Name}
              </option>
            );
          })}
      </select>

      <input
        type="number"
        name={`ingredients[${index}].Quantity`}
        placeholder="Qty"
        className="w-full basis-1/3 rounded-md border border-[lightGrey] px-4 py-1.5"
        {...register(`ingredients[${index}].Quantity`)}
      />
    </div>
  );
};

export default IngredientSelect;
