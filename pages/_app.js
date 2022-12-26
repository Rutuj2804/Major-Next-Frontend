import { Provider } from "react-redux";
import Layout from "../hocs/Layout";
import "../styles/globals.scss";
import store from "../store"

export default function App({ Component, pageProps }) {

	if(Component.getLayout) return Component.getLayout(<Component {...pageProps} />)

	return (
		<Provider store={store}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
}
