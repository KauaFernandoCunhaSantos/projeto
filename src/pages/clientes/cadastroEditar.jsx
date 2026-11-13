import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Input, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function CadastroEditar(props){
    //se eu entendi bem, caso tenha um produto, o or vai retornar o primeiro valor(.nome), caso não, vai retornar o segundo valor("")
    const [nome, setNome] = useState(props.cliente?.nome||"")
    const [cpf, setCpf] = useState(props.cliente?.cpf||"")

    function enviar(){
       

        let cliente = {
            nome:nome,
            cpf:cpf,
        }
        if(props.cliente){
            cliente.id = props.cliente.id
        }
        props.onEnviar(cliente)
        //console.log(produto)
    }
    return<>
        <Dialog open fullWidth>
            <form action={enviar}>
            <DialogTitle>
                    {props.cliente?<>Editar cliente {props.cliente.id} - {props.cliente.nome}</>:<>Cadastrar novo cliente</>}
            </DialogTitle>
            <DialogContent>
                
                    
                        <Stack>
                         <TextField label="Nome" variant="standard" type="text"  required value={nome} onChange={(evento)=>setNome(evento.target.value)}/>
                         <TextField label="cpf" variant="standard" type="text" required value={cpf} onChange={(evento)=>setCpf(evento.target.value)}/>
                        </Stack>
                    
                

            </DialogContent>
            <DialogActions>
                <Button color="warning" onClick={props.onCancelar} type="button"> Cancelar</Button>
                <Button color="info" type="submit">Enviar</Button>
            </DialogActions>
            </form>
        </Dialog>

    </>
}