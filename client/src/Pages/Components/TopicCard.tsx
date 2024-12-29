import "./TopicCard.css"
import {Card, CardContent, CardMedia, Typography, Button } from "@mui/material"
import {Link} from "react-router-dom"

export default function TopicCard({topic, image, link}) {
    return (
        <Card className="topic-card" variant="elevation" square="false" elevation="24">
            <CardMedia className="card-image" component="img" height="150" src={image}
                       alt={topic} sx={{ objectFit: "contain", mt: 2}}>
            </CardMedia>
            <CardContent>
                <Button variant="contained" component={Link} to={link}
                    sx={{ display: "flex", borderRadius: 50, mx: 2.5}}>
                    <Typography variant="h3" sx={{m: 1}}>{topic}</Typography>
                </Button>
            </CardContent>
        </Card>
    );
}