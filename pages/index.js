import Head from "next/head";
import React, { useEffect } from "react";
import {
	BanknotesIcon,
	CalendarIcon,
	CreditCardIcon,
	EnvelopeIcon,
} from "@heroicons/react/24/solid";
import MyResponsiveBar from "../components/charts/NivoBarChart";
import MyResponsiveLine from "../components/charts/NivoLineChart";
import Paper from "../components/paper";
import Cards from "../components/cards";
import MyResponsivePie from "../components/charts/NivoPieChart";
import { DataGrid } from "@mui/x-data-grid";
import data from "../assets/data/mockdata.json";
import { Avatar } from "@mui/material";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs"
import { useDispatch } from "react-redux";
import { setHeader } from "../store/settings"

const cardsData = [
	{
		count: 299,
		name: "Classes",
		percentage: 29,
		isDown: false,
		icon: <CreditCardIcon className="h-10 w-10 text-green-500" />,
	},
	{
		count: 20,
		name: "Students",
		percentage: 10,
		isDown: true,
		icon: <CalendarIcon className="h-10 w-10 text-red-500" />,
	},
	{
		count: 587,
		name: "Faculties",
		percentage: 17,
		isDown: false,
		icon: <EnvelopeIcon className="h-10 w-10 text-blue-500" />,
	},
	{
		count: "188k",
		name: "Events",
		percentage: 50,
		isDown: true,
		icon: <BanknotesIcon className="h-10 w-10 text-yellow-500" />,
	},
];

const columns = [
    { field: "id", headerName: "ID", width: 90, disableColumnMenu: true },
    {
        field: "first_name",
        headerName: "Full name",
        width: 200,
        disableColumnMenu: true,
        valueGetter: (params=>`${params.row.first_name} ${params.row.last_name}`),
        renderCell: (params=>(<><Avatar src={params.row.avatar} />&nbsp;&nbsp;{params.value}</>)),
        flex: 1
    },
    {
        field: "isDown",
        headerName: "Performance",
        width: 150,
        disableColumnMenu: true,
        renderCell: (params=><>{params.value ? <div className='text-red-500'><BsCaretDownFill /></div>: <div className='text-green-500'><BsCaretUpFill /></div>}&nbsp;&nbsp;{Math.floor(Math.random()*50)}% </>)
    },
    {
        field: "phone",
        headerName: "Phone",
        width: 150,
        disableColumnMenu: true
    },
    {
        field: "country",
        headerName: "Country",
        width: 150,
        disableColumnMenu: true
    },
    {
        field: "currency",
        headerName: "Currency",
        width: 150,
        disableColumnMenu: true
    },
];

const Index = () => {

	const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(setHeader("Dashboard"))
    }, [dispatch])

	return (
		<div>
			<Head>
				<title>Dashboard</title>
			</Head>
			<main>
				<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
					{cardsData.map((c, i) => (
						<Cards
							key={i}
							count={c.count}
							name={c.name}
							percentage={c.percentage}
							isDown={c.isDown}
							icon={c.icon}
						/>
					))}
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
					<Paper className="h-[500px] col-span-2">
						<MyResponsiveLine />
					</Paper>
					<Paper className="h-[500px]">
						<MyResponsiveBar />
					</Paper>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
					<Paper className="h-[500px]">
						<MyResponsivePie />
					</Paper>
					<Paper className="h-[500px] col-span-2">
						<DataGrid columns={columns} rows={data} checkboxSelection rowsPerPageOptions={[]} />
					</Paper>
				</div>
			</main>
		</div>
	);
};

export default Index;
