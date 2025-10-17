import { useEffect, useState } from "react";


const messages = [
    "Frontend Developer",
    "Mobile App Developer",
    "Desktop App Developer",
    "Enjoy some of my project"
];

export default function TypeWrite() {
    const [text, setText] = useState('');
    const [messageIndex, setMessageIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [pause, setPause] = useState(false);

    useEffect(() => {
        if (pause) return;

        const curMessage = messages[messageIndex];
        let timeout;

        if (!isDeleting && charIndex === curMessage.length) {
            // Finished typing
            setPause(true);
            timeout = setTimeout(() => {
                setIsDeleting(true);
                setPause(false);
            }, 3500);
            return;
        }
        if (isDeleting && charIndex === 0) {
            // Finished Deleting
            setIsDeleting(false);
            setMessageIndex((prev) => (prev + 1) % messages.length);
            return;
        } 

        timeout = setTimeout(() => {
            const updatedCharIndex = isDeleting ? charIndex - 1 : charIndex + 1;
            setCharIndex(updatedCharIndex);
            setText(curMessage.substring(0, updatedCharIndex));
        }, isDeleting ? 50 : 100);

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, messageIndex, pause]);

    return (
        <p className='border-b rounded-3xl p-[2px_10px] w-fit place-self-center shadow-xl shadow-green-700 hover:shadow-pink-600 hover:text-pink-600 cursor-pointer'>
            {text}
            <span className="animate-blink">|</span>
        </p>
    );
}