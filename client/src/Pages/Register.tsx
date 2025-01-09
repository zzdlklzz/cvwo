import {Box, Card, CardContent, CardHeader, CircularProgress, Container, Typography} from "@mui/material"
import { SubmitHandler, useForm } from "react-hook-form"
import { UserForm } from "../types.tsx"
import BackButton from "./Components/BackButton.tsx"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const USERS_ENDPOINT: string = "http://localhost:4000/api/login";
const REGISTER_ENDPOINT: string = "http://localhost:4000/api/register";

export default function Register() {

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<UserForm>();
    const [users, setUsers] = useState<UserForm[]>([])
    const [regSuccess, setRegSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${USERS_ENDPOINT}`)
            .then((response) => response.json())
            .then((result) => setUsers(result))
    }, []);

    const onSubmit: SubmitHandler<UserForm> = async (data) => {

        setRegSuccess(false);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        for (let i = 0; i < users.length; i++) {
            const user: UserForm = users[i];
            if (user.name === data.name) {
                setError("name", { message: "Username already exists" });
                break;
            }

            if (i === users.length - 1) {
                fetch(`${REGISTER_ENDPOINT}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }).then((response) => { setRegSuccess(response.ok) })
                    .catch((error) => console.log(error));
            }
        }

        if (regSuccess) {
            setTimeout(() => {
                navigate("/")
            }, 1000);
        }

        console.log(JSON.stringify(data));
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
                    <form className="form-wrapper" onSubmit={handleSubmit(onSubmit)}>
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
                        {errors.name && (<div className="name-error">{errors.name.message}</div>)}
                        <input className="text-field"
                               {...register("password")}
                               type="password"
                               placeholder="Password (optional)"/>
                        <div className="button-wrapper">
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