import { FC } from "react";
import { useStore } from "../../hooks/useStore";
import { removeItem } from "../../store/store.actions";

export const Sidebar: FC = () => {
  const { state, dispatch } = useStore();
  const items = state.items;

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id));
  };

  return (
    <aside className="w-80 h-[calc(100vh-56px)] bg-white shrink-0 p-4 hidden md:block">
      <h2 className="text-lg mb-4">Item List</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-3 leading-9">
            {item.name}
            <button
              className="text-red-500 text-sm ml-auto"
              onClick={() => handleRemoveItem(item.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

Sidebar.displayName = "Sidebar";
