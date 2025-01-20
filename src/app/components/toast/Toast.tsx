import { useEffect, useState } from "react";
import styles from "./page.module.css";
import 'boxicons/css/boxicons.min.css';

export default function Toast( { message, icon, time, removeToast }: { message: string, icon: string, time: number, removeToast: () => void } ) {

    const [timeElapsed, setTimeElapsed] = useState(0);
    const [progress, setProgress] = useState(100);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {

        const interval = setInterval(() => {

            setTimeElapsed((prev) => {

                const newTimeElapsed = prev + 100;
                const newProgress = Math.max(100 - (newTimeElapsed / time) * 100, 0);

                setProgress(newProgress);

                if (newProgress <= 0) {
                    setIsVisible(false);
                    removeToast();
                    clearInterval(interval)
                }

                return newTimeElapsed;
            });

        }, 100);

    }, []);

    if (!isVisible) return null;

    return (

        <div className={styles.toast}>

            <p>
                <i className={icon} />
                <span> { message } </span>
            </p>

            <div 
                className={styles.progress}
                style={{ width: `${progress}%`}}
            />

        </div>

    )

}