import { type ComponentPropsWithoutRef } from "react";

type textBoxProps = {
  name: string;
  id: string;
  type?: never;
  placeHolder?: string;
} & ComponentPropsWithoutRef<"text">;

export default function TextBox({ name, id, placeHolder = "" }: textBoxProps) {
  const GenerateClassNames = (): string => {
    return "input-padding";
  };
  return (
    <input
      placeholder={placeHolder}
      className={GenerateClassNames()}
      type="text"
      name={name}
      id={id}
    />
  );
}
