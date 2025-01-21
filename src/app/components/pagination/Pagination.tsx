import { JSX, useEffect, useState } from 'react'
import styles from './page.module.css'

export default function Pagination<T extends { id: string | number }>( { items, itemsPerPage, renderItem }: { items: T[], itemsPerPage: number, renderItem: (item: T) => JSX.Element } ) {

    const [currentPage, setCurrentPage] = useState(1)

    const nextPage = () => {

        setCurrentPage(prev => {
            
            if (!hasNextPage)
                return prev
            
            return prev + 1
        })

    }

    const previousPage = () => {

        setCurrentPage(prev => {

            if (prev <= 1)
                return Math.max(prev, 1)

            return prev - 1
        })

    }

    const hasNextPage = () => {
        const currentItems = currentPage * itemsPerPage
        return currentItems < items.length
    }

    const hasPreviousPage = () => currentPage > 1

    const getTotalPages = () => Math.ceil(items.length / itemsPerPage);

    const getItems = () => 
        items.filter((item, index) => index >= (currentPage - 1) * itemsPerPage && index < currentPage * itemsPerPage)

    return (

        <div className={styles.pagination}>

            <div className={styles.content}>
                { getItems().map(item => <div key={item.id} className={styles.item}> { renderItem(item) } </div>) }
            </div>

            <div className={styles.navigation}>

                <button className={styles.previous} disabled={!hasPreviousPage()} onClick={previousPage}>Previous</button>
                <span> Page { currentPage } of { getTotalPages() } </span>
                <button className={styles.next} disabled={!hasNextPage()} onClick={nextPage} >Next</button>

            </div>

        </div>

    )

}