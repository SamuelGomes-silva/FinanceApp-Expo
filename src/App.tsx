import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { LocaleConfig } from "react-native-calendars";
import { colors } from "./constants/colors";
import { Routes } from "./routes/routes";
import AuthContextProvider from "./contexts/AuthContext";
import { enableScreens } from "react-native-screens";
import Toast from "react-native-toast-message";

enableScreens();

export default function App() {
	return (
		<AuthContextProvider>
			<NavigationContainer>
				<StatusBar backgroundColor={colors.iceBlue} barStyle="dark-content" />
				<SafeAreaView style={styles.container}>
					<Routes />
				</SafeAreaView>
				<Toast position="top" visibilityTime={3000} autoHide />
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

LocaleConfig.locales["pt-br"] = {
	monthNames: [
		"Janeiro",
		"Fevereiro",
		"Março",
		"Abril",
		"Maio",
		"Junho",
		"Julho",
		"Agosto",
		"Setembro",
		"Outubro",
		"Novembro",
		"Dezembro",
	],
	monthNamesShort: [
		"Jan",
		"Fev",
		"Mar",
		"Abr",
		"Mai",
		"Jun",
		"Jul",
		"Ago",
		"Set",
		"Out",
		"Nov",
		"Dez",
	],
	dayNames: [
		"Domingo",
		"Segunda-feira",
		"Terça-feira",
		"Quarta-feira",
		"Quinta-feira",
		"Sexta-feira",
		"Sábado",
	],
	dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
	today: "Hoje",
};

LocaleConfig.defaultLocale = "pt-br";
