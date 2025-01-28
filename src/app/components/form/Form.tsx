import { HTMLInputTypeAttribute, JSX, MouseEvent, useState } from 'react'
import styles from './page.module.css'

export interface Field<T> {

    name: string
    value: T
    setValue: (value: T) => void
    render: () => JSX.Element

}

export class StringField implements Field<string> {

    name: string
    type: HTMLInputTypeAttribute
    icon: string
    placeholder: string
    value: string
    setValue: (value: string) => void

    constructor(
        name: string,
        type: HTMLInputTypeAttribute,
        icon: string,
        placeholder: string,
        value: string,
        setValue: (value: string) => void
    ) {
        this.name = name
        this.type = type
        this.icon = icon
        this.placeholder = placeholder
        this.value = value
        this.setValue = setValue
    }

    render() {

        return (
        
            <div key={this.name} className={styles.field}>
    
                <i className={this.icon}></i>
                <input type={this.type} placeholder={this.placeholder} value={this.value} onChange={e => this.setValue(e.target.value)} />
    
            </div>
    
        )

    }
 
}

export class StringArrayField implements Field<string[]> {

    name: string
    value: string[]
    valuesToSelect: string[]
    setValue: (value: string[]) => void

    constructor(
        name: string,
        value: string[],
        valuesToSelect: string[],
        setValue: (value: string[]) => void
    ) {
        this.name = name
        this.value = value
        this.valuesToSelect = valuesToSelect
        this.setValue = setValue
    }

    render() {

        return (

            <select className={styles.select} key={this.name} id={this.name} value={this.value} onChange={e => this.setValue(Array.from(e.target.selectedOptions).map(o => o.value))} multiple size={2}>
                
                { this.valuesToSelect.map(v => <option key={v} className={styles.option} value={v}>{v}</option>) }

            </select>

        )

    }

}

export default function Form( { title, fields, onClose, onSave }: { title: string, fields: (StringField | StringArrayField)[], onClose: () => void, onSave: () => void } ) {

    const [isClosing, setIsClosing] = useState(false)

    function handleClose() {

        setIsClosing(true)

        setTimeout(() => {
            onClose()
        }, 500)

    }

    return (

        <div className={`${styles.overlay} ${isClosing ? styles.close : ''}`}>

            <div className={styles.form}>

                <div className={styles.header}>
                    <i onClick={handleClose} className='bx bx-x'></i>
                </div>

                <h2>{title}</h2>

                <div className={styles.fields}>
                    {fields.map((f) => f.render())}
                </div>

                <button onClick={onSave}>Save</button>

            </div>

        </div>

    )

}