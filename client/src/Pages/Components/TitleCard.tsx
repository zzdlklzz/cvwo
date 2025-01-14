import { Paper, Typography } from "@mui/material";


export default function TitleCard() {
    return (
        <Paper elevation={24} square={false} sx={{
            height: 120,
            width: 600,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            borderRadius: 4,
            textAlign: "center",
        }}>
            <Typography variant="h1">
                Math Exchange
            </Typography>
        </Paper>
    );
}