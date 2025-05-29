import {
	ActivityIndicator,
	Alert,
	Keyboard,
	SafeAreaView,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from "react-native";
import { styles } from "../styles";
import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { colors } from "../../../constants/colors";

export default function SignUp() {
	const { handleSignUp, loadingAuth } = useContext(AuthContext);
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	async function handleRegister() {
		if (!name.trim() || !email.trim() || !password.trim()) {
			Alert.alert("Todos os campos são obrigatorios!!");
			return;
		}
		Keyboard.dismiss();
		await handleSignUp(name, email, password);
	}

	return (
		<TouchableWithoutFeedback
			onPress={() => Keyboard.dismiss()}
			touchSoundDisabled
		>
			<SafeAreaView style={styles.container}>
				<TextInput
					value={name}
					onChangeText={setName}
					style={styles.input}
					placeholder="Nome"
				/>
				<TextInput
					value={email}
					onChangeText={setEmail}
					style={styles.input}
					placeholder="Email"
				/>
				<TextInput
					value={password}
					onChangeText={setPassword}
					secureTextEntry
					style={styles.input}
					placeholder="Senha"
				/>
				<TouchableOpacity
					style={styles.btnArea}
					onPress={handleRegister}
					disabled={loadingAuth}
					activeOpacity={0.9}
				>
					<Text style={styles.btnText}>
						{loadingAuth ? (
							<ActivityIndicator color={colors.emeraldGreen} size={"large"} />
						) : (
							"Cadastrar"
						)}
					</Text>
				</TouchableOpacity>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
}
