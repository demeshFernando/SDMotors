import { type addingNewTabProps } from "./types.tsx";

let StateFormat: (object: addingNewTabProps) => void;

export const StateGlobalization = (
  setter: (object: addingNewTabProps) => void
) => {
  StateFormat = setter;
};

export const OpenNewTab = (object: addingNewTabProps) => {
  if (object) {
    StateFormat(object);
  }
};
