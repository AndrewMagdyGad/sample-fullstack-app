import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useLazyQuery } from "@apollo/client";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "../hooks";
import Joi from "joi";
import CircularProgress from "@mui/material/CircularProgress";
import { update } from "./slice";
import { SIGN_IN } from "./graphql";
import { setUser } from "../user/slice";

const signinSchema = Joi.object({
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().min(5).max(30).required(),
});

export default function SignIn() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const signinState = useAppSelector((state) => state.signin);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [signin, { loading }] = useLazyQuery(SIGN_IN, {
        errorPolicy: "all",
        onCompleted: (data) => {
            localStorage.setItem("token", data.login.token);
            localStorage.setItem("user", JSON.stringify(data.login.user));
            dispatch(setUser({ user: data.login.user }));

            navigate("/");
            enqueueSnackbar("Login Successfully", {
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
        onError: (error) => {
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
        },
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name: string = event.target.name;
        const value: string = event.target.value;

        dispatch(update({ ...signinState, [`${name}`]: value }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { error } = signinSchema.validate(signinState);

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

        signin({ variables: { user: signinState } });
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", height: "inherit" }}>
                <CircularProgress style={{ margin: "auto" }} />
            </Box>
        );
    }

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
                    Sign in
                </Typography>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={signinState.email}
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
                                value={signinState.password}
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
                        Sign In
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/signup">
                                <Typography variant="body2" component="span">
                                    Don't have an account? Sign up
                                </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
