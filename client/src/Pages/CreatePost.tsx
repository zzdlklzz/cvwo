import { useLocation } from "react-router-dom"
import MenuBar from "./Components/MenuBar.tsx"
import { Card, CardActions, CardContent, CircularProgress, Container, Divider, Typography } from "@mui/material"
import BackButton from "./Components/BackButton.tsx"
import { SubmitHandler, useForm } from "react-hook-form"
import { PostForm } from "../types.tsx"
import "./CreatePost.css"
import {isUndefined} from "swr/_internal";

// Need to get user endpoint to link name with user id

const ENDPOINT: string = "http://localhost:4000/api/posts";

const toBase64 = async (image: File) => {
    const reader = new FileReader();

    reader.readAsDataURL(image);

    const url = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    })

    return url;
}

export default function CreatePost() {

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<PostForm>();
    const location = useLocation();
    const user: string = location.state.name;
    const topic: string = location.state.topic;
    let image;

    const createPost: SubmitHandler<PostForm> = async (data) => {

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const fileImage: File | undefined = data.image[0];

        if (!isUndefined(fileImage)) {
            image = await toBase64(fileImage);
        } else {
            image = "";
        }

        fetch(`${ENDPOINT}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                topic: topic,
                title: data.title,
                body: data.body,
                image: image, // to change
                user_id: "3", // to change
            })
        }).catch((error) => console.log(error));

    }

    return (
        <>
            <MenuBar name={user}/>
            <Container disableGutters={true} sx={{
                width: 1150,
                height: 700,
                maxHeight: 700,
                position: "relative",
                top: 80,
                flexDirection: "column",
            }}>
                <Card elevation={24} sx={{ bgcolor: "primary.light" }}>
                    <Typography variant="h1" sx={{
                        color: "white",
                        height: 100,
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        ml: 5,
                    }}>{topic.toUpperCase()}</Typography>
                    <Divider sx={{ borderColor: "black", }}></Divider>
                    <Card elevation={0} sx={{
                        bgcolor: "secondary.light",
                        width: 1150,
                        height: 700,
                        maxHeight: 600,
                        overflowY: "auto",
                        overflowX: "hidden",
                        position: "relative",
                    }}>
                        <CardContent sx={{ display: "flex", justifyContent: "center", width: "100%", }}>
                            <form className="form-wrapper" onSubmit={handleSubmit(createPost)}>
                                <input
                                    className="title"
                                    {...register("title")}
                                    type="text"
                                    placeholder="Title"/>
                                <textarea
                                    className="body"
                                    {...register("body")}
                                    rows={10}
                                    placeholder="Description"/>
                                <div className="button-wrapper">
                                    <input
                                        {...register("image")}
                                        type="file"
                                        id="image"
                                        accept="image/*"/>
                                    <button className="button"
                                            disabled={isSubmitting}
                                            type="submit">
                                        {isSubmitting ? <CircularProgress size={25}/> : "Create Post"}
                                    </button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                    <CardActions sx={{
                        bgcolor: "secondary.light",
                        display: "flex",
                        justifyContent: "right",
                        alignItems: "center",
                    }}>
                    </CardActions>
                </Card>
            </Container>
            <BackButton/>
        </>
    );
}