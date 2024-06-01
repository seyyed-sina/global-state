// Define the state interface
export interface Item {
  id: number;
  name: string;
}

export interface AppState {
  items: Item[];
}

// Define action types
export type ActionType = "ADD_ITEM" | "REMOVE_ITEM" | "UPDATE_ITEM";

export interface Action<T extends ActionType, P> {
  type: T;
  payload: P;
}

// Action payloads
export interface AddItemPayload {
  item: Item;
}

export interface RemoveItemPayload {
  id: number;
}

export interface UpdateItemPayload {
  item: Item;
}
