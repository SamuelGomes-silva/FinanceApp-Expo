import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";

export default function Dashboard() {
	const { handleLogOut } = useContext(AuthContext);
	return (
		<View style={styles.container}>
			<Pressable onPress={handleLogOut}>
				<Text>Sair</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
