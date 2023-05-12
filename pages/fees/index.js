import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CODES } from "../../assets/data/popup";
import { setHeader, setPopup } from "../../store/settings";
import { get_fees_demand } from "../../store/fees";
import Paper from "../../components/paper";
import { DataGrid } from "@mui/x-data-grid";
import { TrashIcon } from "@heroicons/react/24/solid";
import Head from "next/head";

import { loadStripe } from "@stripe/stripe-js"

async function checkout({ lineItems }) {
    let stripePromise = null

    const getStripe = () => {
        if(!stripePromise){
            stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
        }
        return stripePromise
    }

    const stripe = await getStripe()

    await stripe.redirectToCheckout({
        mode: 'payment',
        lineItems,
        successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: window.location.origin,
    })
}

const Fees = () => {
    const university = useSelector((state) => state.university.university._id);
    const fees_data = useSelector((state) => state.fees.demand);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setHeader("Fees"));
    }, []);

    useEffect(() => {
        if (university) dispatch(get_fees_demand(university));
    }, [university]);

    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 90,
            disableColumnMenu: true,
            renderCell: (param) => <>{param.row._id}</>,
        },
        {
            field: "title",
            headerName: "Title",
            flex: 1,
            disableColumnMenu: true,
        },
        {
            field: "amount",
            headerName: "Amount",
            flex: 1,
            disableColumnMenu: true,
        },
        {
            field: "class",
            headerName: "Class",
            width: 200,
            disableColumnMenu: true,
            renderCell: (param) => <>{param.row.class.name}</>,
        },
        {
            field: "class_open",
            headerName: "Pay Fees",
            width: 200,
            disableColumnMenu: true,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => (
                <>
                    <Button
                        className="table-buttons"
                        onClick={() =>
                            checkout({
                                lineItems: [
                                    {
                                        price: "price_1Mt4UYSEvgZK8slV9lzQra2h",
                                        quantity: 1,
                                    },
                                ],
                            })
                        }
                    >
                        Pay Fees
                    </Button>
                </>
            ),
        },
        {
            field: "delete",
            headerName: "Delete Fees",
            width: 200,
            disableColumnMenu: true,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => (
                <>
                    <Button
                        onClick={() => {}}
                        className="table-buttons bg-red-500"
                        startIcon={<TrashIcon className="h-4 w-4 text-white" />}
                    >
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    return (
        <div>
            <Head>
                <title>Pay Fees</title>
            </Head>
            <div className="flex justify-between items-center mt-4 breadcrumps">
                <div></div>
                <div className="flex gap-4">
                    <Button
                        startIcon={<PlusIcon className="h-5 w-5 text-white" />}
                        onClick={() => {
                            dispatch(setPopup(CODES.DEMAND_FEES));
                        }}
                    >
                        Demand Fees
                    </Button>
                </div>
            </div>

            <div className="mt-4">
                <Paper className="h-[800px]">
                    <DataGrid
                        columns={columns}
                        rows={fees_data}
                        checkboxSelection={false}
                        disableSelectionOnClick
                        getRowId={(row) => row._id}
                        rowsPerPageOptions={[]}
                    />
                </Paper>
            </div>
        </div>
    );
};

export default Fees;
{
    /* <button
    onClick={() =>
        checkout({
            lineItems: [
                {
                    price: "price_1Mt4UYSEvgZK8slV9lzQra2h",
                    quantity: 1,
                },
            ],
        })
    }
>
    Pay
</button>; */
}
