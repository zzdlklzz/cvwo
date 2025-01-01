import {Button, Container, Typography} from "@mui/material"
import { ArrowBackRounded } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"


export default function BackButton() {
    let navigate = useNavigate();
    return (
        <Container sx={{
            position: "absolute",
            right: 0,
            width: 200,
        }}>
            <Button variant="contained" onClick={() => {navigate(-1);}} sx={{
                bgcolor: "white",
                zIndex: 1,
                height: 75,
                borderRadius: 4,
                mt: 7,
                ml: -12,
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