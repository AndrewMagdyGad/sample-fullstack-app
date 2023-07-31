import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Joi from "joi";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import IconButton from "@mui/material/IconButton";
import { useMutation } from "@apollo/client";
import { ADD_ITEM } from "./graphql";
import { useAppDispatch } from "../hooks";
import { appendItem } from "./slice";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
};

const schema = Joi.object({ title: Joi.string().min(1).max(30).required() });

export default function NewItem() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [title, setTitle] = React.useState("");
    const dispatch = useAppDispatch();

    const [addItem, { loading }] = useMutation(ADD_ITEM, {
        errorPolicy: "all",
        onCompleted: (data) => {
            enqueueSnackbar("Item has been added successfully", {
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

            dispatch(appendItem(data.createItem));
            handleClose();
            setTitle("");
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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { error } = schema.validate({ title });

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

        addItem({ variables: { createItem: { title } } });
    };

    return (
        <div>
            <Button onClick={handleOpen} variant="contained">
                Add New Item
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
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
                                    id="title"
                                    label="Enter Item Title"
                                    name="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loading}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
