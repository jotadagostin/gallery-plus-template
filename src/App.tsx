import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageComponents from "./pages/pages-components";
import LayoutMain from "./pages/layout-main";
import PageHome from "./pages/pages-home";
import PagePhotoDetails from "./pages/pages-photo-details";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <BrowserRouter>
          <Routes>
            <Route element={<LayoutMain />}>
              <Route index element={<PageHome />} />
              <Route path="/photos/:id" element={<PagePhotoDetails />} />
              <Route path="/components" element={<PageComponents />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </NuqsAdapter>
    </QueryClientProvider>
  );
}
