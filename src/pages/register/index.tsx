import {
	ActivityIndicator,
	Alert,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import Header from "../../components/header";
import { colors } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import api from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";

export default function Register() {
	const [type, setType] = useState<string>("receita");
	const [description, setDescription] = useState<string>("");
	const [value, setValue] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const { handleToast } = useContext(AuthContext);

	async function handleRegister() {
		if (!type.trim() || !value.trim() || !description.trim()) {
			Alert.alert("Todos os campos devem ser preenchidos");
			return;
		}
		if (isNaN(Number(value)) || Number(value) <= 0) {
			Alert.alert("Informe um valor numérico válido maior que zero");
			return;
		}
		setLoading(true);
		try {
			let number = Number(value);
			let data = {
				description: description,
				value: number,
				type: type,
				date: new Date().toLocaleDateString("pt-br"),
			};
			await api.post("receive", data);
			setType("receita");
			setDescription("");
			setValue("");
			handleToast("success", "Registrado com sucesso!");
		} catch (error) {
			console.log(error);
			if (error instanceof Error) {
				handleToast("error", error.message);
			} else {
				handleToast("error", "Erro inesperado.");
			}
		} finally {
			setLoading(false);
		}
	}

	return (
		<SafeAreaView style={styles.container}>
			<Header title="Registrando" />
			<View style={styles.content}>
				<Text style={styles.title}>Registrar</Text>
				<TextInput
					value={description}
					onChangeText={setDescription}
					style={styles.input}
					placeholder="Descrição"
				/>
				<TextInput
					value={value}
					onChangeText={setValue}
					style={styles.input}
					placeholder="Valor desejado"
					keyboardType="numeric"
				/>
				<View style={styles.typeArea}>
					<TouchableOpacity
						onPress={() => setType("receita")}
						style={[
							type === "receita" ? styles.typeOption : styles.typeOptionVariant,
							{ marginRight: 10 },
						]}
						disabled={loading}
					>
						<Ionicons
							name="arrow-up-outline"
							size={24}
							color={type === "receita" ? colors.emeraldGreen : colors.black}
						/>
						<Text style={styles.typeText}>Receita</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={
							type === "despesa" ? styles.typeOption : styles.typeOptionVariant
						}
						disabled={loading}
						onPress={() => setType("despesa")}
					>
						<Ionicons
							name="arrow-down-outline"
							size={24}
							color={type === "despesa" ? colors.coralRed : colors.black}
						/>
						<Text style={styles.typeText}>Despesa</Text>
					</TouchableOpacity>
				</View>
				<TouchableOpacity
					style={styles.btnArea}
					onPress={handleRegister}
					disabled={loading}
				>
					<Text style={styles.btnText}>
						{loading ? (
							<ActivityIndicator color={colors.black} size={"small"} />
						) : (
							"Cadastrar"
						)}
					</Text>
				</TouchableOpacity>
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
		backgroundColor: colors.emeraldGreen,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
	},
	btnText: {
		color: colors.white,
		fontSize: 18,
		fontWeight: "bold",
	},
	typeArea: {
		justifyContent: "space-between",
		width: "90%",
		maxHeight: 50,
		marginBottom: 6,
		flexDirection: "row",
	},
	typeOption: {
		flexDirection: "row",
		flex: 1,
		height: 40,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 2,
		borderColor: colors.indigoBlue,
		borderRadius: 8,
		backgroundColor: colors.white,
	},
	typeOptionVariant: {
		flexDirection: "row",
		flex: 1,
		height: 40,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 8,
		backgroundColor: colors.lightGray,
		fontWeight: "bold",
	},
	typeText: {
		fontSize: 18,
		fontWeight: "bold",
		marginLeft: 5,
	},
	title: {
		width: "90%",
		marginBottom: 10,
		fontSize: 22,
		fontWeight: 800,
		textAlign: "left",
	},
});
