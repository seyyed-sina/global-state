import {
  FC,
  PropsWithChildren, createContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { Action, ActionType, AppState } from "./store.types";
import { Store } from "./store";

// Create a context with a placeholder default value
export const StoreContext = createContext<
  | { state: AppState; dispatch: (action: Action<ActionType, unknown>) => void }
  | undefined
>(undefined);

export const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const initialState: AppState = useMemo(() => ({ items: [] }), []);
  const store = useMemo(() => new Store(initialState), [initialState]);

  const [state, setState] = useState(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(store.getState());
    });
    return () => {
      unsubscribe();
    };
  }, [store]);

  return (
    <StoreContext.Provider
      value={{ state, dispatch: store.dispatch.bind(store) }}
    >
      {children}
    </StoreContext.Provider>
  );
};
