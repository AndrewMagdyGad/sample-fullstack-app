import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";
import { useQuery } from "@apollo/client";
import { GET_ITEMS } from "./graphql";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useNavigate } from "react-router-dom";
import { setItems } from "./slice";
import NewItem from "./NewItem";

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const UNAUTHENTICATED_MSG = "Could not authenticate with token";

export default function Items() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const itemsState = useAppSelector((state) => state.items);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { loading, data } = useQuery(GET_ITEMS, {
        errorPolicy: "all",
        onCompleted: (data) => {
            dispatch(setItems({ items: data.getAllItems }));
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

            if (error.message.includes(UNAUTHENTICATED_MSG)) {
                navigate("/signin");
            }
        },
    });

    if (loading) {
        return (
            <Box sx={{ display: "flex", height: "inherit" }}>
                <CircularProgress style={{ margin: "auto" }} />
            </Box>
        );
    }

    return (
        <Container component="main">
            <Box
                sx={{
                    marginTop: 8,
                    marginBottom: 2,
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Typography component="span" variant="h4">
                    Items Table
                </Typography>
                {/* <Button variant="contained">Add New Item</Button> */}
                <NewItem />
            </Box>
            {itemsState.items.length === 0 ? (
                <Typography component="h5" variant="h5">
                    No items found
                </Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="items table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="right">Title</TableCell>
                                <TableCell align="right">Created By</TableCell>
                                <TableCell align="right">Created At</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {itemsState.items.map((item) => (
                                <TableRow
                                    key={item.id}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {item.id}
                                    </TableCell>
                                    <TableCell align="right">
                                        {item.title}
                                    </TableCell>
                                    <TableCell align="right">
                                        {item.creator.firstName}{" "}
                                        {item.creator.lastName}
                                    </TableCell>
                                    <TableCell align="right">
                                        {new Date(
                                            item.createdAt
                                        ).toDateString()}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
}
