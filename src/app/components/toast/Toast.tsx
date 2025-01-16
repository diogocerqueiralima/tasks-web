import { useEffect, useState } from "react";
import styles from "./page.module.css";
import 'boxicons/css/boxicons.min.css';

export default function Toast( { message, icon, time, removeToast }: { message: string, icon: string, time: number, removeToast: () => void } ) {

    const [progress, setProgress] = useState(100);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {

        const interval = setInterval(() => {
            setProgress((prev) => Math.max(prev - 1, 0));
        }, time / 100);

        const timeout = setTimeout(() => {
            setIsVisible(false);
            removeToast()
        }, time);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [time]);

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