import React, { useEffect, useState } from 'react'
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    FormFeedback,
} from 'reactstrap';

const initialForm = {
    email: '',
    password: '',
    terms: false,
};

const isFormValid = (form, errors) => {
    return form.terms && !errors.email && !errors.password && form.email.length > 0 && form.password.length > 0;
};

const errorMessages = {
    email: 'Please enter a valid email address',
    password: 'Please enter a valid password',
    terms: 'You must agree to the terms and conditions'
};

function Login() {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    };


    const validateForm = () => {
        const newErrors = {};

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
            newErrors.email = errorMessages.email;
        }

        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(form.password)) {
            newErrors.password = errorMessages.password;
        }

        if (!form.terms) {
            newErrors.terms = errorMessages.terms;
        }

        setErrors(newErrors);
        setIsValid(Object.keys(newErrors).length == 0);
    };

    useEffect(() => {
        validateForm();
    }, [form]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isValid) return;
        setForm(initialForm);
    };

    return (
        <Form className='form-login' onSubmit={handleSubmit}>
            <FormGroup className="form-under">
                <Label for="exampleEmail">Email</Label>
                <Input
                    id="exampleEmail"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                    onChange={handleChange}
                    value={form.email}
                    invalid={!!errors.email}
                    valid={form.email.length > 0 && !errors.email}
                />
                {form.email.length > 0 && errors.email && <FormFeedback className='feedback'>{errors.email}</FormFeedback>}
            </FormGroup>
            <FormGroup className="form-under">
                <Label for="examplePassword">Password</Label>
                <Input
                    id="examplePassword"
                    name="password"
                    placeholder="Enter your password "
                    type="password"
                    onChange={handleChange}
                    value={form.password}
                    invalid={form.password.length > 0 && !!errors.password}
                    valid={form.password.length > 0 && !errors.password}
                />
                {form.password.length > 0 && errors.password && <FormFeedback className='feedback'>{errors.password}</FormFeedback>}
            </FormGroup>
            <FormGroup check>
                <Input
                    id="terms"
                    name="terms"
                    checked={form.terms}
                    type="checkbox"
                    onChange={handleChange}
                />{' '}
                <Label check htmlFor="terms">
                    I agree to terms of service and privacy policy
                </Label>
            </FormGroup>
            <FormGroup>
                <Button disabled={!isValid}>Login</Button>
            </FormGroup>
        </Form>
    )
}

export default Login
