import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data;
            if(isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }
            user.setUser(user)
            user.setIsAuth(true)
            navigate(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-center"
                   style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto"> {isLogin? "Авторизация" : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-2"
                        placeholder="Введите email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-2"
                        placeholder="Введите пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type={"password"}
                    />
                    {isLogin ?
                        <div className="mt-1">
                            Нет аккаунта?
                            <NavLink className="ms-2" style={{textDecoration: "none"}} to={REGISTRATION_ROUTE}>
                                Зарегестрироваться
                            </NavLink>
                        </div>
                        :
                        <div className="mt-1">
                            Есть акканут?
                            <NavLink className="ms-2" style={{textDecoration: "none"}} to={LOGIN_ROUTE}>
                                Войти
                            </NavLink>
                        </div>
                    }

                    <Button
                        variant={"outline-success"}
                        className="align-self-end"
                        onClick={click}
                    >
                        {isLogin ? "Войти" : "Зарегестрироваться"}
                    </Button>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;