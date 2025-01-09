import { Button, Card, CardContent, CardHeader, CircularProgress, Container, Typography } from "@mui/material"
import { SubmitHandler, useForm } from "react-hook-form"
import { UserForm } from "../types.tsx"
import "./Login.css"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"


const ENDPOINT: string = "http://localhost:4000/api/login";

export default function Login() {

    const navigate = useNavigate();

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<UserForm>();
    const [users, setUsers] = useState<UserForm[]>([]);

    useEffect(() => {
        fetch(`${ENDPOINT}`)
            .then((response) => response.json())
            .then((result) => setUsers(result))
            .catch((error) => console.log(error));
    }, []);

    const onSubmit: SubmitHandler<UserForm> = async (data) => {

        await new Promise((resolve) => setTimeout(resolve, 1000));

        for (let i = 0; i < users.length; i++) {
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
               <CardHeader title="Welcome to Math Forum!" titleTypographyProps={{
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
                        {errors.password && (<div className="password-error">{errors.password.message}</div>)}
                        <Button component={Link} to="/register" variant="text" color="primary" sx={{
                            position: "absolute",
                            mt: 17,
                            ml: 22,
                            width: 280,
                        }}>
                            <Typography variant="h5">Not registered? Click here to make an account!</Typography>
                        </Button>
                        <div className="button-wrapper">
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