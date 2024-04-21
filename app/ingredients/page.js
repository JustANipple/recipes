import Link from "next/link";
import { RxCross2 } from "react-icons/rx";
import Ingredient from "../components/Ingredient";
import IngredientForm from "../components/IngredientForm";

const Page = () => {
  return (
    <>
      <Ingredient />
      <IngredientForm />
    </>
  );
};

export default Page;
