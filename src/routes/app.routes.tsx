import React, { JSX } from "react";
import Dashboard from "../pages/dashboard";
import Register from "../pages/register";
import Profile from "../pages/profile";
import {
	createDrawerNavigator,
	DrawerNavigationProp,
} from "@react-navigation/drawer";

const AppDrawer = createDrawerNavigator();

export type AppDrawerParamList = {
	Home: undefined;
	Profile: undefined;
	Register: undefined;
};

export type DrawerNav = DrawerNavigationProp<AppDrawerParamList>;

export function AppRouteStack(): JSX.Element {
	return (
		<AppDrawer.Navigator screenOptions={{ headerShown: false }}>
			<AppDrawer.Screen name="Home" component={Dashboard} />
			<AppDrawer.Screen name="Register" component={Register} />
			<AppDrawer.Screen name="Profile" component={Profile} />
		</AppDrawer.Navigator>
	);
}
