import {
  Action,
  AddItemPayload,
  Item,
  RemoveItemPayload,
  UpdateItemPayload,
} from "./store.types";

// Action creators
export const addItem = (item: Item): Action<"ADD_ITEM", AddItemPayload> => ({
  type: "ADD_ITEM",
  payload: { item },
});

export const removeItem = (
  id: number
): Action<"REMOVE_ITEM", RemoveItemPayload> => ({
  type: "REMOVE_ITEM",
  payload: { id },
});

export const updateItem = (
  item: Item
): Action<"UPDATE_ITEM", UpdateItemPayload> => ({
  type: "UPDATE_ITEM",
  payload: { item },
});
