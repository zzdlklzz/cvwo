import {Box, Button, Card, CardContent, CardHeader, CircularProgress, Container, Typography} from "@mui/material"
import {SubmitHandler, useForm} from "react-hook-form";
import {UserForm} from "../types.tsx";
import BackButton from "./Components/BackButton.tsx";

const ENDPOINT: string = "http://localhost:4000/api/register";

export default function Register() {

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<UserForm>();

    const onSubmit: SubmitHandler<UserForm> = async (data) => {
        console.log(data);
    }

    // useEffect(() => {
    //     fetch(`${ENDPOINT}`)
    //         .then((response) => response.json())
    //         .then((result) => setUsers(result))
    // }, []);

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
                        {errors.password && (<div className="password-error">{errors.password.message}</div>)}
                        <div className="button-wrapper">
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