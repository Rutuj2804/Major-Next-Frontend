import { Button, Link } from "@mui/material";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register_user } from "../store/auth";
import { useRouter } from "next/router";

const Register = () => {
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

	const { email, password, firstname, lastname } = formData;

	const router = useRouter();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(register_user(formData));
	};

	useEffect(() => {
		if (isAuthenticated) router.push("/");
	}, [isAuthenticated]);
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
				<form onSubmit={handleSubmit}>
					<div className="errorsAndSuccess">
						{error ? <p className="text-red-500">{error}</p> : null}
						{success ? (
							<p className="text-green-500">{success}</p>
						) : null}
					</div>
					<div className="input__Div">
						<input
							type="text"
							name="firstname"
							value={firstname}
							onChange={handleChange}
							required
						/>
						<label>First name</label>
					</div>
					<div className="input__Div">
						<input
							type="text"
							name="lastname"
							value={lastname}
							onChange={handleChange}
							required
						/>
						<label>Last name</label>
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
