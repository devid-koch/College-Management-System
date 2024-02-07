import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Box, Checkbox } from "@mui/material";
import { getAllComplains } from "../../../redux/complainRelated/complainHandle";
import TableTemplate from "../../../components/TableTemplate";

const SeeComplains = ({ userId }) => {
    const label = { inputProps: { "aria-label": "Checkbox demo" } };
    const dispatch = useDispatch();
    const { complainsList, loading, error, response } = useSelector(
        (state) => state.complain
    );
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(
            getAllComplains(
                userId ? "65c258b7902f7b5611c1f5a7" : currentUser._id,
                "Complain"
            )
        );
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error);
    }

    const complainColumns = [
        { id: "user", label: "User", minWidth: 170 },
        { id: "complaint", label: "Complaint", minWidth: 100 },
        { id: "date", label: "Date", minWidth: 170 },
    ];

    const complainRows =
        complainsList &&
        complainsList.length > 0 &&
        complainsList.map((complain) => {
            const date = new Date(complain.date);
            const dateString =
                date.toString() !== "Invalid Date"
                    ? date.toISOString().substring(0, 10)
                    : "Invalid Date";
            if (complain.user?.name) {
                return {
                    user: complain.user?.name,
                    complaint: complain.complaint,
                    date: dateString,
                    id: complain._id,
                };
            } else {
                return null;
            }
        });

    const ComplainButtonHaver = ({ row }) => {
        return (
            <>
                <Checkbox {...label} />
            </>
        );
    };

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {response ? (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "16px",
                            }}
                        >
                            No Complains Right Now
                        </Box>
                    ) : (
                        <Paper sx={{ width: "100%", overflow: "hidden" }}>
                            {Array.isArray(complainsList) &&
                                complainsList.length > 0 && (
                                    <TableTemplate
                                        buttonHaver={ComplainButtonHaver}
                                        columns={complainColumns}
                                        rows={complainRows}
                                    />
                                )}
                        </Paper>
                    )}
                </>
            )}
        </>
    );
};

export default SeeComplains;
