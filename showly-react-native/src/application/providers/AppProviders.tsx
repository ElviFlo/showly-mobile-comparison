import { ReactNode } from "react";
import { ShowsProvider } from "../../features/presentation/state/showsContext";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return <ShowsProvider>{children}</ShowsProvider>;
}