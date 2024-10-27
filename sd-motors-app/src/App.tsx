import { useState } from "react";

import { type addingNewTabProps } from "./functionalitites/types";

import TabView from "./components/mainTabs/tabView";
import MainHeader from "./components/headers/main-header";

function App() {
  const [newTabObject, setNewTabObject] = useState<addingNewTabProps>();

  const OpenNewTab = (object: addingNewTabProps) => {
    setNewTabObject(object);
  };

  return (
    <div className="main-back-body">
      <MainHeader PassObjectForNewTab={OpenNewTab} />
      <TabView newTabObject={newTabObject} />
    </div>
  );
}

export default App;
