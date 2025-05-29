import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 150,
		paddingLeft: 5,
		paddingRight: 5,
		alignItems: "center",
		backgroundColor: colors.iceBlue,
	},
	image: {
		width: 150,
		height: 150,
		resizeMode: "contain",
		marginBottom: 50,
	},
	input: {
		width: "90%",
		paddingHorizontal: 10,
		height: 40,
		marginBottom: 8,
		backgroundColor: colors.white,
		borderRadius: 8,
	},
	btnArea: {
		width: "90%",
		padding: 10,
		marginBottom: 8,
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
	btnLinkArea: {
		justifyContent: "center",
		width: "90%",
		alignItems: "center",
	},
	btnLinkText: {
		color: colors.black,
		fontSize: 18,
	},
});
