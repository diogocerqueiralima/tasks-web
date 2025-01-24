import { JSX, useEffect, useState } from 'react'
import styles from './page.module.css'

export default function Pagination<T extends { id: string | number, title: string }>( { title, items, itemsPerPage, renderItem, onOpen }: { title: string, items: T[], itemsPerPage: number, renderItem: (item: T) => JSX.Element, onOpen: () => void } ) {

    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState("")

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
        return currentItems < getItemsFilterBySearch().length
    }

    const hasPreviousPage = () => currentPage > 1

    const getTotalPages = () => Math.ceil(getItemsFilterBySearch().length / itemsPerPage);

    const getItemsFilterBySearch = () =>
        items
            .filter(item => item.title.toLowerCase().includes(search.toLowerCase()))

    const getItems = () => 
        getItemsFilterBySearch()
            .filter((item, index) => index >= (currentPage - 1) * itemsPerPage && index < currentPage * itemsPerPage)

    return (

        <div className={styles.pagination}>

            <div className={styles.header}>
                
                <span>{ title }</span>

                <div className={styles.manage}>

                    <div className={styles.search}>
                        <i className='bx bx-search' ></i>
                        <input type='text' placeholder='Search task' onChange={(e) => { setSearch(e.target.value); setCurrentPage(1) }} />
                    </div>

                    <button onClick={onOpen}>Add task</button>

                </div>

            </div>

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