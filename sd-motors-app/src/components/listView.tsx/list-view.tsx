type THType = {
  classNameFor: "TH";
  isLastElement: boolean;
};

type TDType = {
  classNameFor: "TD";
  isLastElement: boolean;
  isElementCentered: boolean;
  isEven: boolean;
};

type GenerateClassNamesProps = THType | TDType;

type GenerateClassNamesReturnProps = {
  headerElementClassNames: string;
  chidElementClassNames: string;
};

type headerItemDisplay = (string | JSX.Element)[];

type ListHeaderProps = {
  displayNames: headerItemDisplay;
};

type ListItemsProps = {
  headerItems: headerItemDisplay;
  grandElements: (string | JSX.Element)[][];
  onDocumentOpening: (documentID: number, documentVersionID: number) => void;
};

function GenerateClassNames(
  props: GenerateClassNamesProps
): GenerateClassNamesReturnProps {
  let centerAlignment: string = "center-align";
  let addColor: string = "color-blue";
  let addBorder: string = "with-border";
  if (props.classNameFor === "TH") {
    if (!props.isLastElement) {
      return {
        headerElementClassNames: addBorder,
        chidElementClassNames: "",
      };
    }
    return {
      headerElementClassNames: "",
      chidElementClassNames: "",
    };
  }

  if (props.isElementCentered && props.isLastElement && props.isEven) {
    return {
      headerElementClassNames: "",
      chidElementClassNames: centerAlignment,
    };
  } else if (props.isElementCentered && props.isLastElement) {
    return {
      headerElementClassNames: addColor,
      chidElementClassNames: centerAlignment,
    };
  } else if (props.isElementCentered && props.isEven) {
    return {
      headerElementClassNames: "",
      chidElementClassNames: centerAlignment,
    };
  } else if (props.isLastElement && props.isEven) {
    return {
      headerElementClassNames: "",
      chidElementClassNames: "",
    };
  } else if (props.isElementCentered) {
    return {
      headerElementClassNames: addColor,
      chidElementClassNames: centerAlignment,
    };
  } else if (props.isLastElement) {
    return {
      headerElementClassNames: addColor,
      chidElementClassNames: "",
    };
  } else if (props.isEven) {
    return {
      headerElementClassNames: "",
      chidElementClassNames: "",
    };
  }
  return {
    headerElementClassNames: addColor,
    chidElementClassNames: "",
  };
}

export default function ListItems({
  headerItems,
  grandElements,
  onDocumentOpening,
}: ListItemsProps) {
  const onClickEvent = (documentID: number, documentVersionID: number) => {
    if (documentID > -1 && documentVersionID > -1) {
      onDocumentOpening(documentID, documentVersionID);
    }
  };

  const FilterIDs = (
    index: number,
    idHolderHeaderName: string,
    versionIdHolderHeaderName: string
  ) => {
    let documentID: number = -1;
    let documentVersionID: number = -1;
    let idFoundIndex: number = -1;
    let versionIdFoundIndex: number = -1;

    //checking whether the header has a length
    if (headerItems.length <= 0) {
      return {
        documentID: documentID,
        documentVersionID: documentVersionID,
      };
    }

    //finding the ID holding index
    for (let i = 0; i < headerItems.length; i++) {
      if (headerItems[i] === idHolderHeaderName) {
        idFoundIndex = i;
      } else if (headerItems[i] === versionIdHolderHeaderName) {
        versionIdFoundIndex = i;
      }
    }

    if (idFoundIndex > -1 && versionIdFoundIndex > -1) {
      let idElement = grandElements[index][idFoundIndex];
      let versionIdElement = grandElements[index][versionIdFoundIndex];
      try {
        if (
          typeof idElement === "string" &&
          typeof versionIdElement === "string"
        ) {
          documentID = Number.parseInt(idElement);
          documentVersionID = Number.parseInt(versionIdElement);
        }
      } catch (E) {
        return {
          documentID: documentID,
          documentVersionID: documentVersionID,
        };
      }
    }

    return {
      documentID: documentID,
      documentVersionID: documentVersionID,
    };
  };

  const Elements = grandElements.map((children, index) => {
    const isEvenRow: boolean = index % 2 === 0;
    const headerClassNamesGeneration: GenerateClassNamesReturnProps =
      GenerateClassNames({
        classNameFor: "TD",
        isElementCentered: true,
        isEven: isEvenRow,
        isLastElement: false,
      });

    const childrenMappings = children.map((child, childIndex) => {
      const generatedClassNames: GenerateClassNamesReturnProps =
        GenerateClassNames({
          classNameFor: "TD",
          isElementCentered: true,
          isEven: isEvenRow,
          isLastElement: children.length - 1 === childIndex,
        });

      if (typeof child === "string") {
        return generatedClassNames.chidElementClassNames === "" ? (
          <td key={index + "" + childIndex}>{child}</td>
        ) : (
          <td
            key={index + "" + childIndex}
            className={generatedClassNames.chidElementClassNames}
          >
            {child}
          </td>
        );
      }
      return generatedClassNames.chidElementClassNames === "" ? (
        <td
          key={index + "" + childIndex}
          onClick={() => {
            onClickEvent(
              FilterIDs(index, "ID", "Version").documentID,
              FilterIDs(index, "ID", "Version").documentVersionID
            );
          }}
        >
          {child}
        </td>
      ) : (
        <td
          key={index + "" + childIndex}
          className={generatedClassNames.chidElementClassNames}
          onClick={() => {
            onClickEvent(
              FilterIDs(index, "ID", "Version").documentID,
              FilterIDs(index, "ID", "Version").documentVersionID
            );
          }}
        >
          {child}
        </td>
      );
    });

    return headerClassNamesGeneration.headerElementClassNames === "" ? (
      <tr key={index}>{childrenMappings}</tr>
    ) : (
      <tr
        key={index}
        className={headerClassNamesGeneration.headerElementClassNames}
      >
        {childrenMappings}
      </tr>
    );
  });

  return grandElements.length === 0 || grandElements[0].length === 0 ? (
    <>
      <table className="list-view">
        <ListHeader displayNames={headerItems} />
      </table>
      <div className="empty-list-view">No Records</div>
    </>
  ) : (
    <table className="list-view">
      <ListHeader displayNames={headerItems} />
      <tbody>{Elements}</tbody>
    </table>
  );
}

function ListHeader({ displayNames }: ListHeaderProps) {
  const headerElement = displayNames.map((displayName, index) => {
    if (displayNames.length - 1 === index) {
      if (typeof displayName === "string") {
        return (
          <th key={index}>
            <strong>{displayName}</strong>
          </th>
        );
      }

      return <th key={index}>{displayName}</th>;
    }

    let generatedClassNames: GenerateClassNamesReturnProps = GenerateClassNames(
      {
        classNameFor: "TH",
        isLastElement: false,
      }
    );
    if (typeof displayName === "string") {
      return (
        <th key={index} className={generatedClassNames.headerElementClassNames}>
          <strong>{displayName}</strong>
        </th>
      );
    }

    return (
      <th className={generatedClassNames.headerElementClassNames} key={index}>
        {displayName}
      </th>
    );
  });
  return (
    <thead>
      <tr>{headerElement}</tr>
    </thead>
  );
}
