import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ErrorIcon from "@mui/icons-material/Error";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

export default function Error({
    message,
    goBack,
}: {
    message: string;
    goBack: () => void;
}) {
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
                    <ErrorIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Error
                </Typography>
                <Box
                    component="div"
                    sx={{
                        mt: 3,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" component="span">
                                {message}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Button sx={{ mt: 3 }} variant="contained" onClick={goBack}>
                        Go Back
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
