import { useEffect, useState } from "react";
import { ingredient, recipe } from "../lib/utils/interfaces";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

const IngredientSelect = ({
  index,
  recipeIngredients,
  register,
  setValue,
  id,
  watch,
}: {
  index: number;
  recipeIngredients: ingredient[];
  register: UseFormRegister<recipe>;
  setValue: UseFormSetValue<recipe>;
  id: number;
  watch: UseFormWatch<recipe>;
}) => {
  const [showEditIngredient, setShowEditIngredient] = useState(false);

  useEffect(() => {
    if (id > 0) {
      setShowEditIngredient(true);
      if (recipeIngredients) {
        setValue(
          `Ingredients.${index}.Ingredient.Id`,
          recipeIngredients[index].Id,
        );
        setValue(
          `Ingredients.${index}.Quantity`,
          recipeIngredients[index].Quantity,
        );
      }
    }
  }, [setValue]);

  return (
    <div className="flex items-center gap-3" id="ingredientRow">
      <select
        className={`h-full w-full basis-2/3 cursor-pointer rounded-md border border-[lightGrey] bg-White px-4 py-1.5 disabled:opacity-50`}
        disabled={id > 0}
        name="ingredient"
        {...register(`Ingredients.${index}.Ingredient.Id`)}
      >
        <option value="" onClick={() => setShowEditIngredient(false)}>
          Select Ingredient
        </option>
        {recipeIngredients &&
          recipeIngredients.map((item, index) => {
            return (
              <option
                key={index}
                onClick={() => setShowEditIngredient(true)}
                value={item.Id}
              >
                {item.Name}
              </option>
            );
          })}
      </select>

      <input
        type="number"
        name={`ingredients[${index}].Quantity`}
        placeholder="Qty"
        className="w-full basis-1/3 rounded-md border border-[lightGrey] px-4 py-1.5"
        {...register(`Ingredients.${index}.Quantity`)}
      />
    </div>
  );
};

export default IngredientSelect;
