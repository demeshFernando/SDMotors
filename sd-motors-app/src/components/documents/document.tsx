import { useEffect, useState } from "react";

import Button from "../inputs/button.tsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import iconsSet from "../../styles/functional/fontawesomeIcons.tsx";

import moment from "../../functionalitites/moment.tsx";
import {
  type textStylesType,
  type usualTableFormatType,
} from "../../functionalitites/types.tsx";
import { IsJson } from "../../functionalitites/common.tsx";
import { GetBase64 } from "../../controllers/PIctureController.tsx";
import { GetDocument } from "../../controllers/DocumentsController.tsx";
import { DownloadPDF, ViewPDF } from "../PDFGenerator/convertToPdf.tsx";

type usualTwoColumnRepoRow = usualTableFormatType;

type usualTwoColumnRepoDataType = usualTwoColumnRepoRow[];
type nonHeaderType = {
  [key: number]: {
    ColumnValue: string | number;
    ValueType: textStylesType;
  }[];
}[];

type loadDocumentType = {
  ContactPerson: string;
  CompanyDetails: {
    Type: "table";
    Collection: {
      [key: string]: string[];
    };
  };
  VehicleIdentificationDetails: {
    Type: "table";
    Collection01: usualTwoColumnRepoDataType;
    Collection02: nonHeaderType;
  };
  PictureCollection: {
    ImgType: "Full-Block" | "Half Block";
    Image: number[];
  }[];
  TestsCollection: {
    Type: "table";
    Collection01: usualTwoColumnRepoDataType;
    Collection02: usualTwoColumnRepoDataType;
  };
  TechnicalEvaluation: {
    Type: "table";
    MainCollection: usualTwoColumnRepoDataType;
    SubCollection: usualTwoColumnRepoDataType;
    SubCollection2: usualTwoColumnRepoDataType;
  };
  SupplierDeclaration: string;
  MarketValue: number;
  ForcedSaleValue: number;
  ValuerDeclaration: string;
};

type otherPropTypes = {
  EvaluatedDocumentID: number;
  EvaluatedDocumentVersion: number;
  DocumentID: number;
  DocumentName: string;
  CreatedDate: string;
  UpdatedDate: string;
  CreatedBy: number;
  CreatorName: string;
  UpdatedBy: number;
  UpdaterName: string;
};

type finalDocumentType = {
  SourceCode: loadDocumentType;
  Properties: {
    IsInModifyingState: boolean;
  };
} & otherPropTypes;

type oneColumnTableType = "oneColumn";
type twoColumnTableType = "twoColumn";

type oneColumnRepoDataType = {
  tableType: oneColumnTableType;
  collection: nonHeaderType;
  predefinedColspan: {
    columnIndex: number;
    rowIndex: number;
    reservedColspanValue: number;
  }[];
  isHeaderAvailable?: boolean;
};

type addColspanType = {
  tableType: oneColumnTableType | twoColumnTableType;
  collection: usualTwoColumnRepoDataType;
  predefinedColspan: {
    columnIndex: number;
    rowIndex: number;
    reservedColspanValue: number;
  }[];
  isHeaderAvailable?: boolean;
};

type adjustedTableBodyCollectionType = {
  dataValue: string;
  valueType: textStylesType;
  colSpanIndex: number;
};

function AddColspan({
  isHeaderAvailable = true,
  ...options
}: addColspanType | oneColumnRepoDataType) {
  let colSpanIndex = 0;
  let totalHeaderCount = 0;
  let adjustedTableHeaderCollection: {
    headerValue: string;
    colSpanIndex: number;
  }[] = [];
  let adjustedTableBodyCollection: {
    [key: number]: adjustedTableBodyCollectionType[];
  } = {};

  //finding the maximum data holding row's row length
  //header data loop
  if (isHeaderAvailable) {
    Object.keys(options.collection[0]).forEach((_) => {
      colSpanIndex++;
      totalHeaderCount++;
    });
  }

  //body data loop
  for (let i = 0; i < options.collection.length; i++) {
    let tempDataLength = 0;
    Object.values(options.collection[i]).forEach((tableRow) => {
      tempDataLength += tableRow.length;
    });
    if (tempDataLength > colSpanIndex) {
      colSpanIndex = tempDataLength;
    }
  }

  if (options.tableType === "twoColumn") {
    //header variable initialization
    colSpanIndex *= 2;
  }

  //altering header data
  if (isHeaderAvailable) {
    let reservedColspanIndex = 0;
    Object.keys(options.collection[0]).forEach((key) => {
      if (totalHeaderCount === 1) {
        adjustedTableHeaderCollection.push({
          headerValue: key,
          colSpanIndex:
            colSpanIndex > reservedColspanIndex
              ? colSpanIndex - reservedColspanIndex
              : 1,
        });
      } else {
        adjustedTableHeaderCollection.push({
          headerValue: key,
          colSpanIndex: 1,
        });
      }
      totalHeaderCount--;
      reservedColspanIndex++;
    });
  }

  //altering body data
  for (
    let i = 0;
    (options.tableType === "oneColumn" && i < options.collection.length) ||
    (options.tableType === "twoColumn" &&
      i < Math.round(options.collection.length / 2));
    i++
  ) {
    let columnLength = 0;
    let tempRowDataCollection: adjustedTableBodyCollectionType[] = [];
    Object.values(options.collection[i]).forEach((tableRow) => {
      let tempIteratingObjectValueLength = Object.values(
        options.collection[i]
      ).length;
      for (
        let j = 0;
        j < tableRow.length;
        j++, columnLength++, tempIteratingObjectValueLength--
      ) {
        if (
          j + 1 === tableRow.length &&
          tempIteratingObjectValueLength <= 1 &&
          options.tableType !== "twoColumn"
        ) {
          tempRowDataCollection.push({
            dataValue: tableRow[j].ColumnValue.toString(),
            valueType: tableRow[j].ValueType,
            colSpanIndex:
              colSpanIndex > columnLength ? colSpanIndex - columnLength : 1,
          });
          break;
        }
        tempRowDataCollection.push({
          dataValue: tableRow[j].ColumnValue.toString(),
          valueType: tableRow[j].ValueType,
          colSpanIndex: 1,
        });
      }
    });

    if (
      options.tableType === "twoColumn" &&
      Math.round(options.collection.length / 2) + i < options.collection.length
    ) {
      let acquiringIndex = Math.round(options.collection.length / 2) + i;
      Object.values(options.collection[acquiringIndex]).forEach((value) => {
        let tempIteratingObjectValueLength = Object.values(
          options.collection[acquiringIndex]
        ).length;
        for (
          let j = 0;
          j < value.length;
          j++, columnLength++, tempIteratingObjectValueLength--
        ) {
          if (tempIteratingObjectValueLength === 1 && j + 1 === value.length) {
            tempRowDataCollection.push({
              dataValue: value[j].ColumnValue.toString(),
              valueType: value[j].ValueType,
              colSpanIndex:
                colSpanIndex > columnLength ? colSpanIndex - columnLength : 1,
            });
            break;
          }
          tempRowDataCollection.push({
            dataValue: value[j].ColumnValue.toString(),
            valueType: value[j].ValueType,
            colSpanIndex: 1,
          });
        }
      });
    }

    adjustedTableBodyCollection = {
      ...adjustedTableBodyCollection,
      [i]: tempRowDataCollection,
    };
  }

  return {
    adjustedTableHeaderCollection: adjustedTableHeaderCollection,
    adjustedTableBodyCollection: adjustedTableBodyCollection,
  };
}

