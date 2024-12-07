import React, { type ReactNode } from "react";

import iconsSet from "../styles/functional/fontawesomeIcons";
import componentMap from "../components/componentMap";

export type componentProps<k extends keyof typeof componentMap> =
  React.ComponentProps<(typeof componentMap)[k]>;

export type addingNewTabProps = {
  name: string;
  iconName: keyof typeof iconsSet;
  componentKey: keyof typeof componentMap;
  options?: componentProps<keyof typeof componentMap>;
};

export type textStylesType = "Bold" | "Underline-Bold" | "Normal";

export type commonElementGenerationType = {
  ElementType: "link" | "td" | "th";
  children: ReactNode;
  colSpan?: number;
};

export type usualTableFormatType = {
  [key: string]: {
    ColumnValue: string | number;
    ValueType: textStylesType;
  }[];
};

export type finalDocumentType = {
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
  SourceCode: {
    ContactPerson: string;
    CompanyDetails: {
      Type: "table";
      Collection: {
        [key: string]: string[];
      };
    };
    VehicleIdentificationDetails: {
      Type: "table";
      Collection01: usualTableFormatType[];
      Collection02: {
        [key: number]: {
          ColumnValue: string | number;
          ValueType: textStylesType;
        }[];
      }[];
    };
    PictureCollection: {
      ImgType: "Full-Block" | "Half Block";
      Image: number[];
    }[];
    TestsCollection: {
      Type: "table";
      Collection01: usualTableFormatType[];
      Collection02: usualTableFormatType[];
    };
    TechnicalEvaluation: {
      Type: "table";
      MainCollection: usualTableFormatType[];
      SubCollection: usualTableFormatType[];
      SubCollection2: usualTableFormatType[];
    };
    SupplierDeclaration: string;
    MarketValue: number;
    ForcedSaleValue: number;
    ValuerDeclaration: string;
  };
};
