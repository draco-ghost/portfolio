import Blocker_app from '../assets/Blocker_App.png';
import Blocker_bg from '../assets/Blocker_App1.png';


const BLOCK_GIT = "https://github.com/draco-ghost/blocker_app";
const BLOCK_DOWNLOAD = "https://github.com/draco-ghost/blocker_app/releases";

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
      background: Blocker_bg,
      app_preview: Blocker_app,
    },
    
];