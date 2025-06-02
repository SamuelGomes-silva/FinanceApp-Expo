import {
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { colors } from "../../constants/colors";
import { Calendar } from "react-native-calendars";
import { useEffect, useState } from "react";

interface ModalProps {
	modalVisible: () => void;
	setDate: any;
	date: string;
	onFilter: (filter: string) => void;
	loading: boolean;
	dateSelected: string;
	setDateSelected: (date: string) => void;
}

interface Day {
	dateString: string;
	day: number;
	month: number;
	year: number;
	timestamp: number;
}

export default function ModalContent({
	modalVisible,
	setDate,
	date,
	onFilter,
	loading,
	dateSelected,
	setDateSelected,
}: ModalProps) {
	const [dateNow, setDateNow] = useState<string>("");

	useEffect(() => {
		if (!dateSelected) {
			const dateDDMMYYYY = date;
			const parts = dateDDMMYYYY.split("-"); // ["31", "12", "2025"]
			const dateYYYYMMDD = `${parts[2]}-${parts[1]}-${parts[0]}`;
			setDateSelected(dateYYYYMMDD);
		}
	}, []);

	const markedDate = dateSelected
		? {
				[dateSelected]: {
					selected: true,
					selectedColor: "#4CAF50",
					selectedTextColor: "#FFFFFF",
				},
			}
		: {};

	function handleDate(day: Day) {
		let dateNow = new Date(day.timestamp);
		setDateSelected(dateNow.toISOString().split("T")[0]);
		setDateNow(dateNow.toLocaleDateString("pt-br"));
	}

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : undefined}
		>
			<TouchableWithoutFeedback onPress={modalVisible}>
				<View style={styles.overlay}></View>
			</TouchableWithoutFeedback>
			<View style={styles.contentArea}>
				<Calendar
					style={{
						minWidth: "100%",
					}}
					current={dateSelected}
					theme={{
						backgroundColor: "#ffffff",
						calendarBackground: "#ffffff",
						textSectionTitleColor: "#b6c1cd",
						selectedDayBackgroundColor: "#83f500",
						selectedDayTextColor: "#ffffff",
						todayTextColor: "#00b3ff",
						dayTextColor: "#2d4150",
						textDisabledColor: "#dd99ee",
					}}
					markedDates={markedDate}
					onDayPress={(day) => handleDate(day)}
				/>
				<TouchableOpacity
					style={styles.btnArea}
					onPress={() => {
						setDate(dateNow);
						onFilter(dateNow);
					}}
					disabled={loading}
				>
					{loading ? (
						<ActivityIndicator size={"large"} color={colors.black} />
					) : (
						<Text style={styles.btnText}>Filtrar</Text>
					)}
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	contentArea: {
		flex: 1,
		backgroundColor: colors.white,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		padding: 20,
		paddingBottom: 30,
		width: "100%",
	},
	btnArea: {
		width: "100%",
		padding: 15,
		marginTop: 10,
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
});
