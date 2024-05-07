import { useState } from "react";

const InstructionInput = ({ register }) => {
  const [instruction, setInstruction] = useState();

  return (
    <input
      type="text"
      name="instruction"
      id="instruction"
      placeholder="Instruction"
      className="rounded-md border border-[lightGrey] px-4 py-1.5"
      onChange={(e) => setInstruction(e.target.value)}
      value={instruction}
      {...register("instruction")}
    />
  );
};

export default InstructionInput;
