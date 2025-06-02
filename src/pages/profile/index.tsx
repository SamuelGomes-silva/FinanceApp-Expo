import {
	Pressable,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Header from "../../components/header";
import { colors } from "../../constants/colors";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { DrawerNav } from "../../routes/app.routes";

export default function Profile() {
	const { user, handleLogOut } = useContext(AuthContext);
	const nav = useNavigation<DrawerNav>();

	return (
		<SafeAreaView style={styles.container}>
			<Header title={"Meu perfil"} />
			<View style={styles.content}>
				<Text style={styles.title}>Bem vindo de volta</Text>
				<Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
					{user?.name}
				</Text>
				<TouchableOpacity
					style={styles.btnArea}
					onPress={() => nav.navigate("Register")}
				>
					<Text style={styles.btnText}>Registrar gastos</Text>
				</TouchableOpacity>
				<Pressable style={styles.logOutBtn} onPress={handleLogOut}>
					<Text style={styles.btnText}>Sair</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 15,
		backgroundColor: colors.iceBlue,
	},
	content: {
		flex: 1,
		paddingTop: 50,
		alignItems: "center",
	},
	title: {
		fontSize: 22,
		fontWeight: "bold",
		marginTop: 10,
	},
	name: {
		marginTop: 10,
		marginBottom: 10,
		paddingLeft: 5,
		paddingRight: 5,
		fontSize: 22,
	},
	btnArea: {
		width: "90%",
		padding: 10,
		marginTop: 10,
		marginBottom: 5,
		backgroundColor: colors.indigoBlue,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
	},
	btnText: {
		color: colors.white,
		fontSize: 18,
		fontWeight: "bold",
	},
	logOutBtn: {
		width: "90%",
		marginTop: 5,
		padding: 10,
		marginBottom: 8,
		backgroundColor: colors.coralRed,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
	},
});
