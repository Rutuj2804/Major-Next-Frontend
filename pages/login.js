import { Button, Link } from "@mui/material";
import Head from "next/head";
import React from "react";

const Login = () => {
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
				<form>
					<div className="input__Div">
						<input type="email" name="" required />
						<label>Email</label>
					</div>
					<div className="input__Div">
						<input type="password" name="" required />
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
