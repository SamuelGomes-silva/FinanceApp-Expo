import { useContext } from "react";
import { AuthRoutesStack } from "./auth.routes";
import { AuthContext } from "../contexts/AuthContext";
import { AppRouteStack } from "./app.routes";
import { ActivityIndicator, SafeAreaView, StyleSheet } from "react-native";
import { colors } from "../constants/colors";

export function Routes() {
	const { isAutenticated, loadingAuth } = useContext(AuthContext);

	if (loadingAuth) {
		return (
			<SafeAreaView style={styles.container}>
				<ActivityIndicator color={colors.emeraldGreen} size={"large"} />
			</SafeAreaView>
		);
	}

	return isAutenticated ? <AppRouteStack /> : <AuthRoutesStack />;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.iceBlue,
		justifyContent: "center",
		alignItems: "center",
	},
});
