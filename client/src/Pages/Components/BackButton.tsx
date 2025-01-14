import { Button, Container, Typography } from "@mui/material";
import { ArrowBackRounded } from "@mui/icons-material";
import { NavigateFunction, useNavigate } from "react-router-dom";


export default function BackButton() {
    const navigate: NavigateFunction = useNavigate();
    return (
        <Container sx={{
            position: "relative",
            width: 200,
        }}>
            <Button variant="contained" onClick={() => navigate(-1)} sx={{
                bgcolor: "white",
                zIndex: 1,
                height: 75,
                borderRadius: 4,
                mt: 7,
                ml: -3,
            }}>
                <ArrowBackRounded sx={{
                    color: "black",
                    height: 60,
                    width: 60
                }}></ArrowBackRounded>
                <Typography color="black" variant="h2" sx={{ m: 1 }}>Back</Typography>
            </Button>
        </Container>
    );
}