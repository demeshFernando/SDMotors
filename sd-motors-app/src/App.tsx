import { type addingNewTabProps } from "./functionalitites/types";

import TabView from "./components/mainTabs/tabView";
import MainHeader from "./components/headers/main-header";
import { useState } from "react";

function App() {
  const [newTabObject, setNewTabObject] = useState<addingNewTabProps>();

  const OpenNewTab = (object: addingNewTabProps) => {
    setNewTabObject(object);
  };

  return (
    <div className="main-back-body">
      <MainHeader PassObjectForNewTab={OpenNewTab} />
      <TabView newTabObject={newTabObject} />
      <div className="main-body"></div>
    </div>
  );
}

export default App;
