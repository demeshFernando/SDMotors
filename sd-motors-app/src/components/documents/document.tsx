import { useState } from "react";

import Button from "../inputs/button.tsx";
import TextBox from "../inputs/text.tsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import iconsSet from "../../styles/functional/fontawesomeIcons.tsx";

import moment from "../../functionalitites/moment.tsx";

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
    Collection01: {
      [key: string]: {
        ColumnValue: string | number;
        ValueType: "Bold" | "Underline-Bold" | "Normal";
      }[];
    }[];
    Collection02: {
      [key: string]: (string | number)[];
    }[];
  };
  PictureCollection: string[];
  TestsCollection: {
    Type: "table";
    Collection01: {
      [key: string]: string[];
    }[];
    Collection02: {
      [key: string]: string[];
    }[];
  };
  TechnicalEvaluation: {
    Type: "table";
    Collection: {
      [key: string]: string[];
    }[];
  };
  SupplierDeclaration: string;
  MarketValue: number;
  ForcedSaleValue: number;
  ValuerDeclaration: string;
  Date: string;
  IsSigned: boolean;
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
  PrevModel: {
    SourceCode: loadDocumentType;
  } & otherPropTypes;
  Properties: {
    IsInModifyingState: boolean;
  };
} & otherPropTypes;

export default function DocumentView() {
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
        ],
        Collection02: [],
      },
      PictureCollection: [],
      TestsCollection: {
        Type: "table",
        Collection01: [],
        Collection02: [],
      },
      TechnicalEvaluation: {
        Type: "table",
        Collection: [],
      },
      SupplierDeclaration: "",
      MarketValue: 0,
      ForcedSaleValue: 0,
      ValuerDeclaration: "",
      Date: "",
      IsSigned: false,
    },
    PrevModel: {
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
          Collection01: [],
          Collection02: [],
        },
        PictureCollection: [],
        TestsCollection: {
          Type: "table",
          Collection01: [],
          Collection02: [],
        },
        TechnicalEvaluation: {
          Type: "table",
          Collection: [],
        },
        SupplierDeclaration: "",
        MarketValue: 0,
        ForcedSaleValue: 0,
        ValuerDeclaration: "",
        Date: "",
        IsSigned: false,
      },
    },
    Properties: {
      IsInModifyingState: false,
    },
  });

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

  return (
    <div className="document">
      <div className="document-header">
        <div className="document-left">
          <div className="document-name fix-height">
            <strong>Document Name:</strong>
            <TextBox
              id="search"
              name="search"
              placeHolder="Document Name"
              value={loadedDocument.DocumentName}
            />
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

          <Button
            buttonType="WithDropDownMenu"
            buttonBackgroundColor="general-white"
            buttonStyle="Flat"
            spaceAround="Left"
            dropDownItems={[
              {
                iconName: "faNoteSticky",
                mainHeader: "Notes",
              },
              {
                iconName: "faCodeCompare",
                mainHeader: "Compares",
              },
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
      <div className="document-body">
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
          <div className="usual-evaluation">
            <table className="main-evaluation-table">
              <thead>
                <tr>
                  <th>1</th>
                  <th colSpan={5}>VEHICLE IDENTIFICATION DETAILS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1.1</td>
                  <td>make</td>
                  <td>SUZUKI</td>
                  <td>1.10</td>
                  <td>fuel type</td>
                  <td>EFI</td>
                </tr>
                <tr>
                  <td>1.2</td>
                  <td>Model</td>
                  <td>DAA MH55S WAGON R</td>
                  <td>TYPE OF FUEL</td>
                  <td>PETROL / ELE</td>
                  <td></td>
                </tr>
                <tr>
                  <td>1.3</td>
                  <td>CLASSIFICATION</td>
                  <td>MOTOR CAR</td>
                  <td>1.12</td>
                  <td>ENGINE CAPACITY</td>
                  <td>650.00CC</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="usual-evaluation">
            <table className="other-mains-table">
              <tbody>
                <tr>
                  <th>1.20</th>
                  <td>CURRENT OWNER</td>
                  <td colSpan={2}>MR. T.H.S. Thushanka</td>
                </tr>
                <tr>
                  <th>1.21</th>
                  <td>EXTRA OPTIONS</td>
                  <td colSpan={2}>
                    FULL OPTION - TV, DVD, R/CAMERA, ALLOY WHEEL
                  </td>
                </tr>
                <tr>
                  <th>1.22</th>
                  <td>COMPLIANCE OF ABOVE (1.0 - 1.24) WITH CR</td>
                  <td>YES</td>
                  <td>IF COMMENTS: </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="tests">
            <table className="test1">
              <thead>
                <tr>
                  <th colSpan={2}>ROAD TEST</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>done on</td>
                  <td>05/11/2024</td>
                </tr>
                <tr>
                  <td>Not done because</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>average fuel consumption P/Liter</td>
                  <td>15 KMS</td>
                </tr>
              </tbody>
            </table>
            <table className="test2">
              <thead>
                <tr>
                  <th colSpan={2}>availability of spaires</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>body parts</td>
                  <td>available</td>
                </tr>
                <tr>
                  <td>engine parts</td>
                  <td>available</td>
                </tr>
                <tr>
                  <td>accessories</td>
                  <td>available</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="technical-evaluation usual-evaluation">
            <table className="technical-evaluation-table">
              <tbody>
                <tr>
                  <th colSpan={2}>4.0 technical evaluation</th>
                  <td>engine condition</td>
                  <td>good</td>
                  <th>major repairs</th>
                  <th>condition</th>
                </tr>
                <tr>
                  <td>transmission</td>
                  <td>automatic</td>
                  <td>engine status</td>
                  <td>good</td>
                  <td>need with in a year</td>
                  <td>no</td>
                </tr>
                <tr>
                  <td>clutch</td>
                  <td>good</td>
                  <td>electrical system</td>
                  <td></td>
                  <td>body parts replaced</td>
                  <td>no</td>
                </tr>
              </tbody>
            </table>
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
