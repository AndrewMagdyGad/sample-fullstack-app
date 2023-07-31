import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";
import Header from "./header";

export default function Layout() {
    return (
        <>
            <Header />
            <Container component="main" style={{ height: "100%" }}>
                <Outlet />
            </Container>
        </>
    );
}
