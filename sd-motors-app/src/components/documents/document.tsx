import { useState } from "react";

import Button from "../inputs/button.tsx";
import TextBox from "../inputs/text.tsx";
import ListItems from "../listView.tsx/list-view.tsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import iconsSet from "../../styles/functional/fontawesomeIcons";

export default function Document() {
  const [handleClick, setHandleClick] = useState();

  return (
    <div className="documents-list-view">
      <div className="documents-list-header">
        <div className="left-section">
          <TextBox id="search" name="search" placeHolder="Search documents" />
          <Button
            buttonType="Normal"
            buttonBackgroundColor="Secondary"
            buttonStyle="Flat"
            spaceAround="Left"
          >
            <FontAwesomeIcon icon={iconsSet["faMagnifyingGlass"]} />
          </Button>
          <Button
            buttonType="Normal"
            buttonBackgroundColor="Secondary"
            buttonStyle="Flat"
            spaceAround="Left"
          >
            <FontAwesomeIcon icon={iconsSet["faRotate"]} />
          </Button>
        </div>
        <div className="right-section">
          <Button
            buttonType="Normal"
            buttonBackgroundColor="Secondary"
            buttonStyle="Flat"
          >
            <FontAwesomeIcon
              className="inline-icon-right"
              icon={iconsSet["faPlus"]}
            />
            New Document
          </Button>
          <Button
            buttonType="WithDropDownMenu"
            buttonBackgroundColor="general-white"
            buttonStyle="Flat"
            spaceAround="Left"
            dropDownItems={[
              {
                iconName: "faTrashCan",
                mainHeader: "Delete",
              },
            ]}
          >
            Actions
          </Button>
        </div>
      </div>
      <div className="documents-list-body">
        <ListItems
          headerItems={[
            <input type="checkbox" name="select" id="select" />,
            "ID",
            "Name",
            "Created Date",
            "Created By",
          ]}
          grandElements={[[]]}
        />
      </div>
    </div>
  );
}
