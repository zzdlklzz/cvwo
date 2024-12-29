import "./TitleCard.css"
import {Paper, Typography} from "@mui/material"


export default function TitleCard() {
    return (
        <Paper
            className="titlecard-wrapper"
            elevation="24"
            square="false">
            <Typography variant="h1">
                My Math Forum
            </Typography>
        </Paper>
    );
}