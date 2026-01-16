import Blocker_app from '../assets/Blocker_App.png';
import v_n_app from '../assets/v_n.png';


const BLOCK_GIT = "https://github.com/draco-ghost/blocker_app";
const BLOCK_DOWNLOAD = "https://github.com/draco-ghost/blocker_app/releases";

const V_N_GIT = "https://github.com/draco-ghost/vision_notepad";
const V_N_DOWNLOAD = "https://github.com/draco-ghost/vision_notepad/releases";

export const cardsData = [
    {
      app_name: "Blocker App",
      description: "BlockerApp is a lightweight Windows desktop application designed to help you stay focused by blocking distracting websites.",
      o: true,
      app_link: {
        repo: BLOCK_GIT,
        release: BLOCK_DOWNLOAD,
        source: "/p/source",
      },
      app_preview: Blocker_app,
    },
    
    {
      app_name: "Vision Notepad App",
      description: "Vision Notepad is a simple, lightweight application to manage all your notes in one place.",
      o: true,
      app_link: {
        repo: V_N_GIT,
        release: V_N_DOWNLOAD,
        source: "/p/source",
      },
      app_preview: v_n_app,
    },

    
];