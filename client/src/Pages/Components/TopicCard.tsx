import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { TopicsCard } from "../../types.tsx";

export default function TopicCard( { topic, image, link, name }: TopicsCard) {

    const navigate: NavigateFunction = useNavigate();
    const handleClick = () => {
        navigate(link, { state: {name} })
    }

    return (

        <Card
            className="topic-card"
            square={false}
            elevation={24}
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
                height: 280,
                width: 320,
                borderRadius: 5,
            }}>
            <CardMedia
                component="img"
                height="150"
                src={image}
                alt={topic}
                sx={{
                    padding: "2px",
                    alignItems: "center",
                    objectFit: "contain",
                    mt: 2,
                }}>
            </CardMedia>
            <CardContent>
                <Button variant="contained" onClick={handleClick}
                    sx={{ minWidth: 200, borderRadius: 50, mx: 2.5 }}>
                    <Typography variant="h3" sx={{ m: 1 }}>{topic}</Typography>
                </Button>
            </CardContent>
        </Card>
    );
}