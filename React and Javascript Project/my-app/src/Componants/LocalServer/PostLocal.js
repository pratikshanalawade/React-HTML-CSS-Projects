import React, { useState, useEffect } from 'react'
import axios from 'axios'

const PostLocal = () => {
    const [data, setData] = useState([])
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    useEffect(() => {
        axios.get('http://localhost:3001/student')
            .then(response => {
                console.log("Getting from Server=>", response.data)
                setData(response.data)
            })

            .catch(err => console.log(err))

    }, [])

    const postData = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/student', {
            title,
            body

        })
            .catch(err => console.log(err))
    }
    const arr = data.map((data) => {
        return (
            <tr>

                <td style={{ border: '1px solid black' }}>{data.id}</td>
                <td style={{ border: '1px solid black' }}>{data.title}</td>
                <td style={{ border: '1px solid black' }}>{data.body}</td>

            </tr>
        )
    })


    return (
        <div class="container">
            <div>
                <h3 style={{ textAlign: "center" }}>Axios Method-Post Data</h3>
                <form style={{ textAlign: "center" }} >
                    <label><b>Name::</b></label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    {/* <hr></hr> */}
                    <label><b>::Course::</b></label>
                    <input type="text" value={body} onChange={(e) => setBody(e.target.value)} />
                    <hr></hr>
                    <button type="button" class="btn btn-success" onClick={postData}>POST</button>

                </form>
                <table class="table table-striped">
                    <thead style={{ border: '1px solid black' }}>
                        <tr>
                            <th scope="col" style={{ border: '1px solid black' }}>ID</th>
                            <th scope="col" style={{ border: '1px solid black' }}>Name</th>
                            <th scope="col">Course</th>
                        </tr>
                    </thead>
                    {arr}
                </table>
                {/* {title.Name} */}

            </div>
        </div>
    )
}

export default PostLocal
