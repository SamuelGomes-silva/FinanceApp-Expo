import {
	DrawerContentComponentProps,
	DrawerContentScrollView,
	DrawerItem,
	DrawerItemList,
} from "@react-navigation/drawer";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/colors";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";

export default function CustomDrawerContent(
	props: DrawerContentComponentProps
) {
	const { user, handleLogOut } = useContext(AuthContext);
	return (
		<DrawerContentScrollView
			{...props}
			contentContainerStyle={styles.container}
		>
			<View style={styles.content}>
				<Image
					style={styles.image}
					resizeMode="contain"
					source={require("../../images/Logo.png")}
					alt="Logo"
				/>
				<Text style={{ fontSize: 25, fontWeight: "bold", marginTop: 10 }}>
					Bem-vindo
				</Text>
				<Text
					numberOfLines={1}
					ellipsizeMode="tail"
					style={{
						fontSize: 22,
						color: colors.black,
						marginTop: 5,
						marginBottom: 10,
					}}
				>
					{!user?.name ? "Nome não encontrado..." : user?.name}
				</Text>
			</View>
			<DrawerItemList {...props} />
			<DrawerItem
				label={"Sair"}
				{...props}
				onPress={handleLogOut}
				inactiveTintColor={colors.coralRed}
				icon={({ color, size }) => (
					<Ionicons name="log-out-outline" color={color} size={size} />
				)}
			/>
		</DrawerContentScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.iceBlue,
	},
	content: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 30,
		paddingHorizontal: 15,
	},
	image: {
		width: 120,
		height: 120,
	},
});
