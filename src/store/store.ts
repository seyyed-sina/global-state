import { Action, ActionType, AppState } from "./store.types";

type Listener = () => void;

export class Store {
  private state: AppState;
  private listeners: Listener[] = [];

  constructor(initialState: AppState) {
    this.state = initialState;
  }

  getState(): AppState {
    return this.state;
  }

  subscribe(listener: Listener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener());
  }

  dispatch(action: Action<ActionType, any>) {
    this.state = this.reducer(this.state, action);
    this.notifyListeners();
  }

  private reducer(state: AppState, action: Action<ActionType, any>): AppState {
    switch (action.type) {
      case "ADD_ITEM":
        return {
          ...state,
          items: [...state.items, action.payload.item],
        };
      case "REMOVE_ITEM":
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload.id),
        };
      case "UPDATE_ITEM":
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.item.id ? action.payload.item : item
          ),
        };
      default:
        return state;
    }
  }
}
