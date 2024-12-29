import './Homepage.css'
import TitleCard from "./Components/TitleCard.tsx";
import TopicCard from "./Components/TopicCard.tsx";
import algebra from "/categories/algebra.png";
import calculus from "/categories/calculus.png";
import geometry from "/categories/geometry.png";
import numberTheory from "/categories/number theory.png"
import pAndStats from "/categories/probability and statistics.png";
import others from "/categories/others.png";
import {Box} from "@mui/material";

const topicCards1 = ["Algebra", "Calculus", "Geometry"];
const topicCards2 = ["Number Theory", "Probability and Statistics", "Others"];
const topicPics1 = [algebra, calculus, geometry];
const topicPics2 = [numberTheory, pAndStats, others];

function Homepage() {

    return (
        <>
            <TitleCard/>
            <Box className="topic-wrapper" sx={{
                display: "flex",
                flexDirection: "column",
                gap: 10
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 18
                }}>
                    {topicCards1.map((topics) => (
                        <TopicCard
                            topic={topics}
                            image={topicPics1[topicCards1.indexOf(topics)]}>
                        </TopicCard>
                    ))}
                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 18
                }}>
                    {topicCards2.map((topics) => (
                        <TopicCard
                            topic={topics}
                            image={topicPics2[topicCards2.indexOf(topics)]}>
                        </TopicCard>
                    ))}
                </Box>
            </Box>
        </>
    );
}

export default Homepage;