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
import * as React from 'react'
import { MenuRounded, HomeRounded } from "@mui/icons-material"
import { Link } from "react-router-dom"
import { MenuTopic } from "../../types.tsx"

export default function MenuBar() {

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
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
                    <ListItemButton component={Link} to="/">
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
                      <ListItem>
                          <ListItemButton component={Link} to={item.link}>
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
            height: "100vh",
            width: 200,
            position: "absolute",
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
                    ml: -2,
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