function GetFormattedTD(
  value: string,
  colspanValue: number,
  keyValue: number,
  valueType: textStylesType
): JSX.Element {
  if (valueType === "Normal") {
    return colspanValue === 1 ? (
      <td key={keyValue}>{value}</td>
    ) : (
      <td colSpan={colspanValue} key={keyValue}>
        {value}
      </td>
    );
  } else {
    return colspanValue === 1 ? (
      <td key={keyValue}>
        <strong>{value}</strong>
      </td>
    ) : (
      <td colSpan={colspanValue} key={keyValue}>
        <strong>{value}</strong>
      </td>
    );
  }
}

function GetTableHeaders(
  object: usualTwoColumnRepoRow[],
  tableType: oneColumnTableType | twoColumnTableType
): JSX.Element[] {
  let generatedTrArray: JSX.Element[] = [];
  let alteredHeaderValues = AddColspan({
    tableType: tableType,
    collection: object,
    predefinedColspan: [],
  }).adjustedTableHeaderCollection;

  //generating the TRs'
  let generatedTempTr: JSX.Element[] = [];
  for (let i = 0; i < alteredHeaderValues.length; i++) {
    generatedTempTr.push(
      alteredHeaderValues[i].colSpanIndex === 1 ? (
        <th key={i}>{alteredHeaderValues[i].headerValue}</th>
      ) : (
        <th key={i} colSpan={alteredHeaderValues[i].colSpanIndex}>
          {alteredHeaderValues[i].headerValue}
        </th>
      )
    );
  }
  generatedTrArray.push(
    <thead>
      <tr>{generatedTempTr}</tr>
    </thead>
  );
  return generatedTrArray;
}

function GetTwoColumnTableRow(
  object: usualTwoColumnRepoDataType
): JSX.Element[] {
  let generatedArray: JSX.Element[] = [];
  let generatedTrArray: JSX.Element[] = [];
  let tempRowCount = 0;
  let uniqueKey = 0;
  let alteredTableBodyData = AddColspan({
    tableType: "twoColumn",
    collection: object,
    predefinedColspan: [],
  }).adjustedTableBodyCollection;

  //some times the last row of the returned data may not get the desired data length in case of a
  //odd data collection. So, let's check it first
  let isLastRowUnEven: boolean = false;
  let rowLength = Object.keys(alteredTableBodyData).length;
  let tempCount = 0;
  let standardValueLength = 0;
  Object.values(alteredTableBodyData).forEach((value) => {
    if (tempCount === 0) {
      standardValueLength = value.length;
    }
    if (rowLength === 1 && value.length !== standardValueLength) {
      isLastRowUnEven = true;
    } else {
      isLastRowUnEven = false;
    }
    rowLength--;
    tempCount++;
  });

  //body data generation
  Object.values(alteredTableBodyData).forEach((value) => {
    let tempTdCollection: JSX.Element[] = [];
    for (let i = 0; i < value.length; i++, uniqueKey++) {
      if (value[i].valueType === "Normal") {
        tempTdCollection.push(
          GetFormattedTD(
            value[i].dataValue,
            value[i].colSpanIndex,
            uniqueKey,
            "Normal"
          )
        );
      } else {
        tempTdCollection.push(
          GetFormattedTD(
            value[i].dataValue,
            value[i].colSpanIndex,
            uniqueKey,
            "Bold"
          )
        );
      }

      if (
        tempRowCount === Object.keys(alteredTableBodyData).length - 1 &&
        isLastRowUnEven &&
        i + 1 === value.length
      ) {
        for (let j = i + 1; j < standardValueLength; j++) {
          tempTdCollection.push(
            GetFormattedTD("", value[i].colSpanIndex, uniqueKey, "Normal")
          );
        }
      }
    }
    tempRowCount++;
    generatedTrArray.push(<tr key={uniqueKey}>{tempTdCollection}</tr>);
  });

  generatedArray.push(<tbody>{generatedTrArray}</tbody>);

  return generatedArray;
}

