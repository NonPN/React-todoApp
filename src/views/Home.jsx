import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { endpoint } from '../api'
import styled from 'styled-components'
import TodoCard from '../components/TodoCard'

const Container = styled.div`
    margin-top: 100px;
    margin-left: auto;
    margin-right: auto;
    border-style: solid;
    width: 50%;
    min-height: 500px;
    position: relative;
`
const Content = styled.div`
    margin-left: auto;
    margin-right: auto;
`

const Btn = styled.button`
    width: 25%;
    height: 50px;
    position: absolute;
    bottom: 15px;
    left: 37%;
`

const Home = props => {
    const [token, setToken] = useState()
    const [todos, setTodos] = useState([])
    const [todo, setTodo] = useState()
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        setToken(props.location.token)
        fetchData(props.location.token)
    }, [])

    // useEffect(() => {
    //     if (todo) {
    //         setRedirect(true)
    //     }
    // }, [todo])

    const fetchData = async (t) => {
        let res = await endpoint.get("/todos/", {
            headers: {
                'Authorization': 'Bearer ' + t
            }
        })
        if (res) setTodos(res.data)
    }

    const renderTodos = () => {
        return (
            todos.map((todo, i) =>
                <TodoCard todo={todo} editCard={editCard} token={token} fetchData={fetchData} key={i} />
            )
        )
    }

    const renderTodoPage = () => {
        return redirect ? <Redirect to={{
            pathname: "/todo",
            todo: todo,
            token: token
        }} /> : <></>
    }

    const editCard = (todo) => {
        setTodo(todo)
    }

    return (
        <Container>
            <Content>
                {renderTodos()}
            </Content>
            <Btn onClick={() => { setRedirect(true) }}>+ Create</Btn>
            {renderTodoPage()}
        </Container>
    )
}

export default Home