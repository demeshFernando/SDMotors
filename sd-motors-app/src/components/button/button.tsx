import { useState, type ComponentPropsWithoutRef, type ReactNode } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import iconsSet from "../../styles/functional/fontawesomeIcons";

/**
 * Owner: Demesh Fernando
 * Last Updated Date: October 23, 2024
 * Description: This type definition will
 * specifically added when extending a drop down type button.
 */
type DropDownButtons = {
  buttonType: "WithDropDownMenu";
  buttonBackgroundColor: "general-blue" | "general-white";
  dropDownItems: { iconName: keyof typeof iconsSet; mainHeader: string }[];
  children: ReactNode;
  onClick?: never;
  className?: never;
} & ComponentPropsWithoutRef<"button">;

/**
 * Owner: Demesh Fernando
 * Last Updated Date: October 23, 2024
 * Description: This type definition will
 * specifically added when extending a normal type button.
 */
type NormalTypeButtons = {
  buttonType: "Normal";
  buttonBackgroundColor: "general-blue" | "general-white";
  children: ReactNode;
} & ComponentPropsWithoutRef<"button">;

/**
 * Owner: Demesh Fernando
 * Last Updated Date: October 23, 2024
 * Description: This type definition will
 * take care of the state that has been defined to listen to the state changes.
 */
type isDropDownActive = {
  Status: boolean;
  ClassNames: string;
};

type ButtonProps = NormalTypeButtons | DropDownButtons;

export default function Button(props: ButtonProps) {
  const [isDropDownActive, setIsDrownActive] = useState<isDropDownActive>({
    Status: false,
    ClassNames: "user-account-name general-blue",
  });

  function toggleDropDown() {
    setIsDrownActive((prevActiveStatus) => {
      return {
        Status: !prevActiveStatus.Status,
        ClassNames: !prevActiveStatus.Status
          ? "user-account-name general-white"
          : "user-account-name general-blue",
      };
    });
  }
  const {
    children,
    buttonType,
    buttonBackgroundColor,
    className,
    ...otherProps
  } = props;
  if (buttonType === "Normal") {
    return (
      <button
        className={
          buttonBackgroundColor === "general-blue"
            ? "general-blue"
            : "general-white"
        }
        {...otherProps}
      >
        <h3
          className={
            buttonBackgroundColor === "general-blue"
              ? "font-white"
              : "font-blue"
          }
        >
          {children}
        </h3>
      </button>
    );
  } else {
    let { dropDownItems } = props;
    return (
      <button
        onClick={toggleDropDown}
        className={isDropDownActive.ClassNames}
        {...otherProps}
      >
        <>
          <div className="user-name">
            <h3
              className={isDropDownActive.Status ? "font-black" : "font-white"}
            >
              {children}
            </h3>
          </div>
          <h3 className={isDropDownActive.Status ? "font-black" : "font-white"}>
            <FontAwesomeIcon icon={iconsSet.faAngleDown} />
          </h3>
          {isDropDownActive.Status ? (
            <div className="drop-down-box">
              {dropDownItems.map((dropDownItem, index) => {
                return (
                  <div key={index}>
                    <FontAwesomeIcon
                      className="icon"
                      icon={iconsSet[dropDownItem.iconName]}
                    />
                    <div className="children-items">
                      {dropDownItem.mainHeader}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
        </>
      </button>
    );
  }
}
