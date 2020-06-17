import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { endpoint } from '../api'

const Container = styled.div`
    margin-top: 200px;
    margin-left: auto;
    margin-right: auto;
    border-style: solid;
    width: 50%;
    height: auto;
`
const FormGroup = styled.div`
    margin-left: auto;
    margin-right: auto;
    width: 80%;
    height: auto;
`

const Form = styled.div`
    width: auto;
    margin: 50px;
    margin-left: auto;
    margin-right: auto;
`
const Label = styled.b`
    margin: 10px;
    float: left;
`
const TextArea = styled.textarea`
    margin-top: 25px;
    width: 100%;
    height: 100px;
`
const BtnLine = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px;
`
const Btn = styled.button`
    width: 20%;
    height: 50px;
    margin: 15px;
`

const Todo = props => {
    const [title, setTitle] = useState('')
    const [des, setDes] = useState('')
    const [status, setStatus] = useState(0)
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        if (props.todo) {
            console.log(props.todo);
            setTitle(props.todo.title)
            setDes(props.todo.description)
            setStatus(1)
        }

    }, [])

    const renderHome = () => {
        return redirect ? <Redirect to={{
            pathname: "/home",
            token: props.location.token
        }} /> : <></>
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleDesChange = (event) => {
        setDes(event.target.value)
    }

    const createTodo = async () => {
        let status = await endpoint.post("/todos/", {
            title: title,
            description: des
        }, {
            headers: {
                'Authorization': 'Bearer ' + props.location.token
            }
        })
        if (status) setRedirect(true)

    }

    const editTodo = async () => {
        let status = await endpoint.put("/todos/" + props.todo._id, {
            title: title,
            description: des,
        }, {
            headers: {
                'Authorization': 'Bearer ' + props.location.token
            }
        })
        if (status) setRedirect(true)
    }

    return (
        <Container>
            {renderHome()}
            <FormGroup>
                <Form>
                    <Label>TITLE</Label>
                    <TextArea value={title} onChange={handleTitleChange}></TextArea>
                </Form>
                <Form>
                    <Label>DESCRIPTION</Label>
                    <TextArea value={des} onChange={handleDesChange}></TextArea>
                </Form>
            </FormGroup>
            <BtnLine>
                <Btn onClick={() => { setRedirect(true) }}>Cancel</Btn>
                {status == 0 ? <Btn onClick={createTodo}>Create</Btn> : <Btn onClick={editTodo}>Edit</Btn>}
            </BtnLine>
        </Container>
    )
}

export default Todo