function GetSingleColumnTableRow(
  collection: nonHeaderType,
  isHeaderAvailable: boolean = true
) {
  let alteredTableData = AddColspan({
    collection: collection,
    predefinedColspan: [],
    tableType: "oneColumn",
    isHeaderAvailable: isHeaderAvailable,
  }).adjustedTableBodyCollection;

  let tbodyCollection: JSX.Element[] = [];
  let TrArray: JSX.Element[] = [];
  Object.values(alteredTableData).forEach((value) => {
    let tempTdArray: JSX.Element[] = [];
    for (let i = 0; i < value.length; i++) {
      tempTdArray.push(
        GetFormattedTD(
          value[i].dataValue,
          value[i].colSpanIndex,
          i,
          value[i].valueType
        )
      );
    }
    TrArray.push(<tr>{tempTdArray}</tr>);
  });
  if (isHeaderAvailable) {
    tbodyCollection.push(<tbody>{TrArray}</tbody>);
  }

  return isHeaderAvailable ? tbodyCollection : TrArray;
}

function ValidateImage(imageID: number): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const base64 = GetBase64(imageID);
    const image = new Image();
    image.src = base64;

    image.onload = () => resolve(image);
    image.onerror = (error) => reject(error);
  });
}

export default function DocumentView(props: any) {
  const [loadedDocument, setLoadedDocument] = useState<finalDocumentType>({
    EvaluatedDocumentID: 1,
    EvaluatedDocumentVersion: 1,
    DocumentID: 3224,
    DocumentName: "Nissan GTR",
    CreatedDate: "2024-11-08T07:05:00",
    UpdatedDate: "2024-11-08T07:05:00",
    CreatedBy: 1,
    CreatorName: "",
    UpdatedBy: 1,
    UpdaterName: "",
    SourceCode: {
      ContactPerson: "H.M.P.R. Samaradiwakara",
      CompanyDetails: {
        Type: "table",
        Collection: {
          "Opinion Provided to": ["SINGER"],
          "Date and Time of inspection": ["2024-11-11T00:00:00", "1300HRS"],
          "Place of inspection": ["EKALA"],
        },
      },
      VehicleIdentificationDetails: {
        Type: "table",
        Collection01: [
          {
            "1": [{ ColumnValue: 1.1, ValueType: "Normal" }],
            "Vehicle Identification Details": [
              {
                ColumnValue: "Make",
                ValueType: "Normal",
              },
              {
                ColumnValue: "SUZUKI",
                ValueType: "Normal",
              },
            ],
          },
          {
            "1": [{ ColumnValue: 1.2, ValueType: "Normal" }],
            "Vehicle Identification Details": [
              {
                ColumnValue: "MODEL",
                ValueType: "Normal",
              },
              {
                ColumnValue: "DAA-MH55S WAGON R",
                ValueType: "Normal",
              },
            ],
          },
          {
            "1": [{ ColumnValue: 1.3, ValueType: "Normal" }],
            "Vehicle Identification Details": [
              {
                ColumnValue: "CLASSIFICATION",
                ValueType: "Normal",
              },
              {
                ColumnValue: "MOTOR CAR",
                ValueType: "Normal",
              },
            ],
          },
          {
            "1": [{ ColumnValue: 1.4, ValueType: "Normal" }],
            "Vehicle Identification Details": [
              {
                ColumnValue: "COUNTRY OF ORIGIN",
                ValueType: "Normal",
              },
              {
                ColumnValue: "JAPAN",
                ValueType: "Normal",
              },
            ],
          },
          {
            "1": [{ ColumnValue: 1.5, ValueType: "Normal" }],
            "Vehicle Identification Details": [
              {
                ColumnValue: "YEAR OF MANUFACTURE",
                ValueType: "Normal",
              },
              {
                ColumnValue: 2018,
                ValueType: "Normal",
              },
            ],
          },
          {
            "1": [{ ColumnValue: 1.6, ValueType: "Normal" }],
            "Vehicle Identification Details": [
              {
                ColumnValue: "REGISTRATION NO",
                ValueType: "Normal",
              },
              {
                ColumnValue: "NW CAZ – 7151",
                ValueType: "Bold",
              },
            ],
          },
          {
            "1": [{ ColumnValue: 1.7, ValueType: "Normal" }],
            "Vehicle Identification Details": [
              {
                ColumnValue: "DATE OF REGISTRATION",
                ValueType: "Normal",
              },
              {
                ColumnValue: "03/05/2018",
                ValueType: "Normal",
              },
            ],
          },
          {
            "1": [{ ColumnValue: 1.8, ValueType: "Normal" }],
            "Vehicle Identification Details": [
              {
                ColumnValue: "ENGINE NO",
                ValueType: "Normal",
              },
              {
                ColumnValue: "R06A-WA05A-K714118",
                ValueType: "Normal",
              },
            ],
          },
          {
            "1": [{ ColumnValue: 1.9, ValueType: "Normal" }],
            "Vehicle Identification Details": [
              {
                ColumnValue: "CHASSIS NO",
                ValueType: "Normal",
              },
              {
                ColumnValue: "MH55S-717172",
                ValueType: "Bold",
              },
            ],
          },
          {
            "1": [{ ColumnValue: 1.1, ValueType: "Normal" }],
            "Vehicle Identification Details": [
              {
                ColumnValue: "Fuel type",
                ValueType: "Normal",
              },
              {
                ColumnValue: "EFI",
                ValueType: "Bold",
              },
            ],
          },
          {
            "1": [{ ColumnValue: 1.11, ValueType: "Normal" }],
            "Vehicle Identification Details": [
              {
                ColumnValue: "Type of Fuel",
                ValueType: "Normal",
              },
              {
                ColumnValue: "Petrol / ELE",
                ValueType: "Bold",
              },
            ],
          },
          {
            "1": [{ ColumnValue: 1.12, ValueType: "Normal" }],
            "Vehicle Identification Details": [
              {
                ColumnValue: "Engine Capacity",
                ValueType: "Normal",
              },
              {
                ColumnValue: "650.00CC",
                ValueType: "Bold",
              },
            ],
          },
          {
            "1": [{ ColumnValue: 1.13, ValueType: "Normal" }],
            "Vehicle Identification Details": [
              {
                ColumnValue: "IF converted date and type",
                ValueType: "Normal",
              },
              {
                ColumnValue: "-",
                ValueType: "Bold",
              },
            ],
          },
          {
            "1": [{ ColumnValue: 1.14, ValueType: "Normal" }],
            "Vehicle Identification Details": [
              {
                ColumnValue: "Meter Reading",
                ValueType: "Normal",
              },
              {
                ColumnValue: "70364 KM",
                ValueType: "Bold",
              },
            ],
          },
          {
            "1": [{ ColumnValue: 1.15, ValueType: "Normal" }],
            "Vehicle Identification Details": [
              {
                ColumnValue: "No previous Owners",
                ValueType: "Normal",
              },
              {
                ColumnValue: "02",
                ValueType: "Bold",
              },
            ],
          },
          {
            "1": [{ ColumnValue: 1.16, ValueType: "Normal" }],
            "Vehicle Identification Details": [
              {
                ColumnValue: "Seating capacity",
                ValueType: "Normal",
              },
              {
                ColumnValue: "4",
                ValueType: "Bold",
              },
            ],
          },
          {
            "1": [{ ColumnValue: 1.17, ValueType: "Normal" }],
            "Vehicle Identification Details": [
              {
                ColumnValue: "Color",
                ValueType: "Normal",
              },
              {
                ColumnValue: "Pearl",
                ValueType: "Bold",
              },
            ],
          },
          {
            "1": [{ ColumnValue: 1.18, ValueType: "Normal" }],
            "Vehicle Identification Details": [
              {
                ColumnValue: "4X4 wheel drive",
                ValueType: "Normal",
              },
              {
                ColumnValue: "-",
                ValueType: "Bold",
              },
            ],
          },
        ],
        Collection02: [
          {
            1: [
              {
                ColumnValue: 1.2,
                ValueType: "Normal",
              },
              {
                ColumnValue: "Current Owner",
                ValueType: "Normal",
              },
              {
                ColumnValue: "MR. THS. Thushanka",
                ValueType: "Normal",
              },
            ],
          },
          {
            1: [
              {
                ColumnValue: 1.21,
                ValueType: "Normal",
              },
              {
                ColumnValue: "Extra options",
                ValueType: "Normal",
              },
              {
                ColumnValue: "Full Option - TV, DVD, R/Camera",
                ValueType: "Normal",
              },
            ],
          },
          {
            1: [
              {
                ColumnValue: 1.21,
                ValueType: "Normal",
              },
              {
                ColumnValue: "Compliance of above",
                ValueType: "Normal",
              },
              {
                ColumnValue: "Yes",
                ValueType: "Normal",
              },
              {
                ColumnValue: "IF COMMENTS",
                ValueType: "Normal",
              },
            ],
          },
        ],
      },
      PictureCollection: [
        {
          ImgType: "Full-Block",
          Image: [1],
        },
        {
          ImgType: "Full-Block",
          Image: [2],
        },
        {
          ImgType: "Half Block",
          Image: [3, 4],
        },
      ],
      TestsCollection: {
        Type: "table",
        Collection01: [
          {
            "Road Test": [
              {
                ColumnValue: "Done on",
                ValueType: "Normal",
              },
              {
                ColumnValue: "05/11/2024",
                ValueType: "Bold",
              },
            ],
          },
          {
            "Road Test": [
              {
                ColumnValue: "Not done because",
                ValueType: "Normal",
              },
              {
                ColumnValue: "-",
                ValueType: "Bold",
              },
            ],
          },
          {
            "Road Test": [
              {
                ColumnValue: "AVERAGE FUEL COMSUMPTION P/LITER",
                ValueType: "Normal",
              },
              {
                ColumnValue: "15 KMS",
                ValueType: "Bold",
              },
            ],
          },
        ],
        Collection02: [
          {
            "AVAILABILITY OF SPAIRES": [
              {
                ColumnValue: "Body parts",
                ValueType: "Normal",
              },
              {
                ColumnValue: "AVAILABLE",
                ValueType: "Normal",
              },
            ],
          },
          {
            "AVAILABILITY OF SPAIRES": [
              {
                ColumnValue: "Engine parts",
                ValueType: "Normal",
              },
              {
                ColumnValue: "AVAILABLE",
                ValueType: "Normal",
              },
            ],
          },
          {
            "AVAILABILITY OF SPAIRES": [
              {
                ColumnValue: "Acessories",
                ValueType: "Normal",
              },
              {
                ColumnValue: "AVAILABLE",
                ValueType: "Normal",
              },
            ],
          },
        ],
      },
      TechnicalEvaluation: {
        Type: "table",
        MainCollection: [
          {
            "4": [{ ColumnValue: "Transmission", ValueType: "Bold" }],
            "Technical Evaluation": [
              {
                ColumnValue: "Automatic",
                ValueType: "Normal",
              },
            ],
          },
          {
            "4": [{ ColumnValue: "Clutch", ValueType: "Bold" }],
            "Technical Evaluation": [
              {
                ColumnValue: "Good",
                ValueType: "Normal",
              },
            ],
          },
          {
            "4": [{ ColumnValue: "Shafting", ValueType: "Bold" }],
            "Technical Evaluation": [
              {
                ColumnValue: "Good",
                ValueType: "Normal",
              },
            ],
          },
          {
            "4": [{ ColumnValue: "Differential", ValueType: "Bold" }],
            "Technical Evaluation": [
              {
                ColumnValue: "Good",
                ValueType: "Normal",
              },
            ],
          },
          {
            "4": [{ ColumnValue: "Gear section", ValueType: "Bold" }],
            "Technical Evaluation": [
              {
                ColumnValue: "Good",
                ValueType: "Normal",
              },
            ],
          },
          {
            "4": [{ ColumnValue: "Suspension front", ValueType: "Bold" }],
            "Technical Evaluation": [
              {
                ColumnValue: "Good",
                ValueType: "Normal",
              },
            ],
          },
          {
            "4": [{ ColumnValue: "Suspension rear", ValueType: "Bold" }],
            "Technical Evaluation": [
              {
                ColumnValue: "Good",
                ValueType: "Normal",
              },
            ],
          },
          {
            "4": [{ ColumnValue: "Foot brakes", ValueType: "Bold" }],
            "Technical Evaluation": [
              {
                ColumnValue: "Good",
                ValueType: "Normal",
              },
            ],
          },
          {
            "4": [{ ColumnValue: "Hand brakes", ValueType: "Bold" }],
            "Technical Evaluation": [
              {
                ColumnValue: "Good",
                ValueType: "Normal",
              },
            ],
          },
          {
            "4": [{ ColumnValue: "Steering", ValueType: "Bold" }],
            "Technical Evaluation": [
              {
                ColumnValue: "Good",
                ValueType: "Normal",
              },
            ],
          },
          {
            "4": [{ ColumnValue: "Chassis condition", ValueType: "Bold" }],
            "Technical Evaluation": [
              {
                ColumnValue: "Good",
                ValueType: "Normal",
              },
            ],
          },
          {
            "4": [{ ColumnValue: "Body condition", ValueType: "Bold" }],
            "Technical Evaluation": [
              {
                ColumnValue: "Good",
                ValueType: "Normal",
              },
            ],
          },
          {
            "4": [{ ColumnValue: "Engine condition", ValueType: "Bold" }],
            "Technical Evaluation": [
              {
                ColumnValue: "Good",
                ValueType: "Normal",
              },
            ],
          },
          {
            "4": [{ ColumnValue: "Engine status", ValueType: "Bold" }],
            "Technical Evaluation": [
              {
                ColumnValue: "Good",
                ValueType: "Normal",
              },
            ],
          },
          {
            "4": [
              { ColumnValue: "Electrical system", ValueType: "Underline-Bold" },
            ],
            "Technical Evaluation": [
              {
                ColumnValue: "",
                ValueType: "Normal",
              },
            ],
          },
          {
            "4": [{ ColumnValue: "S/Strter", ValueType: "Bold" }],
            "Technical Evaluation": [
              {
                ColumnValue: "Good",
                ValueType: "Normal",
              },
            ],
          },
          {
            "4": [{ ColumnValue: "Wipers", ValueType: "Bold" }],
            "Technical Evaluation": [
              {
                ColumnValue: "Good",
                ValueType: "Normal",
              },
            ],
          },
          {
            "4": [{ ColumnValue: "Horn", ValueType: "Bold" }],
            "Technical Evaluation": [
              {
                ColumnValue: "Good",
                ValueType: "Normal",
              },
            ],
          },
          {
            "4": [{ ColumnValue: "Lights", ValueType: "Bold" }],
            "Technical Evaluation": [
              {
                ColumnValue: "Good",
                ValueType: "Normal",
              },
            ],
          },
          {
            "4": [{ ColumnValue: "Meters", ValueType: "Bold" }],
            "Technical Evaluation": [
              {
                ColumnValue: "Good",
                ValueType: "Normal",
              },
            ],
          },
          {
            "4": [{ ColumnValue: "Alternator", ValueType: "Bold" }],
            "Technical Evaluation": [
              {
                ColumnValue: "Good",
                ValueType: "Normal",
              },
            ],
          },
          {
            "4": [{ ColumnValue: "Maintenance", ValueType: "Underline-Bold" }],
            "Technical Evaluation": [
              {
                ColumnValue: "",
                ValueType: "Normal",
              },
            ],
          },
          {
            "4": [{ ColumnValue: "Mechanical", ValueType: "Bold" }],
            "Technical Evaluation": [
              {
                ColumnValue: "Good",
                ValueType: "Normal",
              },
            ],
          },
          {
            "4": [{ ColumnValue: "Doors", ValueType: "Bold" }],
            "Technical Evaluation": [
              {
                ColumnValue: "Good",
                ValueType: "Normal",
              },
            ],
          },
          {
            "4": [{ ColumnValue: "Internal Trim", ValueType: "Bold" }],
            "Technical Evaluation": [
              {
                ColumnValue: "Good",
                ValueType: "Normal",
              },
            ],
          },
        ],
        SubCollection: [
          {
            "Major Repairs": [
              { ColumnValue: "Need with in a year", ValueType: "Bold" },
            ],
            Condition: [{ ColumnValue: "no", ValueType: "Normal" }],
          },
          {
            "Major Repairs": [
              { ColumnValue: "Body parts replaced", ValueType: "Bold" },
            ],
            Condition: [{ ColumnValue: "no", ValueType: "Normal" }],
          },
          {
            "Major Repairs": [{ ColumnValue: "Accidents", ValueType: "Bold" }],
            Condition: [{ ColumnValue: "no", ValueType: "Normal" }],
          },
          {
            "Major Repairs": [
              { ColumnValue: "Writ off by insurers", ValueType: "Bold" },
            ],
            Condition: [{ ColumnValue: "no", ValueType: "Normal" }],
          },
          {
            "Major Repairs": [{ ColumnValue: "Comments", ValueType: "Bold" }],
            Condition: [{ ColumnValue: "no", ValueType: "Normal" }],
          },
          {
            "Major Repairs": [
              { ColumnValue: "Writ off by insurers", ValueType: "Bold" },
            ],
            Condition: [{ ColumnValue: "no", ValueType: "Normal" }],
          },
        ],
        SubCollection2: [
          {
            Types: [{ ColumnValue: "Front", ValueType: "Normal" }],
            Size: [
              {
                ColumnValue: "Single",
                ValueType: "Normal",
              },
              {
                ColumnValue: "155/14",
                ValueType: "Normal",
              },
            ],
          },
          {
            Types: [{ ColumnValue: "Back", ValueType: "Normal" }],
            Size: [
              {
                ColumnValue: "Single",
                ValueType: "Normal",
              },
              {
                ColumnValue: "155/14",
                ValueType: "Normal",
              },
            ],
          },
          {
            Types: [{ ColumnValue: "Roof Type", ValueType: "Normal" }],
            Size: [
              {
                ColumnValue: "",
                ValueType: "Normal",
              },
              {
                ColumnValue: "Iron Top",
                ValueType: "Normal",
              },
            ],
          },
          {
            Types: [{ ColumnValue: "Body type", ValueType: "Normal" }],
            Size: [
              {
                ColumnValue: "Sedan",
                ValueType: "Normal",
              },
              {
                ColumnValue: "Closed",
                ValueType: "Normal",
              },
            ],
          },
          {
            Types: [{ ColumnValue: "Comments", ValueType: "Normal" }],
            Size: [
              {
                ColumnValue: "",
                ValueType: "Normal",
              },
              {
                ColumnValue: "",
                ValueType: "Normal",
              },
            ],
          },
        ],
      },
      SupplierDeclaration:
        "I HERE BY DECLARE AND AFFIRM THAT I AM THE CURRENT OWNER OF THE VEHICLE DETAILS INDICATED IN THE SECTION 1.0 AND THAT THE INFORMATION GIVEN CONCERNING IT IS CORRECT TO THE BEST OF MY KNOWLEDGE. ",
      MarketValue: 6800800,
      ForcedSaleValue: 6500000,
      ValuerDeclaration:
        "I HERE BY CONFIRM THAT THE INFORMATION STATED IS CORRECT AS PER INSPECTIONS MADE BY ME AND TO THE BEST OF MY KNOWLEDGE I ALSO HAVE GIVEN THE ABOVE VALUATION AFTER CONSIDERING ALL RELEVANT FACTORS, WHICH AFFECTS THE VALUE OF THE VEHICLE TO THE BEST OF MY EXPERIENCE AND KNOWLEDGE.",
    },
    Properties: {
      IsInModifyingState: false,
    },
  });
  //it is better if we loaded the images separately since they base64 heavy images
  const [images, setImage] = useState<
    {
      ID: number;
      img: string;
    }[]
  >([]);

  useEffect(() => {
    //from below before moving the incoming value to the documents,
    //we have to validate it is in proper format.
    if (IsJson(props)) {
      let expectedModel = loadedDocument;
      let extractedDocumentID = 0;
      let extractedDocumentVersionID = 0;
      Object.entries(props).forEach(([key, value]) => {
        if (key === "DocumentID" && typeof value === "number") {
          extractedDocumentID = value;
        } else if (key === "DocumentVersionID" && typeof value === "number") {
          extractedDocumentVersionID = value;
        }
      });

      //getting the respected JSON file from server
      let parsedJson = GetDocument(
        extractedDocumentID,
        extractedDocumentVersionID
      );
      if (IsJson(parsedJson)) {
        Object.entries(parsedJson).forEach(([key, value]) => {
          let extractedKey = MatchObjectKeys(key, expectedModel);
          if (
            extractedKey === "EvaluatedDocumentID" &&
            typeof value === "number"
          ) {
            expectedModel[extractedKey] = value;
          } else if (
            extractedKey === "EvaluatedDocumentVersion" &&
            typeof value === "number"
          ) {
            expectedModel[extractedKey] = value;
          } else if (
            extractedKey === "DocumentID" &&
            typeof value === "number"
          ) {
            expectedModel[extractedKey] = value;
          } else if (
            extractedKey === "DocumentName" &&
            typeof value === "string"
          ) {
            expectedModel[extractedKey] = value;
          } else if (
            extractedKey === "CreatedDate" &&
            typeof value === "string"
          ) {
            expectedModel[extractedKey] = value;
          } else if (
            extractedKey === "UpdatedDate" &&
            typeof value === "string"
          ) {
            expectedModel[extractedKey] = value;
          } else if (
            extractedKey === "CreatedBy" &&
            typeof value === "number"
          ) {
            expectedModel[extractedKey] = value;
          } else if (
            extractedKey === "CreatorName" &&
            typeof value === "string"
          ) {
            expectedModel[extractedKey] = value;
          } else if (
            extractedKey === "UpdatedBy" &&
            typeof value === "number"
          ) {
            expectedModel[extractedKey] = value;
          } else if (
            extractedKey === "UpdaterName" &&
            typeof value === "string"
          ) {
            expectedModel[extractedKey] = value;
          }

          //let's evaluate the source code section
          else if (extractedKey === "SourceCode") {
            if (Object.keys(parsedJson[extractedKey]).length > 0) {
              //looping through the source code and merging the result
              Object.entries(parsedJson[extractedKey]).forEach(
                ([sourceKey, sourceValue]) => {
                  if (
                    sourceKey === "ContactPerson" &&
                    typeof sourceValue === "string"
                  ) {
                    expectedModel.SourceCode.ContactPerson = sourceValue;
                  } else if (
                    sourceKey === "SupplierDeclaration" &&
                    typeof sourceValue === "string"
                  ) {
                    expectedModel.SourceCode.SupplierDeclaration = sourceValue;
                  } else if (
                    sourceKey === "MarketValue" &&
                    typeof sourceValue === "number"
                  ) {
                    expectedModel.SourceCode.MarketValue = sourceValue;
                  } else if (
                    sourceKey === "ForcedSaleValue" &&
                    typeof sourceValue === "number"
                  ) {
                    expectedModel.SourceCode.ForcedSaleValue = sourceValue;
                  } else if (
                    sourceKey === "ValuerDeclaration" &&
                    typeof sourceValue === "string"
                  ) {
                    expectedModel.SourceCode.ValuerDeclaration = sourceValue;
                  }
                }
              );
            }
          }
        });
      }
      setLoadedDocument(expectedModel);
    }

    const GetImage = async (imageID: number) => {
      try {
        const image = await ValidateImage(imageID);
        setImage((prevSets) => [
          ...prevSets,
          {
            ID: imageID,
            img: image.src,
          },
        ]);
      } catch (E) {
        console.log("Error loading the image");
      }
    };

    //now at last lets look for images
    let imagesArray = loadedDocument.SourceCode.PictureCollection;
    if (imagesArray.length > 0) {
      for (let i = 0; i < imagesArray.length; i++) {
        for (let j = 0; j < imagesArray[i].Image.length; j++) {
          const imgID = imagesArray[i].Image[j];
          GetImage(imgID);
        }
      }
    }
  }, [props]);

  //this function will return if we got an matching value pair
  const MatchObjectKeys = (
    key: string,
    object: finalDocumentType
  ): keyof typeof loadedDocument => {
    let matchingObjectName: keyof typeof loadedDocument = "EvaluatedDocumentID";
    Object.keys(object).forEach((objKey) => {
      if (key === objKey) {
        matchingObjectName = objKey as keyof typeof loadedDocument;
      }
    });
    return matchingObjectName;
  };

  const GetImageBaseStringIndex = (imgID: number): number => {
    for (let i = 0; i < images.length; i++) {
      if (images[i].ID === imgID) {
        return i;
      }
    }

    return -1;
  };

  //in here the evaluation table will be created
  let evaluationTable;
  let tableDataCollection: JSX.Element[] = [];
  Object.entries(loadedDocument.SourceCode.CompanyDetails.Collection).forEach(
    ([key, value]) => {
      const tableDataTraversal = value.map((data, index) => (
        <td key={index}>: {data}</td>
      ));
      tableDataCollection.push(
        <tr key={key}>
          <th>{key}</th>
          {tableDataTraversal}
        </tr>
      );

      evaluationTable = (
        <table className="evaluation-table">
          <tbody>{tableDataCollection}</tbody>
        </table>
      );
    }
  );

  const ActionComponentFunctions = {
    PrintPreview: () => {
      ViewPDF();
    },
    Print: () => {
      DownloadPDF();
    },
  };

  const ActionComponentValidator = (props: any): void => {
    if (typeof props === "string") {
      if (props === "PrintPreview") {
        ActionComponentFunctions.PrintPreview();
      } else if (props === "Print") {
        ActionComponentFunctions.Print();
      }
    }
  };

  const documentBodyHeader = (
    <div className="document-body-header">
      <div className="document-body-header-logo">
        <h1>Logo</h1>
      </div>
      <div className="company-details">
        <h1>S.D. MOTORS</h1>
        <p className="company-address">
          NO. 400/239, NEGOMBO ROAD, SEEDUWA VILLAGE, SEEDUWA
        </p>
        <p className="contact">CONTACT: 0774300072 / 0773552072</p>
        <p className="email">EMAIL: sdmotors.sdm@gmail.com</p>
        <h3>
          <strong>VEHICLE INSPECTION AND VALUATION REPORT</strong>
        </h3>
      </div>
      <div className="company-registration-number">
        <h1>
          <strong>Registration</strong>
        </h1>
      </div>
    </div>
  );

  //generating evaluation details collection 01 table
  const evaluatedDocumentDetails = (
    <table className="main-evaluation-table">
      {GetTableHeaders(
        loadedDocument.SourceCode.VehicleIdentificationDetails.Collection01,
        "twoColumn"
      )}
      {GetTwoColumnTableRow(
        loadedDocument.SourceCode.VehicleIdentificationDetails.Collection01
      )}
    </table>
  );

  //generating evaluation details collection 02 table
  const evaluatedDocumentDetailsType02 = (
    <table className="other-mains-table">
      <tbody>
        {GetSingleColumnTableRow(
          loadedDocument.SourceCode.VehicleIdentificationDetails.Collection02,
          false
        )}
      </tbody>
    </table>
  );

  const imageCollection = loadedDocument.SourceCode.PictureCollection.map(
    (imgString, index) => {
      for (let i = 0; i < imgString.Image.length; i++) {
        const imgIndex = GetImageBaseStringIndex(imgString.Image[i]);
        if (imgIndex > -1) {
          if (imgString.ImgType === "Full-Block") {
            return (
              <div key={index} className="full-block">
                <img src={images[imgIndex].img} alt={index.toString()} />
              </div>
            );
          } else {
            return (
              <div key={index} className="half-block">
                <img src={images[imgIndex].img} alt={index.toString()} />
                <img src={images[imgIndex].img} alt="" />
              </div>
            );
          }
        }
        return <p>Loading...</p>;
      }
    }
  );

  const testCollection1 = (
    <table className="test1">
      {GetTableHeaders(
        loadedDocument.SourceCode.TestsCollection.Collection01,
        "oneColumn"
      )}
      {GetSingleColumnTableRow(
        loadedDocument.SourceCode.TestsCollection.Collection01,
        true
      )}
    </table>
  );

  const testCollection02 = (
    <table className="test2">
      {GetTableHeaders(
        loadedDocument.SourceCode.TestsCollection.Collection02,
        "oneColumn"
      )}
      {GetSingleColumnTableRow(
        loadedDocument.SourceCode.TestsCollection.Collection02,
        true
      )}
    </table>
  );

  //generating data regarding the technical evaluation
  const technicalEvaluationMajorTable = (
    <table className="technical-evaluation-table">
      {GetTableHeaders(
        loadedDocument.SourceCode.TechnicalEvaluation.MainCollection,
        "twoColumn"
      )}
      {GetTwoColumnTableRow(
        loadedDocument.SourceCode.TechnicalEvaluation.MainCollection
      )}
    </table>
  );
  const technicalEvaluationSub1 = (
    <table className="test1">
      {GetTableHeaders(
        loadedDocument.SourceCode.TechnicalEvaluation.SubCollection,
        "oneColumn"
      )}
      {GetSingleColumnTableRow(
        loadedDocument.SourceCode.TechnicalEvaluation.SubCollection,
        true
      )}
    </table>
  );
  const technicalEvaluationSub2 = (
    <table className="test2">
      {GetTableHeaders(
        loadedDocument.SourceCode.TechnicalEvaluation.SubCollection2,
        "oneColumn"
      )}
      {GetSingleColumnTableRow(
        loadedDocument.SourceCode.TechnicalEvaluation.SubCollection2,
        true
      )}
    </table>
  );

  return (
    <div className="document">
      <div className="document-header">
        <div className="document-left">
          <div className="document-name fix-height">
            <strong>Document Name:</strong>
            {loadedDocument.DocumentName}
          </div>
          <div className="document-created-date fix-height">
            <strong>Created Date:</strong>
            <span className="inline-icon-left">
              {moment.FormatSpecificDate(new Date(loadedDocument.CreatedDate))}
            </span>
          </div>
          <div className="document-owner-and-versioning fix-height">
            <div className="owner">
              <strong>Created by: </strong>
              {loadedDocument.CreatorName !== "" && (
                <a className="linked-content-properties" href="#">
                  {loadedDocument.CreatorName}
                </a>
              )}
            </div>
            <div className="version">
              <div className="version-number">
                <strong>Version:</strong>{" "}
                {loadedDocument.EvaluatedDocumentVersion}
              </div>
              <div className="change-link">
                <a className="linked-content-properties" href="#">
                  Change
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="document-right">
          {loadedDocument.Properties.IsInModifyingState ? (
            <Button
              buttonBackgroundColor="Secondary"
              buttonStyle="Flat"
              spaceAround="Left"
              buttonType="Normal"
            >
              <FontAwesomeIcon
                className="inline-icon-right"
                icon={iconsSet["faFloppyDisk"]}
              />
              Save
            </Button>
          ) : (
            <Button
              buttonBackgroundColor="general-blue"
              buttonStyle="Flat"
              buttonType="Normal"
            >
              <FontAwesomeIcon
                className="inline-icon-right"
                icon={iconsSet["faPenNib"]}
              />
              Modify Document
            </Button>
          )}

          <Button
            buttonType="WithDropDownMenu"
            buttonBackgroundColor="general-white"
            buttonStyle="Flat"
            spaceAround="Left"
            dropDownItems={[
              {
                iconName: "faFilePdf",
                mainHeader: "Print Preview",
                onClick: ActionComponentValidator,
                ActionComponentRequiredProperties: "PrintPreview",
              },
              {
                iconName: "faPrint",
                mainHeader: "Print",
                onClick: ActionComponentValidator,
                ActionComponentRequiredProperties: "Print",
              },
            ]}
          >
            Actions
          </Button>
        </div>
      </div>
      <div className="document-body" id="pdf-content">
        {documentBodyHeader}
        <div className="evaluation-details">
          <div className="identities">
            <div className="character-qualities">
              CONTACT PERSON: {loadedDocument.SourceCode.ContactPerson}
            </div>
            <div className="character-qualities">
              REPORT NO.: {loadedDocument.EvaluatedDocumentID}
            </div>
          </div>
          <div className="evaluation-for">{evaluationTable}</div>
          <div className="usual-evaluation">{evaluatedDocumentDetails}</div>
          <div className="usual-evaluation">
            {evaluatedDocumentDetailsType02}
          </div>
          <div className="image-collection">{imageCollection}</div>
          <div className="tests">
            {testCollection1}
            {testCollection02}
          </div>
          <div className="technical-evaluation usual-evaluation">
            {technicalEvaluationMajorTable}
          </div>
          <div className="tests">
            {technicalEvaluationSub1}
            {technicalEvaluationSub2}
          </div>
          <div className="supplier-declaration usual-evaluation">
            <h1>5.0 Declaration by supplier</h1>
            <p>
              I HERE BY DECLARE AND AFFIRM THAT I AM THE CURRENT OWNER OF THE
              VEHICLE DETAILS INDICATED IN THE SECTION 1.0 AND THAT THE
              INFORMATION GIVEN CONCERNING IT IS CORRECT TO THE BEST OF MY
              KNOWLEDGE.{" "}
              <span>
                <strong>vendor: </strong>.................
              </span>
            </p>
          </div>
          <div className="evaluation-amount">
            <table>
              <tbody>
                <tr>
                  <th>6.0 Market value RS.</th>
                  <td>
                    :{" "}
                    <strong>
                      Six million eight hundred thousand rupees. (RS.
                      6,800,800.00)
                    </strong>
                  </td>
                </tr>
                <tr>
                  <th>7.0 Forced sale value RS.</th>
                  <td>
                    :{" "}
                    <strong>
                      six million five hundred thousand rupees. (RS.
                      6,500,000.00)
                    </strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="valuer-declaration usual-evaluation">
            <h1>Declaration of the valuer</h1>
            <p>
              I HERE BY CONFIRM THAT THE INFORMATION STATED IS CORRECT AS PER
              INSPECTIONS MADE BY ME AND TO THE BEST OF MY KNOWLEDGE I ALSO HAVE
              GIVEN THE ABOVE VALUATION AFTER CONSIDERING ALL RELEVANT FACTORS,
              WHICH AFFECTS THE VALUE OF THE VEHICLE TO THE BEST OF MY
              EXPERIENCE AND KNOWLEDGE.
            </p>
          </div>
          <div className="signature">
            <p>signature of the valuer</p>
            <p>Date: 2024/11/05</p>
          </div>
        </div>
      </div>
    </div>
  );
}
