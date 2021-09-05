import 'bootstrap-icons/font/bootstrap-icons.css';
import Head from 'next/head';
import TodoContainer from '../components/TodoContainer';

export default function Home() {
	return (
		<>
			<Head>
				<title> React Todo App</title>
				<link rel='favicon' href='/favicon.ico' />
				<meta
					name='viewport'
					content='width=device-width,initial-scale=1.0'
				/>
				<meta name='author' content='Timileyin Pelumi' />
			</Head>

			<TodoContainer />
		</>
	);
}
