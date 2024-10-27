import iconsSet from "../styles/functional/fontawesomeIcons";

export type addingNewTabProps = {
  name: string;
  iconName: keyof typeof iconsSet;
  componentPointer: React.ComponentType;
};
