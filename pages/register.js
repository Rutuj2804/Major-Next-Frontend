import { Button, Link } from "@mui/material";
import Head from "next/head";
import React from "react";

const Register = () => {
	return (
		<div className="auth__Wrapper">
			<Head>
				<title>Register</title>
			</Head>
			<div className="auth__Block">
				<div className="header">
					<h4>study</h4>
					<p>Register to create an account</p>
				</div>
				<form>
					<div className="input__Div">
						<input type="text" name="" required />
						<label>First name</label>
					</div>
					<div className="input__Div">
						<input type="text" name="" required />
						<label>Last name</label>
					</div>
					<div className="input__Div">
						<input type="email" name="" required />
						<label>Email</label>
					</div>
					<div className="input__Div">
						<input type="password" name="" required />
						<label>Password</label>
					</div>
					<div className="dialouge">
						<p>By registering you agree to our terms and service</p>
					</div>
					<div className="buttons">
						<Button type="submit">Register</Button>
					</div>
				</form>
				<div className="endMessage">
					<p>
						Already have an account?{" "}
						<Link href="/login">Login now</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Register;

Register.getLayout = (page) => {
	return <>{page}</>;
};
