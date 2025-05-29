import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";

import { colors } from "./constants/colors";
import { Routes } from "./routes/routes";
import AuthContextProvider from "./contexts/AuthContext";

export default function App() {
	return (
		<AuthContextProvider>
			<NavigationContainer>
				<StatusBar backgroundColor={colors.iceBlue} barStyle="dark-content" />
				<SafeAreaView style={styles.container}>
					<Routes />
				</SafeAreaView>
			</NavigationContainer>
		</AuthContextProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.iceBlue,
	},
});
