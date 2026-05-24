import { StatusBar } from "expo-status-bar";
import { AppProviders } from "./src/application/providers/AppProviders";
import { AppNavigator } from "./src/application/navigation/AppNavigator";

export default function App() {
  return (
    <AppProviders>
      <StatusBar style="light" />
      <AppNavigator />
    </AppProviders>
  );
}