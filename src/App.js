import { UserDataStorage } from "./UserDataContext";
import withContainer from "./Container";
import Component from "./Component";

export default function App() {
  const ComponentContainer = withContainer(Component);
  const randomColor = "red";
  return (
    <UserDataStorage>
      <ComponentContainer someColor={randomColor} />
    </UserDataStorage>
  );
}
