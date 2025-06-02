import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { DrawerNav } from "../../routes/app.routes";

interface HeaderProps {
	title: string;
}

export default function Header({ title }: HeaderProps) {
	const nav = useNavigation<DrawerNav>();
	return (
		<View style={styles.container}>
			<Pressable onPress={() => nav.openDrawer()}>
				<Ionicons name="menu-outline" size={35} />
			</Pressable>
			<Text style={styles.title}>{title}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		paddingTop: 25,
		alignItems: "center",
		minHeight: 80,
		width: "100%",
	},
	title: {
		fontSize: 25,
		fontStyle: "italic",
		fontWeight: 600,
		marginLeft: 10,
	},
});
