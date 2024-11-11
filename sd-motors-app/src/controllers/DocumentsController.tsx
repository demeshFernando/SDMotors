import CreatedDocuments from "../model/CreatedDocuments.tsx";
import Staff from "../model/Staff.tsx";

import moment from "../functionalitites/moment.tsx";

type documentHeader = (string | JSX.Element)[];
type documentRow = documentHeader;

export type getDocumentsListReturnProps = {
  documentHeader: documentHeader;
  documents: documentRow[];
};
export function GetDocumentsList(
  searchValue: string
): getDocumentsListReturnProps {
  let collectedDocumentsList: documentRow[] = [];
  let documentHeader: documentHeader = [
    <input type="checkbox" name="select" id="select" />,
    "ID",
    "Version",
    "Name",
    "Created Date",
    "Created By",
  ];

  let DocumentName: documentRow[] = [];
  let EvaluatedDocumentID: documentRow[] = [];
  let isFilteringRequired: boolean = false;
  CreatedDocuments.map((document, index) => {
    let staffName = "System";
    Staff.map((StaffMember) => {
      if (document.CreatedBy === StaffMember.ID) {
        staffName = `${StaffMember.FirstName} ${StaffMember.LastName}`;
      }
    });

    //checking whether filtering is required
    if (searchValue !== "") {
      //extracting the text
      if (FilterItems(searchValue, document["DocumentName"])) {
        DocumentName = [
          ...DocumentName,
          [
            <input type="checkbox" name="select" id={`${index}`} />,
            `${document.EvaluatedDocumentID}`,
            `${document.EvaluatedDocumentVersion}`,
            document.DocumentName,
            moment.FormatSpecificDate(new Date(document.CreatedDate)),
            staffName,
          ],
        ];
        isFilteringRequired = true;
      } else if (
        FilterItems(searchValue, document["EvaluatedDocumentID"].toString())
      ) {
        EvaluatedDocumentID = [
          ...EvaluatedDocumentID,
          [
            <input type="checkbox" name="select" id={`${index}`} />,
            `${document.EvaluatedDocumentID}`,
            `${document.EvaluatedDocumentVersion}`,
            document.DocumentName,
            moment.FormatSpecificDate(new Date(document.CreatedDate)),
            staffName,
          ],
        ];
        isFilteringRequired = true;
      }
    } else {
      let tempObject: documentRow = [
        <input type="checkbox" name="select" id={`${index}`} />,
        `${document.EvaluatedDocumentID}`,
        `${document.EvaluatedDocumentVersion}`,
        document.DocumentName,
        moment.FormatSpecificDate(new Date(document.CreatedDate)),
        staffName,
      ];
      collectedDocumentsList = [...collectedDocumentsList, tempObject];
    }
  });
  if (isFilteringRequired) {
    for (let i = 0; i < DocumentName.length; i++) {
      collectedDocumentsList = [...collectedDocumentsList, DocumentName[i]];
    }
    for (let i = 0; i < EvaluatedDocumentID.length; i++) {
      collectedDocumentsList = [
        ...collectedDocumentsList,
        EvaluatedDocumentID[i],
      ];
    }
  }

  let returnObject: getDocumentsListReturnProps = {
    documentHeader: documentHeader,
    documents: collectedDocumentsList,
  };

  return returnObject;
}

function FilterItems(searchValue: string, searchingString: string): boolean {
  let isSearchFound: boolean = false;
  for (
    let i = 0, j = searchValue.length - 1;
    j < searchingString.length;
    i++, j++
  ) {
    let extractedText: string = "";
    let k = j;
    while (k <= j) {
      extractedText += searchingString[k];
      k++;
    }

    if (extractedText === searchValue) {
      isSearchFound = true;
      break;
    }
  }
  return isSearchFound;
}
