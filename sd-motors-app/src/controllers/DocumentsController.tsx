import CreatedDocuments from "../model/CreatedDocuments.tsx";
import Staff from "../model/Staff.tsx";

import { type usualTableFormatType } from "../functionalitites/types.tsx";

import moment from "../functionalitites/moment.tsx";

type documentsListType = usualTableFormatType;

export type getDocumentsListReturnProps = documentsListType[];
export function GetDocumentsList(
  searchValue: string
): getDocumentsListReturnProps {
  let collectedDocumentsList: documentsListType[] = [];
  let documentHeader = {
    ID: "ID",
    Version: "Version",
    Name: "Name",
    CreatedDate: "Created Date",
    CreatedBy: "Created By",
  };

  let DocumentName: documentsListType[] = [];
  let EvaluatedDocumentID: documentsListType[] = [];
  let isFilteringRequired: boolean = false;
  CreatedDocuments.map((document) => {
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
          {
            [documentHeader.ID]: [
              {
                ColumnValue: document.EvaluatedDocumentID,
                ValueType: "Normal",
              },
            ],
            [documentHeader.Version]: [
              {
                ColumnValue: document.EvaluatedDocumentVersion,
                ValueType: "Normal",
              },
            ],
            [documentHeader.Name]: [
              { ColumnValue: document.DocumentName, ValueType: "Normal" },
            ],
            [documentHeader.CreatedDate]: [
              {
                ColumnValue: moment.FormatSpecificDate(
                  new Date(document.CreatedDate)
                ),
                ValueType: "Normal",
              },
            ],
            [documentHeader.CreatedBy]: [
              { ColumnValue: staffName, ValueType: "Normal" },
            ],
          },
        ];
        isFilteringRequired = true;
      } else if (
        FilterItems(searchValue, document["EvaluatedDocumentID"].toString())
      ) {
        EvaluatedDocumentID = [
          ...EvaluatedDocumentID,
          {
            [documentHeader.ID]: [
              {
                ColumnValue: document.EvaluatedDocumentID,
                ValueType: "Normal",
              },
            ],
            [documentHeader.Version]: [
              {
                ColumnValue: document.EvaluatedDocumentVersion,
                ValueType: "Normal",
              },
            ],
            [documentHeader.Name]: [
              { ColumnValue: document.DocumentName, ValueType: "Normal" },
            ],
            [documentHeader.CreatedDate]: [
              {
                ColumnValue: moment.FormatSpecificDate(
                  new Date(document.CreatedDate)
                ),
                ValueType: "Normal",
              },
            ],
            [documentHeader.CreatedBy]: [
              { ColumnValue: staffName, ValueType: "Normal" },
            ],
          },
        ];
        isFilteringRequired = true;
      }
    } else {
      let tempObject: documentsListType = {
        [documentHeader.ID]: [
          {
            ColumnValue: document.EvaluatedDocumentID,
            ValueType: "Normal",
          },
        ],
        [documentHeader.Version]: [
          {
            ColumnValue: document.EvaluatedDocumentVersion,
            ValueType: "Normal",
          },
        ],
        [documentHeader.Name]: [
          { ColumnValue: document.DocumentName, ValueType: "Normal" },
        ],
        [documentHeader.CreatedDate]: [
          {
            ColumnValue: moment.FormatSpecificDate(
              new Date(document.CreatedDate)
            ),
            ValueType: "Normal",
          },
        ],
        [documentHeader.CreatedBy]: [
          { ColumnValue: staffName, ValueType: "Normal" },
        ],
      };
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

  let returnObject: getDocumentsListReturnProps = collectedDocumentsList;

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
    let k = i;
    while (k <= j) {
      extractedText += searchingString[k];
      k++;
    }

    if (extractedText.toLowerCase() === searchValue.toLowerCase()) {
      isSearchFound = true;
      break;
    }
  }
  return isSearchFound;
}

