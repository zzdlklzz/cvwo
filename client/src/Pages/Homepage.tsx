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

const topicCards1: TopicsCard[] = [
    {
        topic: "Algebra",
        image: algebra,
        link: "/algebra",
    },
    {
        topic: "Calculus",
        image: calculus,
        link: "/calculus",
    },
    {
        topic: "Geometry",
        image: geometry,
        link: "/geometry",
    }
]

const topicCards2: TopicsCard[] = [
    {
        topic: "Number Theory",
        image: numberTheory,
        link: "/numbertheory",
    },
    {
        topic: "Probability and Statistics",
        image: pAndStats,
        link: "/probandstats",
    },
    {
        topic: "Others",
        image: others,
        link: "/others",
    }
]

function Homepage() {

    return (
        <>
            <MenuBar/>
            <Container sx={{
                display: "flex",
                justifyContent: "center",
                position: "relative",
                left: -200,
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
                                link={card.link}>
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
                                link={card.link}>
                            </TopicCard>
                        ))}
                    </Box>
                </Box>
            </Container>
        </>
    );
}

export default Homepage;