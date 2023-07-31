import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAppSelector, useAppDispatch } from "../hooks";
import { update } from "./slice";
import { Link, useNavigate } from "react-router-dom";
import Joi from "joi";
import { useSnackbar } from "notistack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "./graphql";
import CircularProgress from "@mui/material/CircularProgress";
import Error from "../common/Error";

const signupSchema = Joi.object({
    firstName: Joi.string().alphanum().min(3).max(30).required(),
    lastName: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().min(5).max(30).required(),
});

export default function SignUp() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [addUser, { data, loading, error, reset }] = useMutation(ADD_USER, {
        errorPolicy: "all",
        onCompleted: () => {
            navigate("/signin");

            enqueueSnackbar("Please login using the same credentials", {
                variant: "success",
                action: () => (
                    <IconButton
                        aria-label="delete"
                        style={{ color: "white" }}
                        onClick={() => closeSnackbar()}
                    >
                        <DeleteIcon />
                    </IconButton>
                ),
            });
        },
    });
    const signupState = useAppSelector((state) => state.signup);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name: string = event.target.name;
        const value: string = event.target.value;

        dispatch(update({ ...signupState, [`${name}`]: value }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { error } = signupSchema.validate(signupState);

        if (error) {
            enqueueSnackbar(error.message, {
                variant: "error",
                action: () => (
                    <IconButton
                        aria-label="delete"
                        style={{ color: "white" }}
                        onClick={() => closeSnackbar()}
                    >
                        <DeleteIcon />
                    </IconButton>
                ),
            });
            return;
        }

        addUser({ variables: { newUserData: signupState } });
    };

    if (loading)
        return (
            <Box sx={{ display: "flex", height: "inherit" }}>
                <CircularProgress style={{ margin: "auto" }} />
            </Box>
        );

    if (error) return <Error message={error.message} goBack={() => reset()} />;

    return (
        <Container component="main" maxWidth="sm">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    boxShadow: 3,
                    borderRadius: 2,
                    px: 4,
                    py: 6,
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                value={signupState.firstName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                                value={signupState.lastName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={signupState.email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                value={signupState.password}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/signin">
                                <Typography variant="body2" component="span">
                                    Already have an account? Sign in
                                </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
