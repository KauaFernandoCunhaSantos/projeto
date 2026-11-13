import { AppBar, Box, Button, Toolbar, Typography, Dialog, DialogTitle, DialogContent, TextField, Stack, DialogActions } from "@mui/material";
import { Link } from "react-router";
import { useState } from "react";
//import { useNavigate } from "react-router";

export function Login(props) {
    function enviar(formData) {
        let usuario = {
            username: formData.get("usuario"),
            password: formData.get("senha")

        }
        // console.log(formData.get("senha"))
        //conso le.log(usuario)
        props.onEnviar(usuario)
    }
    return <>
        <Dialog open={true} >
            <DialogTitle>Login</DialogTitle>
            <form action={enviar}>
                <DialogContent>

                    <Stack>
                        <TextField id="usuario" label="usuario" variant="standard" type="text" name="usuario" required autoFocus/>
                        <TextField id="senha" label="senha" variant="standard" type="password" name="senha" required/>
                    </Stack>
                <Typography color="error">
                {props.mensagemErro}
                </Typography>
                </DialogContent>
                <DialogActions>
                    |<Button color="info">Criar cadastro</Button><Button color="info" type="submit">Enviar</Button>
                </DialogActions>
            </form>


        </Dialog>
    </>
}

export default function Menu(props) {
    const [showLogin, setShowLogin] = useState(false)
    const [mensagemErro, setMensagemErro] = useState("")


        async function enviarLogin(usuario){
        console.log(usuario)
        
        const loginComSucesso = await props.onLogar(usuario)
        
        if (loginComSucesso) {
            setShowLogin(false) 
        } else {
            setMensagemErro("Usuario ou senha incorreto")
        }
    }
    


    return <>
        {showLogin && <Login onEnviar={enviarLogin} mensagemErro={mensagemErro}/>}
        <Box sx={{ flexGrow: 1, justifyContent: "space-around" }}>
            <AppBar position="static" color="warning">
                <Toolbar sx={{ display: "flex", justifyContent: "space-between", pr: "10vh" }}>

                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Button component={Link} to={"/"} color="inherit">
                        <Typography variant="h4" component="div" > Sistema vendas</Typography>
                        </Button>
                        {props.usuario && <>
                            <Button color="inherit" variant="text" size="large" component={Link} to={"/Clientes"}>Clientes</Button>
                            <Button color="inherit" variant="text" size="large" component={Link} to={"/Produtos"}>Produtos</Button>
                            <Button color="inherit" variant="text" size="large" component={Link} to={"/Vendas"}>Vendas</Button>
                        </>
                        }
                    </Box>
                    {props.usuario?<Button color="inherit" variant="text" size="large" onClick={() => {props.logOut()}}>Sair</Button>:
                    <Button color="inherit" variant="text" size="large" onClick={() => setShowLogin(true)}>Login</Button>}

                </Toolbar>
            </AppBar>
        </Box>
    </>
}

