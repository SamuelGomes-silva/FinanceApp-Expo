import React, { JSX } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../pages/dashboard";
import Register from "../pages/register";
import Profile from "../pages/profile";

const AppStack = createNativeStackNavigator();

export type AppStackParamList = {
	Home: undefined;
	Profile: undefined;
	Register: undefined;
};

export function AppRouteStack(): JSX.Element {
	return (
		<AppStack.Navigator>
			<AppStack.Screen name="Home" component={Dashboard} />
			<AppStack.Screen name="Register" component={Register} />
			<AppStack.Screen name="Profile" component={Profile} />
		</AppStack.Navigator>
	);
}
