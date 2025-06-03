import { useCallback, useContext, useEffect, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	FlatList,
	Modal,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Header from "../../components/header";
import { colors } from "../../constants/colors";
import api from "../../services/api";
import BalanceItem from "../../components/balanceItem";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import ReceiveItem from "../../components/receiveItem";
import ModalContent from "../../components/modalContent";
import { AuthContext } from "../../contexts/AuthContext";

export interface BalanceProps {
	tag: string;
	saldo: number;
}

export interface ReceiveItemProps {
	id: string;
	description: string;
	value: number;
	date: string;
	type: string;
}

export default function Dashboard() {
	const [balance, setBalance] = useState<BalanceProps[]>([]);
	const [date, setDate] = useState<string>("");
	const [movements, setMovements] = useState<ReceiveItemProps[]>([]);
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [loadingFilter, setLoadingFilter] = useState<boolean>(false);
	const [loadingDash, setLoadingDash] = useState<boolean>(true);
	const [dateSelected, setDateSelected] = useState<string>("");
	const { handleToast } = useContext(AuthContext);

	useFocusEffect(
		useCallback(() => {
			async function loadData() {
				const dateNow = new Date().toLocaleDateString("pt-br");
				setDate(dateNow);
				await Promise.all([
					handleGetBalance(dateNow),
					handleGetMovements(dateNow),
				]);
				setLoadingDash(false);
			}
			loadData();
			// return () => {}; // Caso precisar fazer alguma ação ao desmontar o component
		}, [])
	);

	async function handleGetBalance(filter: string) {
		if (!filter) return;
		try {
			const response = await api.get("/balance", {
				params: {
					date: filter,
				},
			});
			setBalance(response.data);
		} catch (error) {
			console.log(error);
			if (error instanceof Error) {
				handleToast("error", error.message);
			} else {
				handleToast("error", "Erro inesperado.");
			}
		}
	}

	async function handleGetMovements(filter: string) {
		if (!filter) return;
		try {
			const response = await api.get("/receives", {
				params: {
					date: filter,
				},
			});
			setMovements(response.data);
		} catch (error) {
			console.log(error);
			if (error instanceof Error) {
				handleToast("error", error.message);
			} else {
				handleToast("error", "Erro inesperado.");
			}
		}
	}

	function onDelete(item: ReceiveItemProps) {
		if (!item) return;
		Alert.alert(
			"Deseja realmente excluir?",
			`Tipo: ${item?.type} \nDescrição:${item?.description}\nR$ ${item?.value}`,
			[
				{
					text: "Cancelar",
					style: "cancel",
					onPress: () => {},
				},
				{
					text: "Confirmar",
					onPress: () => handleDelete(item.id),
				},
			]
		);
	}

	async function handleDelete(item_id: string) {
		if (!item_id) return;
		try {
			await api.delete("/receives/delete", { params: { item_id: item_id } });
			await Promise.all([handleGetBalance(date), handleGetMovements(date)]);
			handleToast("success", "Deletado com sucesso!");
		} catch (error) {
			console.log(error);
			if (error instanceof Error) {
				handleToast("error", error.message);
			} else {
				handleToast("error", "Erro inesperado.");
			}
		}
	}

	async function handleFilter(filter: string) {
		if (!filter) return;
		setLoadingFilter(true);
		try {
			await Promise.all([handleGetBalance(filter), handleGetMovements(filter)]);
			setModalVisible(false);
			setDate(filter);
			handleToast("success", `Filtro realizado com base no dia ${filter}...`);
		} catch (error) {
			console.log(error);
			if (error instanceof Error) {
				handleToast("error", error.message);
			} else {
				handleToast("error", "Erro inesperado.");
			}
		} finally {
			setLoadingFilter(false);
		}
	}

	function handleOpenModal() {
		setModalVisible(true);
	}
	if (loadingDash) {
		return (
			<SafeAreaView
				style={[
					styles.container,
					{ justifyContent: "center", alignItems: "center" },
				]}
			>
				<ActivityIndicator color={colors.emeraldGreen} size={"large"} />
			</SafeAreaView>
		);
	}

	return (
		<>
			<SafeAreaView style={styles.container}>
				<View style={styles.content}>
					<Header title={"Minhas movimentações"} />
					{balance.length > 0 ? (
						<ScrollView
							style={styles.balanceList}
							horizontal
							scrollEnabled={balance?.length !== 0}
							showsHorizontalScrollIndicator={false}
						>
							{balance?.map((item) => (
								<BalanceItem key={item?.tag} item={item} />
							))}
						</ScrollView>
					) : (
						<Text
							style={{
								fontWeight: "bold",
								maxWidth: "90%",
								textAlign: "center",
								fontSize: 20,
								flexWrap: "wrap",
								marginTop: 20,
								marginBottom: 20,
							}}
						>
							Não foi possivel encontrar os dados do usuario.
						</Text>
					)}
				</View>
				<View style={styles.latestMovesArea}>
					<View style={styles.latestMovesHeader}>
						<TouchableOpacity
							style={styles.latestMovesButton}
							onPress={handleOpenModal}
						>
							<Ionicons
								name={"calendar-outline"}
								size={30}
								color={colors.black}
							/>
						</TouchableOpacity>
						<Text style={styles.latestMovesTitle}>Ultimas movimentações</Text>
					</View>
					{movements.length === 0 ? (
						<Text style={styles.alertText}>
							Nenhuma movimentação encontrada para {date}.
						</Text>
					) : (
						<FlatList
							data={movements}
							style={styles.receiveList}
							showsVerticalScrollIndicator={false}
							keyExtractor={(item) => item.id}
							renderItem={({ item }) => (
								<ReceiveItem data={item} onDelete={onDelete} />
							)}
						/>
					)}
				</View>
			</SafeAreaView>
			<Modal
				visible={modalVisible}
				transparent
				animationType="fade"
				statusBarTranslucent
			>
				<ModalContent
					modalVisible={() => setModalVisible(false)}
					setDate={setDate}
					date={date}
					onFilter={handleFilter}
					loading={loadingFilter}
					setDateSelected={(date) => setDateSelected(date)}
					dateSelected={dateSelected}
				/>
			</Modal>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.iceBlue,
	},
	content: {
		flex: 1,
		paddingLeft: 15,
	},
	balanceList: {
		flex: 1,
		maxHeight: 200,
	},
	latestMovesArea: {
		flex: 2,
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		paddingTop: 5,
		backgroundColor: colors.white,
	},
	latestMovesHeader: {
		paddingTop: 5,
		paddingHorizontal: 15,
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
	},
	latestMovesButton: {
		marginRight: 10,
	},
	latestMovesTitle: {
		fontSize: 18,
		fontWeight: "bold",
	},
	receiveList: {
		flex: 1,
		paddingHorizontal: 15,
	},
	alertText: {
		fontWeight: "700",
		fontSize: 20,
		marginTop: 20,
		paddingHorizontal: 15,
		textAlign: "center",
		color: colors.coralRed,
	},
});
