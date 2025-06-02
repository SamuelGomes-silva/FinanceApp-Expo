import { StyleSheet, Text, View } from "react-native";
import { BalanceProps } from "../../pages/dashboard";
import { colors } from "../../constants/colors";

interface BalanceItemProps {
	item: BalanceProps;
}

export default function BalanceItem({ item }: BalanceItemProps) {
	const tagMap: Record<BalanceProps["tag"], { label: string; style: any }> = {
		saldo: { label: "Saldo atual", style: styles.saldo },
		receita: { label: "Entradas de hoje", style: styles.receita },
		despesa: { label: "Saidas de hoje", style: styles.despesa },
	};
	let tagInfo = tagMap[item?.tag];
	const validateValue =
		Number(item?.saldo) < 0
			? `- R$ ${Math.abs(item?.saldo).toFixed(2)}`
			: `R$ ${item?.saldo.toFixed(2)}`;
	return (
		<View style={[styles.container, tagInfo.style]}>
			<Text style={styles.title}>{tagInfo?.label}</Text>
			<Text style={styles.price}>{validateValue}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.coralRed,
		width: 300,
		marginRight: 15,
		borderRadius: 8,
		justifyContent: "center",
		paddingHorizontal: 10,
	},
	saldo: {
		backgroundColor: colors.indigoBlue,
	},
	receita: {
		backgroundColor: colors.emeraldGreen,
	},
	despesa: {
		backgroundColor: colors.coralRed,
	},
	title: {
		fontSize: 22,
		color: colors.white,
		fontWeight: "bold",
		marginBottom: 10,
	},
	price: {
		fontSize: 20,
		color: colors.white,
	},
});
