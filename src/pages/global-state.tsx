import { FC } from "react";
import { Sidebar } from "../components/global-state/sidebar";
import { ItemList } from "../components/global-state/item-list";

const GlobalState: FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="grow p-4">
        <ItemList />
      </div>
    </div>
  );
};

export default GlobalState;
