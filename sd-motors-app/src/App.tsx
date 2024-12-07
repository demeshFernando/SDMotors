import { useEffect, useState } from "react";

import { type addingNewTabProps } from "./functionalitites/types";

import TabView from "./components/mainTabs/tabView";
import MainHeader from "./components/headers/main-header";
import { StateGlobalization, OpenNewTab } from "./functionalitites/common.tsx";

function App() {
  const [newTabObject, setNewTabObject] = useState<addingNewTabProps>();

  useEffect(() => {
    StateGlobalization(setNewTabObject);
  }, [setNewTabObject]);

  return (
    <div className="main-back-body">
      <MainHeader PassObjectForNewTab={OpenNewTab} />
      <TabView newTabObject={newTabObject} />
    </div>
  );
}

export default App;
