import React, { useEffect, useState } from 'react'
import Input from './Input';
import Axios from 'axios';
import EditInput from './EditBtn';
import DeleteBtn from './DeleteBtn';

const ToDo = () => {
    // Getting data from my server
    const [dataFromServer, setDataFromServer] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get('http://localhost:8080')
                setDataFromServer(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    })
    const [Data, setData] = useState();

    const receivedData = (data) => {
        setData(data);
    };

    return (
        <div>
            <Input myFunc={receivedData} />
            <h1>ToDO List</h1>
            {dataFromServer.map((task) => {
                return (
                    <section key={task.id} style={{ display: 'flex', alignItems: 'center' }} >
                        <label > {task.text}</label>
                        <EditInput id={task.id} edit={Data} />
                        <DeleteBtn id={task.id} />
                    </section>
                )
            })}
        </div >
    )
}

export default ToDo
