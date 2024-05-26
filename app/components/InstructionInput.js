import { useState } from "react";

const InstructionInput = ({ index, register, defaultValue }) => {
  const [instructionDesc, setInstructionDesc] = useState();
  const [instructionTitle, setInstructionTitle] = useState();

  return (
    <div className="flex gap-3">
      <input
        type="text"
        name="instructionTitle"
        placeholder="Title"
        className="basis-1/3 rounded-md border border-[lightGrey] px-4 py-1.5"
        onChange={(e) => setInstructionTitle(e.target.value)}
        value={defaultValue ? defaultValue.Title : ""}
        {...register(`instructions[${index}].title`)}
      />
      <input
        type="text"
        name="instructionDescription"
        placeholder="Description"
        className="basis-2/3 rounded-md border border-[lightGrey] px-4 py-1.5"
        onChange={(e) => setInstructionDesc(e.target.value)}
        value={defaultValue ? defaultValue.Description : ""}
        {...register(`instructions[${index}].description`)}
      />
    </div>
  );
};

export default InstructionInput;
