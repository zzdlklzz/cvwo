import "./TopicCard.css";
import {Card, CardHeader, CardContent, CardMedia, Paper, Typography, Box} from "@mui/material";

export default function TopicCard({topic, image}) {
    return (
        <Card className="topic-card" variant="elevation" square="false" elevation="24">
            <CardMedia className="card-image" component="img" height="150" src={image}
                       alt={topic} sx={{ objectFit: "contain", mt: 2}}>
            </CardMedia>
            <CardContent>
                <Typography variant="h3" sx={{mb: 2}}>{topic}</Typography>
            </CardContent>
        </Card>
    );
}