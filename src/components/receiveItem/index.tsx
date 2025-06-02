import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../constants/colors";
import { ReceiveItemProps } from "../../pages/dashboard";
import { Ionicons } from "@expo/vector-icons";

interface ReceiveProps {
	data: ReceiveItemProps;
	onDelete: (item: ReceiveItemProps) => void;
}

export default function ReceiveItem({ data, onDelete }: ReceiveProps) {
	return (
		<TouchableOpacity
			style={styles.container}
			activeOpacity={0.7}
			onLongPress={() => onDelete(data)}
		>
			<View
				style={[
					styles.content,
					{
						backgroundColor:
							data.type === "receita" ? colors.emeraldGreen : colors.coralRed,
					},
				]}
			>
				<Ionicons
					size={25}
					color={colors.white}
					name={
						data?.type === "despesa" ? "arrow-down-outline" : "arrow-up-outline"
					}
				/>
				<Text style={styles.typeText}>{data?.type.toUpperCase()}</Text>
			</View>
			<Text style={styles.price}>R$ {data?.value.toFixed(2)}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.iceBlue,
		marginTop: 20,
		padding: 15,
		borderRadius: 8,
	},
	content: {
		flexDirection: "row",
		maxWidth: 120,
		padding: 5,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.darkIceBlue,
	},
	typeText: {
		fontWeight: 800,
		marginLeft: 5,
		color: colors.white,
	},
	price: {
		color: colors.black,
		fontSize: 22,
		marginTop: 10,
		fontWeight: 700,
	},
});
