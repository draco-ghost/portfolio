import { useRef, useState } from 'react';
import { FaHeart, FaImage } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { trackOutbound } from '../../util/umami_track';
import { MdVisibility } from "react-icons/md";
import { FaHeartBroken } from 'react-icons/fa';
import axios from 'axios';
import { useEffect } from 'react';


const API_URL = import.meta.env.VITE_API_URL;

const ProjectCards = ({ project }) => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const lockRef = useRef(false);
    const [anim, setAnim] = useState(null);

    const {
        id, name, description, h_so_c,
        github_repo, image_path, views, liked, likes
    } = project

    const [isLiked, setIsLiked] = useState(liked);
    const [likeCount, setLikeCount] = useState(likes);

    useEffect(() => {
        setIsLiked(liked);
        setLikeCount(likes);
    }, [liked, likes]);

    const openLink = (url) => {
        trackOutbound(url);
        window.open(url, "_blank");
    }
    const sourceL = (url) => {
        trackOutbound(url);
        if (h_so_c == false) {
            navigate(url);
        } else {
            window.open(url, "_blank")
        }
    };
    const releasesL = (url) => {
        trackOutbound(url);
        if (h_so_c == false) {
            navigate(url, { state: { repo: name, id: id } })
        } else {
            window.open(url, "_blank")
        }
    };

    const handleHeart = async () => {
        if (lockRef.current) return; // block spam clicks
        lockRef.current = true;

        const prevLiked = isLiked;
        const prevCount = likeCount;

        const nextLiked = !prevLiked;

        setIsLiked(nextLiked);
        setLikeCount(prev =>
            nextLiked ? prev + 1 : Math.max(0, prev - 1)
        );

        // trigger anim
        setAnim(nextLiked ? 'like' : 'unlike');

        // reset anim after shot time
        setTimeout(() => setAnim(null), 300);

        try {
            const url = nextLiked
                ? `${API_URL}/api/projects/${id}/like`
                : `${API_URL}/api/projects/${id}/unlike`;

            const { data } = await axios.post(url);
            // sync with backend truth
            setIsLiked(data.liked);
            setLikeCount(Number(data.count));
        } catch (err) {
            // rollback if backend fails
            setIsLiked(prevLiked);
            setLikeCount(prevCount);
        } finally {
            // Small cooldown (UX + spam protection)
            setTimeout(() => {
                lockRef.current = false;
            }, 300);
        }
    }

    const previewImage = (app_preview) => {
        navigate('/p/image', { state: { app_preview } })
    }

    return (
        <div className='w-full h-full'>
            <div className='project_card flex flex-col h-full relative overflow-hidden select-none md:rounded-3xl'>
                <div className='flex pt-3 pb-3 px-7 justify-between place-items-center'>
                    <div>
                        <p>{name}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <MdVisibility />
                        <p>{views}</p>
                        <p>Views</p>
                    </div>
                </div>

                <div className='w-full h-50 relative'>
                    {loading && (
                        <div className='w-full h-full bg-zinc-800 animate-pulse place-content-center place-items-center'>
                            <FaImage className='text-3xl animate-pulse text-white' />
                        </div>
                    )}

                    <img src={`${API_URL}${image_path}`}
                        alt={`${name} preview`}
                        className={`bg-zinc-800 w-full h-full bg-cover ${loading ? 'hidden' : ''}`}
                        onLoad={() => setLoading(false)}
                        onClick={() => previewImage(`${API_URL}${image_path}`)}
                        style={{ cursor: 'pointer' }} />

                </div>

                <div className='flex flex-col place-content-center flex-1'>

                    <div className='text-center px-8'>
                        <p>{description}</p>
                    </div>

                    {name === "portfolio" ? (
                        <div className='flex mt-2 mb-2 px-6 items-center'>
                            <div className={`p-[2px_25px] flex gap-2 items-center w-fit rounded-2xl border-2 transition-all duration-200
                                    ${isLiked
                                        ? 'bg-pink-500/20 border-pink-500/10 text-pink-500'
                                        : 'text-white hover:border-green-500'}
                                    ${anim === "like" ? "scale-126 animate-pulse" : ""}
                                    ${anim === "unlike" ? "scale-95 opacity-80" : ""}
                                    `}
                                    onClick={handleHeart}>
                                    {isLiked ? <FaHeart /> : <FaHeartBroken />}
                                    <p>{likeCount}</p>
                                </div>

                            <div className='ml-3'>
                                <div onClick={() => openLink(github_repo)} role='button'
                                    className='p-[2px_25px] project_btn rounded-3xl text-center w-full'>
                                    Github
                                </div>
                            </div>

                        </div>
                    ) : (
                        <div className='flex flex-col'>
                            <div className='btn_grid mt-2 mb-2 p-[clamp(0.5rem,1vw,2rem)]'>

                                <div>
                                    <div onClick={() => openLink(github_repo)} role='button'
                                        className='project_btn rounded-3xl text-center w-full'>
                                        Github
                                    </div>
                                </div>

                                <div>
                                    <div onClick={() => sourceL("/p/source")} role='button'
                                        className='project_btn rounded-3xl text-center'>
                                        Source Code
                                    </div>
                                </div>

                                <div className='d_btn'>
                                    <div onClick={() => releasesL("/p/download")} role='button'
                                        className='project_btn rounded-3xl text-center p-[0_25px] md:p-0'>
                                        Download
                                    </div>
                                </div>

                            </div>

                            <div className='py-2 px-6'>
                                <div className={`p-[2px_25px] flex gap-2 items-center w-fit rounded-2xl border-2 transition-all duration-200
                                    ${isLiked
                                        ? 'bg-pink-500/20 border-pink-500/10 text-pink-500'
                                        : 'text-white hover:border-green-500'}
                                    ${anim === "like" ? "scale-126 animate-pulse" : ""}
                                    ${anim === "unlike" ? "scale-95 opacity-80" : ""}
                                    `}
                                    onClick={handleHeart}>
                                    {isLiked ? <FaHeart /> : <FaHeartBroken />}
                                    <p>{likeCount}</p>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

            </div>
        </div>
    )
}

export default ProjectCards
