import {Avatar, Card, CardContent, CardHeader, Divider, List, ListItem, Typography} from "@mui/material";
import { useEffect, useState } from "react";
import { Comment } from "../../types.tsx"

type PostID = {
    id: number | undefined;
}

const ENDPOINT: string = "http://localhost:4000/api/posts/comments";

export default function CommentsList({ id }: PostID) {

    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        fetch(`${ENDPOINT}/${id}`)
            .then((response) => response.json())
            .then((result) => setComments(result))
            .catch((error) => console.log(error));
    }, []);


    return (
        <List>
            {comments.map((comment) => (
                <ListItem key={comment.ID}>
                    <Card elevation={3} sx={{
                        bgcolor: "secondary.main",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        minHeight: 50,
                        width: 800,
                    }}>
                        <CardHeader title={comment.user.name} avatar={(
                            <Avatar sx={{ bgcolor: "secondary.dark" }}>
                                {comment.user.name[0].toUpperCase()}
                            </Avatar>
                        )} titleTypographyProps={{ variant: "h4", }}>
                        </CardHeader>
                        <Divider sx={{ border: "1px solid black", zIndex: 2, width: 200, ml: 2, }}/>
                        <CardContent>
                            <Typography>{comment.body}</Typography>
                        </CardContent>
                    </Card>
                </ListItem>
            ))}
        </List>
    );
}

