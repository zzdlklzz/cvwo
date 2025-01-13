import {Box, Card, CardContent, CardHeader, CircularProgress, Container, Typography} from "@mui/material"
import { SubmitHandler, useForm } from "react-hook-form"
import { UserForm } from "../types.tsx"
import BackButton from "./Components/BackButton.tsx"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Register.css"

const REGISTER_ENDPOINT: string = "http://localhost:4000/api/register";

export default function Register() {

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<UserForm>();
    const [regSuccess, setRegSuccess] = useState(false);
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<UserForm> = async (data) => {

        setRegSuccess(false);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const registerUser = async () => {

            const response = await fetch(`${REGISTER_ENDPOINT}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });

            const result = await response.json();

            if (result.message === "User created successfully") {
                setRegSuccess(true);
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else if (result.message === "Username already exists") {
                setError("name", { message: "Username already exists" });
            } else if (result.message === "Failed to create user") {
                setError("name", { message: "Error creating user"});
            } else {
                setError("name", { message: "Unknown error" });
            }
        }

        registerUser().catch((error) => console.log(error));
    }

    return (
        <Container sx={{
            mt: 15,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Card elevation={24} sx={{
                height: 500,
                width: 600,
                borderRadius: 7,
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
            }}>
                <CardHeader title="Register for Math Forum!" titleTypographyProps={{
                    variant: "h2",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                }} sx={{
                    bgcolor: "primary.main",
                    height: 80,
                    width: "100%",
                }}>
                </CardHeader>
                <CardContent sx={{
                    bgcolor: "secondary.main",
                    height: 420,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}>
                    <form className="reg-form-wrapper" onSubmit={handleSubmit(onSubmit)}>
                        <input
                            className="text-field"
                            {...register("name", {
                                required: "Username cannot be empty",
                                validate: (value) => {
                                    if (value.includes(" ")) {
                                        return "Username must not contain spaces";
                                    }
                                    return true;
                                }
                            })}
                            type="text"
                            placeholder="Username"/>
                        {errors.name && (<Typography variant="h4" sx={{
                                    position: "absolute",
                                    color: "red",
                                    mt: 6,
                                    mr: 30.5,
                                    fontSize: 16,
                        }}>{errors.name.message}</Typography>)}
                        <input className="text-field"
                               {...register("password")}
                               type="password"
                               placeholder="Password (optional)"/>
                        <div className="reg-button-wrapper">
                            {regSuccess && (
                                <Typography variant="h5" sx={{
                                    color: "green",
                                    position: "absolute",
                                    fontSize: 18,
                                    mt: 10,
                                    ml: 3,
                                }}>
                                    Registration successful! Redirecting to login...
                                </Typography>
                            )}
                            <button className="button"
                                    disabled={isSubmitting}
                                    type="submit">
                                {isSubmitting ? <CircularProgress size={25}/> : "Register"}
                            </button>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <Box sx={{
                position: "absolute",
                ml: 190,
                mb: 76.3,
            }}>
                <BackButton/>
            </Box>
        </Container>
    );
}