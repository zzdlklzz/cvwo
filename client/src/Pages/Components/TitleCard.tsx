import {Paper, Typography} from "@mui/material"


export default function TitleCard() {
    return (
        // @ts-ignore
        <Paper elevation="24" square="false" sx={{
            height: 120,
            width: 500,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            borderRadius: 20,
            textAlign: "center",
        }}>
            <Typography variant="h1">
                My Math Forum
            </Typography>
        </Paper>
    );
}