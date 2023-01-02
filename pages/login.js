import { Button, Link } from "@mui/material";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login_user } from "../store/auth";
import { useRouter } from "next/router";

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		firstname: "",
		lastname: "",
	});

	const dispatch = useDispatch();

	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const error = useSelector((state) => state.auth.error);
	const success = useSelector((state) => state.auth.success);

	const { email, password } = formData;

	const router = useRouter();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(login_user(formData));
	};

	useEffect(() => {
		if (isAuthenticated) router.push("/");
	}, [isAuthenticated]);

	return (
		<div className="auth__Wrapper">
			<Head>
				<title>Login</title>
			</Head>
			<div className="auth__Block">
				<div className="header">
					<h4>study</h4>
					<p>Login to continue...</p>
				</div>
				<form onSubmit={handleSubmit}>
					<div className="errorsAndSuccess">
						{error ? <p className="text-red-500">{error}</p> : null}
						{success ? (
							<p className="text-green-500">{success}</p>
						) : null}
					</div>
					<div className="input__Div">
						<input
							type="email"
							name="email"
							value={email}
							onChange={handleChange}
							required
						/>
						<label>Email</label>
					</div>
					<div className="input__Div">
						<input
							type="password"
							name="password"
							value={password}
							onChange={handleChange}
							required
						/>
						<label>Password</label>
					</div>
					<div className="dialouge">
						<div></div>
						<p>Forgot password?</p>
					</div>
					<div className="buttons">
						<Button type="submit">Login</Button>
					</div>
				</form>
				<div className="endMessage">
					<p>
						Don&apos;t have an account?{" "}
						<Link href="/register">Register now</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;

Login.getLayout = (page) => {
	return <>{page}</>;
};
