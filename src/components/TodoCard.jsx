import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    border-width: 1px;
    width: 60%;
    height: 20%;
`
const Delete = styled.button`
    border-radius: 1000px;
`

const TodoCard = props => {
    const [title, setTitle] = useState('')
    const [des, setDes] = useState('')

    useEffect(() => {
        setTitle(props.todo.title)
        setDes(props.todo.description)
    })

    return (
        <Container>
            <p>test</p>
        </Container>
    )
}

export default TodoCard