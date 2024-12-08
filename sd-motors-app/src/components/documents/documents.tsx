import { type ChangeEvent, useEffect, useState } from "react";

import { type addingNewTabProps } from "../../functionalitites/types.tsx";

import Button from "../inputs/button.tsx";
import TextBox from "../inputs/text.tsx";
import ListItems from "../listView.tsx/list-view.tsx";
import {
  GetDocumentsList,
  GetDocumentName,
  type getDocumentsListReturnProps,
} from "../../controllers/DocumentsController.tsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import iconsSet from "../../styles/functional/fontawesomeIcons.tsx";
import { OpenNewTab, GetElement } from "../../functionalitites/common.tsx";

type objectProps = {
  collection: {
    documentHeader: (string | JSX.Element)[];
    documents: (string | JSX.Element)[][];
  };
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
    setObject(FormatCollection(GetDocumentsList("")));
  }, []);

  const FormatCollection = (
    object: getDocumentsListReturnProps
  ): objectProps => {
    if (object.length < 1) {
      return {
        collection: {
          documentHeader: [
            <input type="checkbox" name="select-all" id="select" />,
            "ID",
            "Version",
            "Name",
            "Created Date",
            "Created By",
          ],
          documents: [[]],
        },
      };
    }
    //getting the headers
    let tableHeaders: (string | JSX.Element)[] = [];
    tableHeaders.push(
      <input type="checkbox" name="select-all" id="documentListAll" />
    );
    Object.keys(object[0]).forEach((value) => {
      tableHeaders.push(value);
    });

    //table value generation
    let tableBody: (string | JSX.Element)[][] = [];
    for (let i = 0; i < object.length; i++) {
      let isFirstValueAddon = true;
      let tempTableRow: (string | JSX.Element)[] = [];
      let idGeneration = 0;
      Object.entries(object[i]).forEach(([key, bodyValue]) => {
        if (isFirstValueAddon) {
          tempTableRow.push(
            <input type="checkbox" name={key} id={i + "" + idGeneration} />
          );
          isFirstValueAddon = false;
        }
        tempTableRow.push(
          key === "Name" || key === "Created By"
            ? GetElement({
                children: bodyValue[0].ColumnValue.toString(),
                ElementType: "link",
              })
            : bodyValue[0].ColumnValue.toString()
        );
        idGeneration++;
      });
      tableBody.push(tempTableRow);
    }

    return {
      collection: {
        documentHeader: tableHeaders,
        documents: tableBody,
      },
    };
  };

  const HandleTextboxTextChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTextHolder(event.target.value);
  };

  const FilterList = (searchValue: string) => {
    setObject(FormatCollection(GetDocumentsList(searchValue)));
  };

  const NewTabInitialization = (tabFor: "document") => {
    let tempObject: addingNewTabProps;

    if (tabFor === "document") {
      tempObject = {
        componentKey: "DocumentViewComponent",
        iconName: "faFolderOpen",
        name: "New Document",
        options: {},
      };
      OpenNewTab(tempObject);
    }
  };

  const openDocument = (DocumentID: number, DocumentVersionID: number) => {
    if (DocumentID > -1 && DocumentVersionID > -1) {
      OpenNewTab({
        componentKey: "DocumentViewComponent",
        iconName: "faFolderOpen",
        name: GetDocumentName(DocumentID, DocumentVersionID),
        options: {
          DocumentID: DocumentID,
          DocumentVersionID: DocumentVersionID,
        },
      });
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
                onClick: () => {},
                ActionComponentRequiredProperties: "",
              },
              {
                iconName: "faRecycle",
                mainHeader: "Recycle Bin",
                onClick: () => {},
                ActionComponentRequiredProperties: "",
              },
            ]}
          >
            Actions
          </Button>
        </div>
      </div>
      <div className="documents-list-body">
        <ListItems
          onDocumentOpening={openDocument}
          headerItems={object.collection.documentHeader}
          grandElements={object.collection.documents}
          isOnClickTriggeringRequired={true}
        />
      </div>
    </div>
  );
}
