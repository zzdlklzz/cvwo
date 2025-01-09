import "./TopicCard.css"
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { TopicsCard } from "../../types.tsx"

export default function TopicCard( { topic, image, link, name }: TopicsCard) {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(link, { state: {name} })
    }

    return (

        <Card className="topic-card" variant="elevation" square={false} elevation={24}>
            <CardMedia className="card-image" component="img" height="150" src={image}
                       alt={topic} sx={{ objectFit: "contain", mt: 2}}>
            </CardMedia>
            <CardContent>
                <Button variant="contained" onClick={handleClick}
                    sx={{ minWidth: 200, borderRadius: 50, mx: 2.5 }}>
                    <Typography variant="h3" sx={{m: 1}}>{topic}</Typography>
                </Button>
            </CardContent>
        </Card>
    );
}