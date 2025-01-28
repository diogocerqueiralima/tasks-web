import { useEffect, useState } from "react";
import styles from "./page.module.css";
import 'boxicons/css/boxicons.min.css';

export default function Toast( { message, icon, time, removeToast }: { message: string, icon: string, time: number, removeToast: () => void } ) {

    const [progress, setProgress] = useState(100);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {

        const startTime = Date.now();

        const interval = setInterval(() => {

            const elapsed = Date.now() - startTime;
            const newProgress = Math.max(100 - (elapsed / time) * 100, 0);
            
            setProgress(newProgress);

            if (elapsed >= time) {
                setIsVisible(false);
                removeToast();
            }

        }, 100);

        return () => clearInterval(interval);

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