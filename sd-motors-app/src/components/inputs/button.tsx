import { useState, type ComponentPropsWithoutRef, type ReactNode } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import iconsSet from "../../styles/functional/fontawesomeIcons";

type CustomBackgroundColors = "general-blue" | "general-white" | "Secondary";
type ButtonStyle = "Flat" | "Flat-Rounded";

/**
 * Owner: Demesh Fernando
 * Last Updated Date: October 28, 2024
 * Description: This type definition will
 * specifically added when extending a drop down type button.
 */
type DropDownButtons = {
  buttonType: "WithDropDownMenu";
  buttonStyle: ButtonStyle;
  buttonBackgroundColor: CustomBackgroundColors;
  dropDownItems: { iconName: keyof typeof iconsSet; mainHeader: string }[];
  children: ReactNode;
  onClick?: never;
  className?: never;
  type?: never;
} & ComponentPropsWithoutRef<"button">;

/**
 * Owner: Demesh Fernando
 * Last Updated Date: October 23, 2024
 * Description: This type definition will
 * specifically added when extending a normal type button.
 */
type NormalTypeButtons = {
  buttonType: "Normal";
  buttonBackgroundColor: CustomBackgroundColors;
  buttonStyle: ButtonStyle;
  children: ReactNode;
  type?: never;
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
    ClassNames: "user-account-name main-header general-blue flat-rounded",
  });

  const GenerateClassNames = (
    buttonStyle: ButtonStyle,
    buttonType: "Normal" | "WithDropDownMenu",
    buttonBackgroundColor: CustomBackgroundColors
  ): { buttonStyles: string; fontStyles: string } => {
    let fontStyleVarWhite: string = "font-white";
    let fontStyleVarBlack: string = "font-black";
    if (buttonStyle === "Flat") {
      switch (buttonBackgroundColor) {
        case "general-blue":
          return {
            buttonStyles: "general-blue",
            fontStyles: fontStyleVarWhite,
          };
        case "Secondary":
          return {
            buttonStyles: "general-green",
            fontStyles: fontStyleVarWhite,
          };
        case "general-white":
          return {
            buttonStyles: "general-white",
            fontStyles: fontStyleVarBlack,
          };
      }
    } else {
      let buttonStyleVar: string = "";
      if (buttonType === "Normal") {
        buttonStyleVar = "main-header flat-rounded";
        switch (buttonBackgroundColor) {
          case "general-blue":
            return {
              buttonStyles: buttonStyleVar + " general-blue",
              fontStyles: fontStyleVarWhite,
            };
          case "general-white":
            return {
              buttonStyles: buttonStyleVar + " general-white",
              fontStyles: fontStyleVarWhite,
            };
          case "Secondary":
            return { buttonStyles: "", fontStyles: "" };
        }
      } else {
        buttonStyleVar = "user-account-name main-header flat-rounded";
        switch (buttonBackgroundColor) {
          case "general-blue":
            return {
              buttonStyles: buttonStyleVar + " general-blue",
              fontStyles: fontStyleVarWhite,
            };
          case "general-white":
            return {
              buttonStyles: buttonStyleVar + " general-white",
              fontStyles: fontStyleVarBlack,
            };
          case "Secondary":
            return { buttonStyles: "", fontStyles: "" };
        }
      }
    }
  };

  const ToggleDropDown = (): void => {
    setIsDrownActive((prevActiveStatus) => {
      return {
        Status: !prevActiveStatus.Status,
        ClassNames: !prevActiveStatus.Status
          ? GenerateClassNames(buttonStyle, "WithDropDownMenu", "general-white")
              .buttonStyles
          : GenerateClassNames(buttonStyle, "WithDropDownMenu", "general-blue")
              .buttonStyles,
      };
    });
  };
  const {
    children,
    buttonType,
    buttonBackgroundColor,
    className,
    buttonStyle,
    ...otherProps
  } = props;
  if (buttonType === "Normal") {
    return (
      <button
        className={
          GenerateClassNames(buttonStyle, buttonType, buttonBackgroundColor)
            .buttonStyles
        }
        type="button"
        {...otherProps}
      >
        <h3
          className={
            GenerateClassNames(buttonStyle, buttonType, buttonBackgroundColor)
              .fontStyles
          }
        >
          {children}
        </h3>
      </button>
    );
  } else if (buttonType === "WithDropDownMenu") {
    let { dropDownItems } = props;
    return (
      <button
        onClick={ToggleDropDown}
        className={isDropDownActive.ClassNames}
        type="button"
        {...otherProps}
      >
        <>
          <div className="user-name">
            <h3
              className={
                GenerateClassNames(
                  buttonStyle,
                  buttonType,
                  buttonBackgroundColor
                ).fontStyles
              }
            >
              {children}
            </h3>
          </div>
          <h3
            className={
              GenerateClassNames(buttonStyle, buttonType, buttonBackgroundColor)
                .fontStyles
            }
          >
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
