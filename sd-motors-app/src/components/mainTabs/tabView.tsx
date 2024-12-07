import { useEffect, useState } from "react";
import {
  type addingNewTabProps,
  type componentProps,
} from "../../functionalitites/types.tsx";

import componentMap from "../componentMap.tsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import iconsSet from "../../styles/functional/fontawesomeIcons";

type isTabActiveProps = {
  name: string;
  iconName: keyof typeof iconsSet;
  isActive: boolean;
  classNames: string;
  lastActiveTime: Date;
  componentKey: keyof typeof componentMap;
  options: componentProps<keyof typeof componentMap>;
};

type tabViewProps = {
  newTabObject: addingNewTabProps | undefined;
};

type customComponentProps<k extends keyof typeof componentMap> = {
  componentKey: k;
  options?: componentProps<k>;
};

const CustomComponent = <k extends keyof typeof componentMap>({
  componentKey,
  options,
}: customComponentProps<k>) => {
  const Component = componentMap[componentKey] as React.ComponentType<
    (typeof componentMap)[k]
  >;
  return <Component {...(options as (typeof componentMap)[k])} />;
};

export default function TabView({ newTabObject }: tabViewProps) {
  const [isTabActive, setIsTabActive] = useState<isTabActiveProps[]>([]);
  let Component = <CustomComponent componentKey="DefaultComponent" />;

  useEffect(() => {
    if (typeof newTabObject !== "undefined") {
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
          componentKey: isTabActive[i].componentKey,
          options: isTabActive[i].options,
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
      componentKey: tabDetails.componentKey,
      options: tabDetails.options,
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
            componentKey: isTabActive[i].componentKey,
            options: isTabActive[i].options,
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
            componentKey: isTabActive[i].componentKey,
            options: isTabActive[i].options,
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
            componentKey: isTabActive[i].componentKey,
            options: isTabActive[i].options,
          },
        ];
      }
    }
    setIsTabActive(openedTabs);
  };

  const generateChildren = isTabActive.map((child, index) => {
    if (child.isActive) {
      Component = (
        <CustomComponent
          componentKey={child.componentKey}
          options={child.options}
        />
      );
    }
    return (
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
    );
  });

  if (typeof newTabObject !== undefined) {
    if (typeof newTabObject?.options !== undefined) {
      return isTabActive.length > 0 ? (
        <>
          <div className="tab-view">{generateChildren}</div>
          <div className="main-body">{Component}</div>
        </>
      ) : (
        <div className="tab-view-empty"></div>
      );
    }
  }

  return isTabActive.length > 0 ? (
    <>
      <div className="tab-view">{generateChildren}</div>
      <div className="main-body">{Component}</div>
    </>
  ) : (
    <div className="tab-view-empty"></div>
  );
}
