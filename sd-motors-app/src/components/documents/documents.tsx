import { type ChangeEvent, useEffect, useState } from "react";

import { type addingNewTabProps } from "../../functionalitites/types.tsx";

import Button from "../inputs/button.tsx";
import TextBox from "../inputs/text.tsx";
import ListItems from "../listView.tsx/list-view.tsx";
import {
  GetDocumentsList,
  type getDocumentsListReturnProps,
} from "../../controllers/DocumentsController.tsx";
import DocumentView from "./document.tsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import iconsSet from "../../styles/functional/fontawesomeIcons.tsx";
import { OpenNewTab } from "../../functionalitites/common.tsx";

type objectProps = {
  collection: getDocumentsListReturnProps;
};
export default function Document() {
  const [object, setObject] = useState<objectProps>({
    collection: {
      documentHeader: [],
      documents: [[]],
    },
  });
  const [searchTextHolder, setSearchTextHolder] = useState<string>("");

  useEffect(() => {
    setObject({
      collection: GetDocumentsList(""),
    });
  }, []);

  const HandleTextboxTextChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTextHolder(event.target.value);
  };

  const FilterList = (searchValue: string) => {
    setObject({
      collection: GetDocumentsList(searchValue),
    });
  };

  const NewTabInitialization = (tabFor: "document") => {
    let tempObject: addingNewTabProps;

    if (tabFor === "document") {
      tempObject = {
        componentPointer: DocumentView,
        iconName: "faFolderOpen",
        name: "New Document",
      };
      OpenNewTab(tempObject);
    }
  };

  return (
    <div className="documents-list-view">
      <div className="documents-list-header">
        <div className="left-section">
          <TextBox
            onChange={HandleTextboxTextChanges}
            id="search"
            name="search"
            placeHolder="Search documents"
            value={searchTextHolder}
          />
          <Button
            buttonType="Normal"
            buttonBackgroundColor="Secondary"
            buttonStyle="Flat"
            spaceAround="Left"
            onClick={() => {
              FilterList(searchTextHolder);
            }}
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
            onClick={() => {
              NewTabInitialization("document");
            }}
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
          headerItems={object.collection.documentHeader}
          grandElements={object.collection.documents}
        />
      </div>
    </div>
  );
}
