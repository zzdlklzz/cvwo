import { Button, Card, CardContent, CardHeader, CircularProgress, Container, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserForm } from "../types.tsx";
import "./Login.css";
import { useState, useEffect } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";

const ENDPOINT: string = "http://localhost:4000/api/login";

export default function Login() {

    const navigate: NavigateFunction = useNavigate();

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<UserForm>();
    const [users, setUsers] = useState<UserForm[]>([]);

    useEffect(() => {
        fetch(`${ENDPOINT}`)
            .then((response) => response.json())
            .then((result) => setUsers(result))
            .catch((error) => console.log(error));
    }, []);

    const onSubmit: SubmitHandler<UserForm> = async (data: UserForm) => {

        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Accounting for no users in database
        if (users.length === 0) {
            setError("name", { message: "Username does not exist", })
        }

        for (let i: number = 0; i < users.length; i++) {
            const user: UserForm = users[i];
            if (user.name === data.name) {
                if (user.password !== data.password) {
                    setError("password", { message: "Incorrect password", });
                } else {
                    navigate("/home", { state: {name: user.name} })
                }
                break;
            }

            if (i === users.length - 1) {
                setError("name", { message: "Username does not exist", })
            }
        }
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
               <CardHeader title="Welcome to Math Exchange!" titleTypographyProps={{
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
                    <form className="login-form-wrapper" onSubmit={handleSubmit(onSubmit)}>
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
                        {errors.password && (<Typography variant="h4" sx={{
                            position: "absolute",
                            color: "red",
                            mt: 17,
                            mr: 37,
                            fontSize: 16,
                        }}>{errors.password.message}</Typography>)}
                        <Button component={Link} to="/register" variant="text" color="primary" sx={{
                            position: "absolute",
                            mt: 17,
                            ml: 22,
                            width: 280,
                        }}>
                            <Typography variant="h5">Not registered? Click here to make an account!</Typography>
                        </Button>
                        <div className="login-button-wrapper">
                            <button className="button"
                                    disabled={isSubmitting}
                                    type="submit">
                                {isSubmitting ? <CircularProgress size={25}/> : "Login"}
                            </button>
                        </div>
                    </form>
               </CardContent>
           </Card>
        </Container>
    );
}