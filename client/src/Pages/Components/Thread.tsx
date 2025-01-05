import {Box, Button} from "@mui/material"
import { ThreadTopic } from "../../types.tsx"
import useSWR from "swr"

const ENDPOINT: string = "http://localhost:4000"

const fetcher = (url: string) =>
    fetch(`${ENDPOINT}/${url}`).then(r => r.json)


// the thread needs to be an array so i can append new data to it
// look at menubar for inspiration
// Thread will be a <List> item

// to make function OpenThread for Thread button onClick

export default function Thread( { topic }: ThreadTopic) {

    const formattedTopic: string = topic == "Probability & Statistics"
        ? "probandstats"
        : topic == "Number Theory"
        ? "numbertheory"
            : topic

    const { data, mutate } = useSWR("api/" + formattedTopic, fetcher)

    return (
        <>
            <Box>{JSON.stringify(data)} where is my data</Box>
            <Button variant="outlined" sx={{ width: "100%", height: 100, }}>{topic}</Button>
        </>
    );
}

// to import Avatar from mui/material

// function randomColor(): string {
//     const hex: number = Math.floor(Math.random() * 0xFFFFFF);
//     const color: string = "#" + hex.toString(16);
//
//     return color;
// }