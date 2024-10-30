import Button from "../inputs/button";
import Document from "../documents/document";
import Notification from "../notification/notification";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import iconsSet from "../../styles/functional/fontawesomeIcons";

import moment from "../../functionalitites/moment";
import { type addingNewTabProps } from "../../functionalitites/types";

type mainHeaderProps = {
  PassObjectForNewTab: (object: addingNewTabProps) => void;
};

/**
 * Owner: Demesh Fernando
 * Last Updated Date: October 23, 2024
 * Description: This will responsible
 * in creating the main header sections of the app.
 * @returns Main header component of the application.
 * @component
 */
export default function MainHeader(props: mainHeaderProps) {
  const GenerateNewTab = (exportObject: addingNewTabProps) => {
    props.PassObjectForNewTab(exportObject);
  };

  return (
    <div className="main-header general-blue">
      <div className="left-section-logo font-white">
        <h1>Logo</h1>
      </div>
      <div className="middle-section-dateTime font-white">
        <h3>{moment.GetDayName()}</h3>
        <h3>{moment.GetDate()}</h3>
      </div>
      <div className="right-section-functionalities">
        <Button
          onClick={() => {
            GenerateNewTab({
              name: "Notification",
              iconName: "faMessage",
              componentPointer: Notification,
            });
          }}
          buttonBackgroundColor="general-blue"
          buttonType="Normal"
          buttonStyle="Flat-Rounded"
        >
          Notification
        </Button>
        <Button
          onClick={() => {
            GenerateNewTab({
              name: "Documents",
              iconName: "faFile",
              componentPointer: Document,
            });
          }}
          buttonBackgroundColor="general-blue"
          buttonType="Normal"
          buttonStyle="Flat-Rounded"
        >
          Documents
        </Button>
        <Button
          onClick={() => {
            GenerateNewTab({
              name: "Settings",
              iconName: "faGear",
              componentPointer: Document,
            });
          }}
          buttonBackgroundColor="general-blue"
          buttonType="Normal"
          buttonStyle="Flat-Rounded"
        >
          <FontAwesomeIcon icon={iconsSet["faGear"]} />
        </Button>
        <Button
          buttonType="WithDropDownMenu"
          buttonStyle="Flat-Rounded"
          buttonBackgroundColor="general-blue"
          dropDownItems={[
            { mainHeader: "View Profile", iconName: "faUser" },
            { mainHeader: "Sign out", iconName: "faRightFromBracket" },
          ]}
        >
          <span>Hansika</span> <span>Wijerathne</span>
        </Button>
      </div>
    </div>
  );
}
