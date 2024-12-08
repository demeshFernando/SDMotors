import DocumentView from "./documents/document";
import Notification from "./notification/notification";
import Document from "./documents/documents";
import StaffOptions from "./staffOptions/staffOptions";

export default {
  DefaultComponent: () => {
    return <div className="main-body"></div>;
  },
  Documents: Document,
  DocumentViewComponent: DocumentView,
  Notification: Notification,
  SettingsView: StaffOptions,
} as const;
