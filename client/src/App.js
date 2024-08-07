// Utility
import { ChakraProvider, VStack, Spinner } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";
// Screens
import ProductsScreen from "./screens/ProductsScreen";
import LandingScreen from "./screens/LandingScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import EmailVerificationScreen from "./screens/EmailVerificationScreen";
import PasswordResetScreen from "./screens/PasswordResetScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
//Components
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
	const [googleClient, setGoogleClient] = useState(null);
	useEffect(() => {
		const googleKey = async () => {
			const { data: googleId } = await axios.get("http://localhost:5000/api/config/google");
			setGoogleClient(googleId);
		};
		googleKey();
	}, [googleClient]);

	return !googleClient ? (
		<VStack pt="37vh">
			<Spinner mt="20" thickness="2px" speed="0.65s" emptyColor="gray.200" color="cyan.500" size="xl" />
		</VStack>
	) : (
		<GoogleOAuthProvider clientId={googleClient}>
			<ChakraProvider>
				<Router>
					<Header />
					<main>
						<Routes>
							<Route path="/" element={<LandingScreen />} />
							<Route path="/products" element={<ProductsScreen />} />
							<Route path="/product/:id" element={<ProductScreen />} />
							<Route path="/cart" element={<CartScreen />} />
							<Route path="/register" element={<RegistrationScreen />} />
							<Route path="/login" element={<LoginScreen />} />
							<Route path="/email-verify/:token" element={<EmailVerificationScreen />} />
							<Route path="/password-reset/:token" element={<PasswordResetScreen />} />
						</Routes>
					</main>
					<Footer />
				</Router>
			</ChakraProvider>
		</GoogleOAuthProvider>
	);
}

export default App;
