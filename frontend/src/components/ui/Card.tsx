
import { DeleteIcon } from "../../icons/DeleteIcon";
import { useEffect, useRef } from "react";
import axios from 'axios';
import { BACKEND_URL } from '../../config';
import { OpenInNewTabIcon } from "../../icons/OpenInNewTabIcon";
import { CopyIcon } from "../../icons/CopyIcon";

interface Cardprops {
    id: string;
    title: string;
    link: string;
    type: "twitter" | "youtube";
    onDelete?: () => void;
}


export function Card(props: Cardprops) {
    const twitterRef = useRef<HTMLDivElement>(null);

    const getYouTubeEmbedUrl = (url: string) => {
        // Handle different YouTube URL formats
        if (url.includes('youtube.com/watch?v=')) {
            const videoId = url.split('v=')[1]?.split('&')[0];
            return `https://www.youtube.com/embed/${videoId}`;
        } else if (url.includes('youtu.be/')) {
            const videoId = url.split('youtu.be/')[1]?.split('?')[0];
            return `https://www.youtube.com/embed/${videoId}`;
        } else if (url.includes('youtube.com/embed/')) {
            return url; // Already in embed format
        }
        return url; // Return original if format not recognized
    };

    useEffect(() => {
        if (props.type === "twitter" && twitterRef.current) {
            // Clean up previous embeds
            twitterRef.current.innerHTML = '';
            // Create blockquote
            const blockquote = document.createElement('blockquote');
            blockquote.className = 'twitter-tweet';
            const a = document.createElement('a');
            a.href = props.link.replace("x.com", "twitter.com");
            blockquote.appendChild(a);
            twitterRef.current.appendChild(blockquote);
            // Load Twitter widgets.js if available
            if ((window as any).twttr && (window as any).twttr.widgets) {
                (window as any).twttr.widgets.load(twitterRef.current);
            } else {
                // If widgets.js is not loaded, load it
                const scriptId = 'twitter-wjs';
                if (!document.getElementById(scriptId)) {
                    const script = document.createElement('script');
                    script.id = scriptId;
                    script.src = 'https://platform.twitter.com/widgets.js';
                    script.async = true;
                    document.body.appendChild(script);
                    script.onload = () => {
                        if ((window as any).twttr && (window as any).twttr.widgets) {
                            (window as any).twttr.widgets.load(twitterRef.current);
                        }
                    };
                }
            }
        }
        // Cleanup on unmount
        return () => {
            if (twitterRef.current) twitterRef.current.innerHTML = '';
        };
    }, [props.type, props.link]);

    return (
        <div>
            <div className="p-4 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl shadow-lg max-w-72 min-w-72 min-h-48 border border-gray-100 transition hover:shadow-2xl" style={{ height: undefined }}>
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={async () => {
                                try {
                                    await navigator.clipboard.writeText(props.link);
                                } catch (e) {
                                    const textarea = document.createElement('textarea');
                                    textarea.value = props.link;
                                    document.body.appendChild(textarea);
                                    textarea.select();
                                    document.execCommand('copy');
                                    document.body.removeChild(textarea);
                                }
                            }}
                            title="Copy link"
                            className="p-1 rounded-full hover:bg-gray-200 transition"
                        >
                            <CopyIcon />
                        </button>
                        <span className="font-semibold text-gray-800 text-lg truncate max-w-[120px]">{props.title}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <a
                            href={props.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded-full hover:bg-gray-200 transition"
                            title="Open in new tab"
                        >
                            <OpenInNewTabIcon />
                        </a>
                        <button
                            onClick={async () => {
                                await axios.delete(BACKEND_URL + '/delete-content', {
                                    headers: {
                                        "Authorization": localStorage.getItem("token"),
                                        'Content-Type': 'application/json',
                                    },
                                    data: { contentId: props.id },
                                });
                                if (props.onDelete) props.onDelete();
                            }}
                            title="Delete"
                            className="p-1 rounded-full hover:bg-red-100 transition"
                        >
                            <DeleteIcon />
                        </button>
                    </div>
                </div>
                <div className="rounded-xl overflow-hidden border border-gray-200 bg-white mt-2">
                    {props.type === "youtube" && (
                        <iframe
                            className="w-full h-64 rounded-xl border-none"
                            src={getYouTubeEmbedUrl(props.link)}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    )}
                    {props.type === "twitter" && (
                        <div
                            ref={twitterRef}
                            style={{ height: '256px', overflow: 'auto' }}
                            className="w-full h-64 rounded-xl border-none bg-white flex justify-center"
                        ></div>
                    )}
                </div>
            </div>
        </div>
    );
}

