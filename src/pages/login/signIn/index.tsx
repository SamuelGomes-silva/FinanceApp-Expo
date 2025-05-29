import {
	Alert,
	Image,
	Keyboard,
	SafeAreaView,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../../routes/auth.routes";
import { styles } from "../styles";
import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

type SignInScreenNavigationProp = NativeStackNavigationProp<
	AuthStackParamList,
	"SignUp"
>;

export default function SignIn() {
	const nav = useNavigation<SignInScreenNavigationProp>();
	const { handleLogin, loadingAuth } = useContext(AuthContext);
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	async function login() {
		if (!email.trim() || !password.trim()) {
			Alert.alert("Todos os campos são obrigatorios!!");
			return;
		}
		Keyboard.dismiss();
		await handleLogin(email, password);
	}

	return (
		<TouchableWithoutFeedback
			onPress={() => Keyboard.dismiss()}
			touchSoundDisabled
		>
			<SafeAreaView style={styles.container}>
				<Image
					style={styles.image}
					alt="Logo do aplicativo"
					source={require("../../../images/Logo.png")}
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
					disabled={loadingAuth}
					onPress={login}
					activeOpacity={0.9}
				>
					<Text style={styles.btnText}>Acessar</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.btnLinkArea}
					onPress={() => nav.navigate("SignUp")}
					disabled={loadingAuth}
				>
					<Text style={styles.btnLinkText}>Criar uma conta gratuita</Text>
				</TouchableOpacity>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
}
