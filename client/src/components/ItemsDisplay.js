import React, { useEffect, useState } from 'react'
import '../index.css'
import '../App.css'
import axios from 'axios'


function ItemDisplay(props) {

    const [task, Settask] = useState("");
    const [listItems, setListItems] = useState([]);
    const [isUpdating, setIsUpdating] = useState("");
    const [updateItemText, setUpdateItemText] = useState("");


    // const addItem = () => {
    //     if (task.trim() === '') {
    //         return
    //     } else {
    //         axios.post('http://localhost:5000/item/addItem', {
    //             item: task
    //         }).then(res => {
    //             Settask("")
    //             props.addItem(res.data)
    //         }).catch(err => console.log(err))
    //     }
    // }

    const addItem = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/item/addItem',{item:task})
            setListItems(prev => [...prev, res.data]);
            Settask('');
        }catch(err) {
            console.log(err );
        }
    }

    useEffect(() => {
        const getItemList = async () => {
            try {
                const res = await axios.get('http://localhost:5000/item/getItem')
                setListItems(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getItemList()
    }, [])

    const updateItem = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.put(`http://localhost:5000/item/updateItem/${isUpdating}`, {item: updateItemText})
            console.log(res.data);
            const updateItemIndex = listItems.findIndex(item => item._id === isUpdating)
            const updatedItem = listItems[updateItemIndex].item = updateItemText
            setUpdateItemText('');
            setIsUpdating('')
        } catch(err) {
            console.log(err);
        }
    }

    const renderUpdate = () => (
        <form className='update-form' onSubmit={(e) => {updateItem(e)}}>
            <input className='update-new-input' type="text" placeholder="New Item" onChange={e => {setUpdateItemText(e.target.value)}} value={updateItemText}></input>
            <button className='update-new-btn' type='submit'>Update</button>
        </form>
    )

    

    const deleteItem = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/item/deleteItem/${id}`)
            const newListItems = listItems.filter(item => item._id !== id);
            setListItems(newListItems);
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="App">
            <h1>To Do List</h1>
            <form className='form1' onSubmit={e => addItem(e)} >
                <input type="text" placeholder="Add todo item" value={task} onChange={event => Settask(event.target.value)}></input>
                <button type="submit" onClick={() => addItem()}>Add</button>
            </form>
            

            <div className="todo-listItems">
                {
                    listItems.map(item => (
                <div className="todo-item">
                    {
                        isUpdating === item._id
                        ? renderUpdate()
                        : <>
                            <p className="item-content">{item.item}</p>
                            <button className="update-item" onClick={() => {setIsUpdating(item._id)}}>Update</button>
                            <button className="delete-item" onClick={() => {deleteItem(item._id)}}>Delete</button>
                        </>
                    }
                </div>
                ))
                }
            </div>
        </div>
    )

}

export default ItemDisplay