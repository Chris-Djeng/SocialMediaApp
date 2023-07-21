import React from 'react';
import {Form} from 'semantic-ui-react';
function Register(){
    return (
        <Form onSubmit = {onSubmit} noValidate>
        <div class="ui form">
        <div class="field">
            <label>User Input</label>
            <input type="text"/>
        </div>
        </div>
        </Form>
    )
};
export default Register;