export function GetDocument(DocumentID: number, DocumentVersionID: number) {
  let defaultModel = {
    EvaluatedDocumentID: -1,
    EvaluatedDocumentVersion: -1,
    DocumentID: -1,
    DocumentName: "",
    CreatedDate: "",
    UpdatedDate: "",
    CreatedBy: 1,
    CreatorName: "",
    UpdatedBy: 1,
    UpdaterName: "",
    SourceCode: {
      ContactPerson: "",
      CompanyDetails: {
        Type: "table",
        Collection: {},
      },
      VehicleIdentificationDetails: {
        Type: "table",
        Collection01: [{}],
        Collection02: [{}],
      },
      PictureCollection: [{}],
      TestsCollection: {
        Type: "table",
        Collection01: [{}],
        Collection02: [{}],
      },
      TechnicalEvaluation: {
        Type: "table",
        MainCollection: [{}],
        SubCollection: [{}],
        SubCollection2: [{}],
      },
      SupplierDeclaration: "",
      MarketValue: -1,
      ForcedSaleValue: -1,
      ValuerDeclaration: "",
    },
  };

  //building document details
  CreatedDocuments.map((document) => {
    if (
      document.EvaluatedDocumentID === DocumentID &&
      document.EvaluatedDocumentVersion === DocumentVersionID
    ) {
      defaultModel.EvaluatedDocumentID = document.EvaluatedDocumentID;
      defaultModel.EvaluatedDocumentVersion = document.EvaluatedDocumentVersion;
      defaultModel.DocumentID = document.DocumentID;
      defaultModel.DocumentName = document.DocumentName;
      defaultModel.CreatedDate = document.CreatedDate;
      defaultModel.UpdatedDate = document.UpdatedDate;
      defaultModel.CreatedBy = document.CreatedBy;
      defaultModel.UpdatedBy = document.UpdatedBy;
      defaultModel.SourceCode.ContactPerson = document.SourceCode.ContactPerson;
      defaultModel.SourceCode.CompanyDetails.Collection =
        document.SourceCode.CompanyDetails.Collection;
      defaultModel.SourceCode.VehicleIdentificationDetails.Collection01 =
        document.SourceCode.VehicleIdentificationDetails.Collection01;
      defaultModel.SourceCode.VehicleIdentificationDetails.Collection02 =
        document.SourceCode.VehicleIdentificationDetails.Collection02;
      defaultModel.SourceCode.TestsCollection.Collection01 =
        document.SourceCode.TestsCollection.Collection01;
      defaultModel.SourceCode.TestsCollection.Collection02 =
        document.SourceCode.TestsCollection.Collection02;
      defaultModel.SourceCode.TechnicalEvaluation.MainCollection =
        document.SourceCode.TechnicalEvaluation.MainCollection;
      defaultModel.SourceCode.TechnicalEvaluation.SubCollection =
        document.SourceCode.TechnicalEvaluation.SubCollection;
      defaultModel.SourceCode.TechnicalEvaluation.SubCollection2 =
        document.SourceCode.TechnicalEvaluation.SubCollection2;
      defaultModel.SourceCode.SupplierDeclaration =
        document.SourceCode.SupplierDeclaration;
      defaultModel.SourceCode.MarketValue = document.SourceCode.MarketValue;
      defaultModel.SourceCode.ForcedSaleValue =
        document.SourceCode.ForcedSaleValue;
      defaultModel.SourceCode.ValuerDeclaration =
        document.SourceCode.ValuerDeclaration;
      defaultModel.SourceCode.PictureCollection =
        document.SourceCode.PictureCollection;
    }
  });

  //building staff details
  Staff.map((staffMember) => {
    if (defaultModel.CreatedBy === staffMember.ID) {
      defaultModel.CreatorName =
        staffMember.FirstName + " " + staffMember.LastName;
    }
    if (defaultModel.UpdatedBy === staffMember.ID) {
      defaultModel.UpdaterName =
        staffMember.FirstName + " " + staffMember.LastName;
    }
  });

  return defaultModel;
}

export function GetDocumentName(
  DocumentID: number,
  DocumentVersionID: number
): string {
  let documentName: string = "";

  if (CreatedDocuments.length > 0) {
    CreatedDocuments.map((document) => {
      if (
        document.EvaluatedDocumentID === DocumentID &&
        document.EvaluatedDocumentVersion === DocumentVersionID
      ) {
        documentName = document.DocumentName;
      }
    });
  }

  return documentName;
}
