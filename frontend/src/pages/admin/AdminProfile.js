import React, { useState } from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, updateUser } from "../../redux/userRelated/userHandle";
import { useNavigate } from "react-router-dom";
import { authLogout } from "../../redux/userRelated/userSlice";
import { Box, Button, Collapse, Grid } from "@mui/material";

const AdminProfile = () => {
    const [showTab, setShowTab] = useState(false);
    const buttonText = showTab ? "Cancel" : "Edit profile";

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const { currentUser } = useSelector((state) => state.user);
    const { currentUser, response, error } = useSelector((state) => state.user);
    const address = "Admin";

    if (response) {
        console.log(response);
    } else if (error) {
        console.log(error);
    }

    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [password, setPassword] = useState("");
    const [schoolName, setSchoolName] = useState(currentUser.schoolName);

    const fields =
        password === ""
            ? { name, email, schoolName }
            : { name, email, password, schoolName };

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(updateUser(fields, currentUser._id, address));
    };

    const deleteHandler = () => {
        try {
            dispatch(deleteUser(currentUser._id, "Students"));
            dispatch(deleteUser(currentUser._id, address));
            dispatch(authLogout());
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "16px",
            }}
        >
            Name: {currentUser.name}
            <br />
            Email: {currentUser.email}
            <br />
            Department: Computer Science
            <br />
        </Box>
    );
};

export default AdminProfile;

const styles = {
    attendanceButton: {
        backgroundColor: "#270843",
        "&:hover": {
            backgroundColor: "#3f1068",
        },
    },
};
