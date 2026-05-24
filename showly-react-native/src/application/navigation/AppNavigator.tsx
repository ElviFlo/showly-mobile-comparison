import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, StyleSheet, Text } from "react-native";
import { RootStackParamList } from "./RootStackParamList";
import { ShowsScreen } from "../../features/presentation/screens/ShowsScreen";
import { ShowDetailScreen } from "../../features/presentation/screens/ShowDetailScreen";
import { ShowFormScreen } from "../../features/presentation/screens/ShowFormScreen";
import { MetricsScreen } from "../../features/presentation/screens/MetricsScreen";
import { colors } from "../../core/theme/colors";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: "900",
          },
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen
          name="Shows"
          component={ShowsScreen}
          options={{ title: "Showly" }}
        />

        <Stack.Screen
          name="ShowDetail"
          component={ShowDetailScreen}
          options={({ navigation }) => ({
            title: "",
            headerLeft: () => (
              <Pressable
                style={styles.headerBackButton}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.headerBackButtonText}>← Back to home</Text>
              </Pressable>
            ),
          })}
        />

        <Stack.Screen
          name="ShowForm"
          component={ShowFormScreen}
          options={{ title: "Edit show" }}
        />

        <Stack.Screen
          name="Metrics"
          component={MetricsScreen}
          options={{ title: "Metrics" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerBackButton: {
    marginLeft: 18,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  headerBackButtonText: {
    color: colors.text,
    fontWeight: "900",
    fontSize: 14,
  },
});