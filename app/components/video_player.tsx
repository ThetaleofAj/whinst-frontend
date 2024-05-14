"use client";
import ReactPlayer from 'react-player'

export default function VideoPlayer(video_link:any){
    return (
        <ReactPlayer 
        url={video_link}
        light={true}
        />
    )
}