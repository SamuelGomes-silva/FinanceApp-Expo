import React, { JSX } from "react";
import Dashboard from "../pages/dashboard";
import Register from "../pages/register";
import Profile from "../pages/profile";
import {
	createDrawerNavigator,
	DrawerNavigationProp,
} from "@react-navigation/drawer";
import CustomDrawerContent from "../components/customDrawer";
import { colors } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";

const AppDrawer = createDrawerNavigator();

export type AppDrawerParamList = {
	Home: undefined;
	Profile: undefined;
	Register: undefined;
};

export type DrawerNav = DrawerNavigationProp<AppDrawerParamList>;

export function AppRouteStack(): JSX.Element {
	return (
		<AppDrawer.Navigator
			screenOptions={{
				headerShown: false,
				drawerActiveBackgroundColor: colors.indigoBlue,
				drawerActiveTintColor: colors.white,
				drawerInactiveBackgroundColor: colors.white,
				drawerInactiveTintColor: colors.gray,
				drawerItemStyle: {
					marginBottom: 15,
					borderRadius: 8,
				},
				drawerLabelStyle: {
					fontSize: 18,
					fontWeight: "bold",
					marginLeft: 10,
				},
			}}
			drawerContent={(props) => <CustomDrawerContent {...props} />}
		>
			<AppDrawer.Screen
				name="Home"
				component={Dashboard}
				options={{
					drawerIcon: ({ color, size }) => (
						<Ionicons name="home-outline" color={color} size={size} />
					),
				}}
			/>
			<AppDrawer.Screen
				name="Register"
				component={Register}
				options={{
					drawerIcon: ({ color, size }) => (
						<Ionicons name="add-circle" color={color} size={size} />
					),
				}}
			/>
			<AppDrawer.Screen
				name="Profile"
				component={Profile}
				options={{
					drawerIcon: ({ color, size }) => (
						<Ionicons name="person" color={color} size={size} />
					),
				}}
			/>
		</AppDrawer.Navigator>
	);
}
