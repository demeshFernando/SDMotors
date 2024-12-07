import {
  type addingNewTabProps,
  type commonElementGenerationType,
} from "./types.tsx";

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

//from the below section the elements will be generated which are common to sd motors
export function GetElement(options: commonElementGenerationType): JSX.Element {
  switch (options.ElementType) {
    case "link":
      return (
        <a className="linked-content-properties" href="#">
          {options.children}
        </a>
      );
    case "td":
      return options.colSpan === undefined ? (
        <td>{options.children}</td>
      ) : (
        <td colSpan={options.colSpan}>{options.children}</td>
      );
    case "th":
      return options.colSpan === undefined ? (
        <th>{options.children}</th>
      ) : (
        <th colSpan={options.colSpan}>{options.children}</th>
      );
    default:
      return <p>{options.children}</p>;
  }
}

//validating whether the incoming value is json or not
export function IsJson(Json: any): boolean {
  try {
    return Json !== null && typeof Json === "object" && !Array.isArray(Json);
  } catch (E) {
    return false;
  }
}
