import { FC } from "react";
import { useStore } from "../../hooks/useStore";
import { Item } from "../../store/store.types";
import { addItem, removeItem, updateItem } from "../../store/store.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

export const ItemList: FC = () => {
  const { state, dispatch } = useStore();
  const items = state.items;
  const handleAddItem = () => {
    const newItem: Item = {
      id: items.length + 1,
      name: `Item ${items.length + 1}`,
    };
    dispatch(addItem(newItem));
  };

  const handleUpdateItem = (id: number) => {
    const updatedItem: Item = { id, name: `Updated Item ${id}` };
    dispatch(updateItem(updatedItem));
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id));
  };
  return (
    <div>
      <header className="flex items-center gap-4 mb-4">
        <h1 className="text-2xl font-semibold">Item List</h1>
        <button
          type="button"
          onClick={handleAddItem}
          className="border border-solid border-purple-500 p-2"
        >
          <FontAwesomeIcon icon={faPlus} />
          Add Item
        </button>
		<p className="ml-auto text-gray-500">Demonstration of global state</p>
      </header>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-3 leading-9 ">
            <h3 className="text-lg min-w-24">{item.name}</h3>
            <button onClick={() => handleUpdateItem(item.id)}>Update</button>
            <button
              onClick={() => handleRemoveItem(item.id)}
              className="text-red-500"
            >
              <FontAwesomeIcon icon={faTrash} size="sm" />
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
