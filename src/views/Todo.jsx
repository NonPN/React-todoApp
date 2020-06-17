import React, { useState } from 'react'
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
    const [redirect, setRedirect] = useState(false)

    const renderHome = () => {
        return redirect ? <Redirect to="/home" /> : <></>
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
        console.log(props.location.token);

    }

    return (
        <Container>
            {renderHome()}
            <FormGroup>
                <Form>
                    <Label>TITLE</Label>
                    <TextArea onChange={handleTitleChange}></TextArea>
                </Form>
                <Form>
                    <Label>DESCRIPTION</Label>
                    <TextArea onChange={handleDesChange}></TextArea>
                </Form>
            </FormGroup>
            <BtnLine>
                <Btn onClick={() => { setRedirect(true) }}>Cancel</Btn>
                <Btn onClick={createTodo}>Create</Btn>
            </BtnLine>
        </Container>
    )
}

export default Todo