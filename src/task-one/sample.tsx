import { FC, memo } from "react";
import { addItem, removeItem, updateItem } from "./actions";
import { Store } from "./store";
import { AppState } from "./types";

// Initial state
const initialState: AppState = {
  items: [],
};

// Create the store
const store = new Store(initialState);

// Subscribe to state changes
store.subscribe(() => {
  console.log("State changed:", store.getState());
});

// Dispatch actions
store.dispatch(addItem({ id: 1, name: "Item 1" }));
store.dispatch(addItem({ id: 2, name: "Item 2" }));
store.dispatch(updateItem({ id: 1, name: "Updated Item 1" }));
store.dispatch(removeItem(2));

export const Sample: FC = memo(() => {
  const { items } = store.getState();

  const handleUpdateItem = (id: number, newName: string) => {
    store.dispatch(updateItem({ id, name: newName }));
  };
  const handleRemoveItem = (id: number) => {
    store.dispatch(removeItem(id));
  };
  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <div key={item.id} className="flex gap-3 items-center">
          <div>{item.name}</div>
          <button
            onClick={() => handleUpdateItem(item.id, "Updated " + item.name)}
          >
            Update
          </button>
          <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
        </div>
      ))}
      <button
        onClick={() => store.dispatch(addItem({ id: 3, name: "Item 3" }))}
      >
        Add Item
      </button>
    </div>
  );
});

Sample.displayName = "Sample";
