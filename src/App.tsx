
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DogovorPage from "./pages/articles/DogovorPage";
import NeustoikaPage from "./pages/articles/NeustoikaPage";
import BrakPage from "./pages/articles/BrakPage";
import SudPage from "./pages/articles/SudPage";
import BotSetupPage from "./pages/BotSetupPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/bot-setup" element={<BotSetupPage />} />
            <Route path="/blog/dogovor" element={<DogovorPage />} />
            <Route path="/blog/neustoika" element={<NeustoikaPage />} />
            <Route path="/blog/brak" element={<BrakPage />} />
            <Route path="/blog/sud" element={<SudPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;