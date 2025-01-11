import {
    Box,
    Button,
    Container,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    Typography
} from "@mui/material"
import { useState } from "react"
import { MenuRounded, HomeRounded, Person } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import {LoggedUser, MenuTopic} from "../../types.tsx"

// Make Logout function

export default function MenuBar( { name }: LoggedUser) {

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    }

    const handleClick = (link: string) => () => {
        navigate(link, { state: {name} })
    }

    const MenuTopicList: MenuTopic[] = [
        {
            topic: "Algebra",
            link: "/algebra",
        },
        {
            topic: "Calculus",
            link: "/calculus",
        },
        {
            topic: "Geometry",
            link: "/geometry",
        },
        {
            topic: "Number Theory",
            link: "/numbertheory",
        },
        {
            topic: "Probability & Statistics",
            link: "/probandstats",
        },
        {
            topic: "Others",
            link: "/others",
        },
    ]

    const drawerList = (
        <Box sx={{
            width: 300
        }}>
            <List>
                <ListItem>
                    <ListItemButton onClick={handleClick("/userposts")}>
                        <ListItemIcon>
                            <Person/>
                        </ListItemIcon>
                        <Typography variant="h2">{name}</Typography>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton onClick={handleClick("/home")}>
                        <ListItemIcon>
                            <HomeRounded/>
                        </ListItemIcon>
                        <Typography variant="h2">Home</Typography>
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider/>
            <List>
                { MenuTopicList.map((item) => (
                      <ListItem key={item.topic}>
                          <ListItemButton onClick={handleClick(item.link)}>
                              <Typography variant="h3">{item.topic}</Typography>
                          </ListItemButton>
                      </ListItem>
                    ))
                }
            </List>
        </Box>
    );

    return (
        <Container sx={{
            width: 200,
            position: "relative",
            ml: -3,
        }}>
            <Button variant="contained" onClick={toggleDrawer(true)}
                sx={{
                    bgcolor: "white",
                    color: "black",
                    zIndex: 1,
                    height: 75,
                    borderRadius: 4,
                    mt: 7,
                    ml: -1.8,
                }}>
                <MenuRounded sx={{
                    height: 65,
                    width: 65
                }}></MenuRounded>
                <Typography variant="h2" sx={{ m: 1 }}>Menu</Typography>
            </Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {drawerList}
            </Drawer>
        </Container>
    );
}
