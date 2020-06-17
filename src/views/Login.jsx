import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { endpoint } from '../api'

const Container = styled.div`
    width: 50%;
    height: 250px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 150px;
    text-align: center;
`
const Form = styled.div`
    margin: 20px;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    display: flex;
    justify-content: space-between;
`

const Label = styled.b`
    font-size: 20px;
`
const Input = styled.input`
    margin-left: 20px;
    width: 70%;
    height: 15px;
`
const Btn = styled.button`
    width: 50%;
    height: 15%;
    padding-top: 15px;
`

const Login = props => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState()
    const [redirect, setRedirect] = useState(false)

    const login = async () => {
        let { data } = await endpoint.post("/users/auth", {
            username: username,
            password: password
        })
        if (data) {
            setToken(data.token)
            setRedirect(true)
        }
    }

    return (
        redirect ? < Redirect to={{
            pathname: "/home",
            token: token
        }} /> :
            <Container>
                <Form>
                    <Label>Username</Label>
                    <Input onChange={(event) => { setUsername(event.target.value) }} />
                </Form>
                <Form>
                    <Label>Password</Label>
                    <Input type='password' onChange={(event) => { setPassword(event.target.value) }} />
                </Form>
                <Btn onClick={login}>Login</Btn>
            </Container>
    )
}

export default Login