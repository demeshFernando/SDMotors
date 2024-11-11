import { type ComponentPropsWithoutRef } from "react";

type textBoxProps = {
  name: string;
  id: string;
  type?: never;
  placeHolder?: string;
} & ComponentPropsWithoutRef<"input">;

export default function TextBox({
  name,
  id,
  placeHolder = "",
  ...otherProps
}: textBoxProps) {
  const GenerateClassNames = (): string => {
    return "input-padding";
  };
  return (
    <input
      placeholder={placeHolder}
      type="text"
      name={name}
      id={id}
      className={GenerateClassNames()}
      {...otherProps}
    />
  );
}
