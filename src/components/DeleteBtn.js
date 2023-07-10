import React from 'react'
import Axios from 'axios';

const DeleteBtn = (props) => {
    const id = props.id
    // console.log(id)
    const deleteServerData = async () => {
        try {
            await Axios.delete(`http://localhost:8080/${id}`).then(
                // res => {
                //     console.log(res ? "deleted done":"")
                // }
            )
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <input onClick={deleteServerData} type="submit" value="Delete" style={{ marginLeft: '0.5rem' }} />
        </>
    )
}
export default DeleteBtn
