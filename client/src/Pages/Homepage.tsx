import { TopicsCard } from "../types.tsx"
import TitleCard from "./Components/TitleCard.tsx"
import TopicCard from "./Components/TopicCard.tsx"
import MenuBar from "./Components/MenuBar.tsx"
import { Box, Container } from '@mui/material'
import algebra from "/categories/algebra.png"
import calculus from "/categories/calculus.png"
import geometry from "/categories/geometry.png"
import numberTheory from "/categories/number theory.png"
import pAndStats from "/categories/probability and statistics.png"
import others from "/categories/others.png"
import {useLocation} from "react-router-dom"
import BackButton from "./Components/BackButton.tsx"

function Homepage() {

    const location = useLocation()
    const user: string = location.state.name;

    const topicCards1: TopicsCard[] = [
        {
            topic: "Algebra",
            image: algebra,
            link: "/algebra",
            name: user,
        },
        {
            topic: "Calculus",
            image: calculus,
            link: "/calculus",
            name: user,
        },
        {
            topic: "Geometry",
            image: geometry,
            link: "/geometry",
            name: user,
        }
    ]

    const topicCards2: TopicsCard[] = [
        {
            topic: "Number Theory",
            image: numberTheory,
            link: "/numbertheory",
            name: user,
        },
        {
            topic: "Probability and Statistics",
            image: pAndStats,
            link: "/probandstats",
            name: user,
        },
        {
            topic: "Others",
            image: others,
            link: "/others",
            name: user,
        }
    ]

    return (
        <>
            <MenuBar name={user}/>
            <Container sx={{
                display: "flex",
                justifyContent: "center",
                position: "relative",
            }}>
                <TitleCard/>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    mt: "180px",
                    position: "absolute"
                }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        gap: 18
                    }}>
                        {topicCards1.map((card: TopicsCard) => (
                            <TopicCard
                                topic={card.topic}
                                image={card.image}
                                link={card.link}
                                name={user}>
                            </TopicCard>
                        ))}
                    </Box>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        gap: 18
                    }}>
                        {topicCards2.map((card: TopicsCard) => (
                            <TopicCard
                                topic={card.topic}
                                image={card.image}
                                link={card.link}
                                name={user}>
                            </TopicCard>
                        ))}
                    </Box>
                </Box>
            </Container>
            <BackButton/>
        </>
    );
}

export default Homepage;