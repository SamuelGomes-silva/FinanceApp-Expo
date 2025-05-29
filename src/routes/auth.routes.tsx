import React, { JSX } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../pages/login/signIn";
import SignUp from "../pages/login/signUp";
import { colors } from "../constants/colors";

const AuthStack = createNativeStackNavigator();

export type AuthStackParamList = {
	Login: undefined;
	SignUp: undefined;
};

export function AuthRoutesStack(): JSX.Element {
	return (
		<AuthStack.Navigator>
			<AuthStack.Screen
				name="Login"
				component={SignIn}
				options={{ headerShown: false }}
			/>
			<AuthStack.Screen
				name="SignUp"
				component={SignUp}
				options={{
					headerTitle: "Voltar",
					headerTintColor: colors.white,
					headerStyle: {
						backgroundColor: colors.indigoBlue,
					},
				}}
			/>
		</AuthStack.Navigator>
	);
}
