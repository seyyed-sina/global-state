import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Layout } from "./components/Layout";
import { ROUTES } from "./constants/routes";
import GlobalState from "./pages/global-state";
import Planets from "./pages/planets";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<GlobalState />}></Route>
        <Route path={ROUTES.GLOBAL_STATE} element={<GlobalState />}></Route>
        <Route path={ROUTES.PLANETS} element={<Planets />}></Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
