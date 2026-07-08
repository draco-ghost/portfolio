import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaDownload } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import { DownSkel } from '../../loading/DownSkel';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


const API_URL = import.meta.env.VITE_API_URL;


export const Download = () => {
    const [releases, setReleases] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    const repo = location.state?.repo ?? "";
    const repoId = location.state?.id ?? "";

    useEffect(() => {
        async function loadRelease() {
            try {
                const { data } = await axios.get(
                    `${API_URL}/api/releases/rl`,
                    { params: { repo } }
                );

                setReleases(data);
            } catch (err) {
                setReleases(null);
            } finally {
                setLoading(false);
            }
        }

        if (repo) loadRelease();
    }, [repo]);

    // -------------------------------------------
    // VIEW TRACKING (10S + visibility + single fire)
    // -------------------------------------------
    useEffect(() => {
        if (!repo) return;

        let timer = null;
        let fired = false;

        const sendView = async () => {
            if (fired) return;

            try {
                    await axios.post(`${API_URL}/api/projects/${repoId}/view`);

                    fired = true;
                } catch (err) {
                    console.error(err);
                }
        };

        const startTimer = () => {
            if (fired) return;

            timer = setTimeout(() => {
                sendView();
            }, 10000); // 10 seconds
        };

        const stopTimer = () => {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
        };

        const handleVisibility = () => {
            if (document.visibilityState === "hidden") {
                stopTimer();
            }

            if (document.visibilityState === "visible" && !fired) {
                startTimer();
            }
        };

        if (document.visibilityState === "visible") {
            startTimer();
        }
        
        document.addEventListener("visibilitychange", handleVisibility);

        return () => {
            stopTimer();
            document.removeEventListener("visibilitychange", handleVisibility);
        };
    }, [repo]);

    if (loading) return <DownSkel />;

    return (
        <div className='h-full w-full flex overflow-hidden'>
            <div className=' flex flex-col w-full h-full pt-2'>

                <div className='flex-1 pb-5 flex flex-col gap-2 lg:px-4 overflow-y-auto'>
                    {releases.length === 0 && (
                        <div className='h-full flex items-center justify-center'>
              <div className='md:self-center'>
                <div className='d_card flex flex-col gap-2 p-4 items-center rounded-2xl h-full'>
                  <p className='text-gray-400 font-bold'>No Releases found for this repository</p>
                </div>
              </div>
            </div>
                    )}
                    
                    {releases.map((r) => (
                        <div key={r.tag_name} className='r_card md:rounded-2xl p-4'>
                            <div className='flex items-center justify-between'>
                                <h2 className='font-bold font-sans'>{r.name}</h2>
                                {r.assets.map((a) => (
                                    <div 
                                        key={a.tag_name}
                                        className='flex gap-2 border p-[0_10px] rounded-2xl'>
                                        <p>Downloads</p>
                                        <p className='font-mono'>{a.download_count}</p>
                                    </div>
                                ))}
                            </div>

                            <p className="text-xs text-gray-400">
                                {new Date(r.published_at).toDateString()}
                            </p>

                            <div className="mt-2 text-sm font-serif prose prose-invert max-w-none">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    
                                {r.body}
                                </ReactMarkdown>
                            </div>

                            <div className="mt-3">
                                {r.assets.map((a) => (
                                    <a
                                        key={a.tag_name}
                                        href={a.download_url}
                                        className="block w-fit bg-blue-600/20 text-blue-500 hover:bg-linear-to-br from-blue-500/10 to-blue-500/20 rounded-2xl"
                                        target="_blank"
                                    >
                                        <div className='flex items-center gap-2 p-[4px_20px]'>
                                            <FaDownload />
                                            {a.name}
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
