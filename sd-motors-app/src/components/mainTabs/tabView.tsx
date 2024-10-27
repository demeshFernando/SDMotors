import { useEffect, useState } from "react";
import { type addingNewTabProps } from "../../functionalitites/types.tsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import iconsSet from "../../styles/functional/fontawesomeIcons";

type isTabActiveProps = {
  name: string;
  iconName: keyof typeof iconsSet;
  isActive: boolean;
  classNames: string;
  lastActiveTime: Date;
};

type tabViewProps = {
  newTabObject: addingNewTabProps | undefined;
};

export default function TabView({ newTabObject }: tabViewProps) {
  const [isTabActive, setIsTabActive] = useState<isTabActiveProps[]>([]);

  useEffect(() => {
    if (typeof newTabObject != "undefined") {
      ConfigureNewTab(newTabObject);
    }
  }, [newTabObject]);

  const ConfigureNewTab = (tabDetails: addingNewTabProps): void => {
    //checking whether the tab is available or not
    let isNewTabAvailable: boolean = false;
    let openedTabs: isTabActiveProps[] = [];
    for (let i: number = 0; i < isTabActive.length; i++) {
      if (isTabActive[i].name === tabDetails.name) {
        isNewTabAvailable = true;
        openedTabs = [];
        break;
      }
      openedTabs = [
        ...openedTabs,
        {
          name: isTabActive[i].name,
          isActive: false,
          classNames: "button-content",
          iconName: isTabActive[i].iconName,
          lastActiveTime: isTabActive[i].lastActiveTime,
        },
      ];
    }

    //if available
    if (isNewTabAvailable) {
      ToggleTabActiveStatus(tabDetails.name);
      return;
    }

    //if not
    let newTabProperties: isTabActiveProps = {
      name: tabDetails.name,
      isActive: true,
      classNames: "button-content active",
      iconName: tabDetails.iconName,
      lastActiveTime: new Date(),
    };
    setIsTabActive([...openedTabs, newTabProperties]);
  };

  const RemoveActiveTab = (tabName: string): void => {
    //searching for the tab
    let newTabObjects: isTabActiveProps[] = [];
    let isRemovingTabAvailableAndRemoved: boolean = false;
    for (let i: number = 0; i < isTabActive.length; i++) {
      if (isTabActive[i].name !== tabName) {
        newTabObjects = [...newTabObjects, isTabActive[i]];
      } else if (isTabActive[i].name === tabName) {
        isRemovingTabAvailableAndRemoved = true;
      }
    }

    if (isRemovingTabAvailableAndRemoved && newTabObjects.length > 0) {
      //getting the last active tab
      let lastActiveTab: Date = newTabObjects[0].lastActiveTime;
      let activatingTabIndex: number = 0;
      for (let i: number = 0; i < newTabObjects.length; i++) {
        if (newTabObjects[i].lastActiveTime > lastActiveTab) {
          activatingTabIndex = i;
        }
      }

      newTabObjects[activatingTabIndex].isActive = true;
      newTabObjects[activatingTabIndex].classNames = "button-content active";
      setIsTabActive(newTabObjects);
    } else {
      setIsTabActive([]);
    }
  };

  const ToggleTabActiveStatus = (tabName: string): void => {
    let openedTabs: isTabActiveProps[] = [];
    let isEvenOneTabActive: boolean = false;
    for (let i: number = 0; i < isTabActive.length; i++) {
      if (isTabActive[i].name === tabName) {
        openedTabs = [
          ...openedTabs,
          {
            name: isTabActive[i].name,
            isActive: true,
            classNames: "button-content active",
            iconName: isTabActive[i].iconName,
            lastActiveTime: new Date(),
          },
        ];
        isEvenOneTabActive = true;
      } else if (i === isTabActive.length - 1 && !isEvenOneTabActive) {
        openedTabs = [
          ...openedTabs,
          {
            name: isTabActive[i].name,
            isActive: true,
            classNames: "button-content active",
            iconName: isTabActive[i].iconName,
            lastActiveTime: new Date(),
          },
        ];
      } else {
        openedTabs = [
          ...openedTabs,
          {
            name: isTabActive[i].name,
            isActive: false,
            classNames: "button-content",
            iconName: isTabActive[i].iconName,
            lastActiveTime: isTabActive[i].lastActiveTime,
          },
        ];
      }
    }
    setIsTabActive(openedTabs);
  };

  const generateChildren = isTabActive.map((child, index) => (
    <div className="tab-button" key={index}>
      <div className={child.classNames}>
        <div className="button-name-logo">
          <FontAwesomeIcon icon={iconsSet[child.iconName]} />
        </div>
        <div
          onClick={() => {
            ToggleTabActiveStatus(child.name);
          }}
          className="button-name"
        >
          {child.name}
        </div>
        {child.isActive ? (
          <div
            onClick={() => {
              RemoveActiveTab(child.name);
            }}
            className="button-closing-logo"
          >
            <FontAwesomeIcon icon={iconsSet["faXmark"]} />
          </div>
        ) : null}
      </div>
    </div>
  ));

  return isTabActive.length > 0 ? (
    <>
      <div className="tab-view">{generateChildren}</div>
      <div>Content here</div>
    </>
  ) : (
    <div className="tab-view-empty"></div>
  );
}
