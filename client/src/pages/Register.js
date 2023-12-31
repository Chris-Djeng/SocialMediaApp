import React, {useState} from 'react';
import {Form, Button} from 'semantic-ui-react';
import gql from 'graphql-tag'
import {useMutation} from '@apollo/client'
function Register(){
    const [values, Setvalues] = useState(({
        username: '',
        password: '',
        email: '',
        confirmPassword: ''
    }))
    const onChange = (event) => {
        Setvalues({...values,[event.target.name] : event.target.value})
    }

    

    const [addUser, {loading}] = useMutation(REGISTER_USER,{
        update(proxy, result){
            console.log(result)
        },
        variables: values
    })
    const onSubmit = (event) => {
        event.preventDefault()
        addUser()
    }
    return (
        <div>
        <Form onSubmit = {onSubmit} noValidate>
            <h1>Register</h1>
            <Form.Input
            label = "Username"
            placeholder = "Username.."
            name = "username"
            value = {values.username}
            onChange = {onChange}
            />
            <Form.Input
            label = "Email"
            placeholder = "Email.."
            name = "Email"
            value = {values.email}
            onChange = {onChange}
            />
            <Form.Input
            label = "Password"
            placeholder = "Password.."
            name = "password"
            value = {values.password}
            onChange = {onChange}
            />
            <Form.Input
            label = "Confirm Password"
            placeholder = "Cconfirm Password.."
            name = "confirmPassword"
            value = {values.confirmPassword}
            onChange = {onChange}
            />
            <Button type = "submit" primary>Register</Button>

        </Form>
        </div>
    )
};

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ){
        register(
            username: $username
            password: $password
            confirmPassword: $confirmPassword
            email: $email
        ){
            id email username createdAt token
        }
    }
`
export default Register;