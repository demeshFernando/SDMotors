import CreatedDocuments from "../model/CreatedDocuments.tsx";
import Staff from "../model/Staff.tsx";

import moment from "../functionalitites/moment.tsx";

type documentHeader = (string | JSX.Element)[];
type documentRow = documentHeader;

export type getDocumentsListReturnProps = {
  documentHeader: documentHeader;
  documents: documentRow[];
};
export function GetDocumentsList(): getDocumentsListReturnProps {
  let collectedDocumentsList: documentRow[] = [];
  let documentHeader: documentHeader = [
    <input type="checkbox" name="select" id="select" />,
    "ID",
    "Version",
    "Name",
    "Created Date",
    "Created By",
  ];

  CreatedDocuments.map((document, index) => {
    let staffName = "System";

    Staff.map((StaffMember) => {
      if (document.CreatedBy === StaffMember.ID) {
        staffName = `${StaffMember.FirstName} ${StaffMember.LastName}`;
      }
    });

    let tempObject: documentRow = [
      <input type="checkbox" name="select" id={`${index}`} />,
      `${document.EvaluatedDocumentID}`,
      `${document.EvaluatedDocumentVersion}`,
      document.DocumentName,
      moment.FormatSpecificDate(new Date(document.CreatedDate)),
      staffName,
    ];
    collectedDocumentsList = [...collectedDocumentsList, tempObject];
  });

  let returnObject: getDocumentsListReturnProps = {
    documentHeader: documentHeader,
    documents: collectedDocumentsList,
  };

  return returnObject;
}
