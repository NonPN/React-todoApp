import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { endpoint } from '../api'
import styled from 'styled-components'

const Container = styled.div`
    border-bottom: 1px solid;
    width: auto;
    height: 20%;
    margin: 10px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: space-between;
`
const Content = styled.div`
    margin-left: 20px;
`

const Delete = styled.button`
    float: right;
    width: auto;
    height: auto;
    background-color: red;
`
const Title = styled.h2`

`
const Des = styled.p`

`

const TodoCard = props => {
    const [title, setTitle] = useState('')
    const [des, setDes] = useState('')

    useEffect(() => {
        setTitle(props.todo.title)
        setDes(props.todo.description)
    })

    const editTodo = () => {
        props.editCard(props.todo)
    }

    const deleteTodo = () => {
        endpoint.delete("/todos/" + props.todo._id, {
            headers: {
                'Authorization': 'Bearer ' + props.token
            }
        }).then(() => {
            props.fetchData(props.token)
        })
    }

    return (
        <Container onClick={editTodo}>
            <Content>
                <Title>{title}</Title>
                <Des>{des}</Des>
            </Content>
            <Delete onClick={deleteTodo}>X</Delete>
        </Container>
    )
}

export default TodoCard