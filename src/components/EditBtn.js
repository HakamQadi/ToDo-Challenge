import Axios from 'axios'
import React from 'react'

const EditBtn = (props) => {
    const id = props.id
    const editText = props.edit
    const editServerData = async () => {
        try {
            const updatedData = {
                text: editText,
            };

            await Axios.patch(`http://localhost:8080/${id}`, updatedData).then(
                res => {
                    console.log(res.data);
                }
            );
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <input onClick={editServerData} type="submit" value="Edit" style={{ marginLeft: '1rem' }} />
        </>
    )
}

export default EditBtn
