import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Input, Stack, TextField } from "@mui/material";
import { useState } from "react";

export default function CadastroEditar(props){
    //se eu entendi bem, caso tenha um produto, o or vai retornar o primeiro valor(.nome), caso não, vai retornar o segundo valor("")
    const [nome, setNome] = useState(props.produto?.nome||"")
    const [valor, setValor] = useState(props.produto?.valor||"")
    const [estoque, setEstoque] = useState(props.produto?.estoque||"")

    function enviar(){
        let produto = {
            nome:nome,
            valor:valor,
            estoque:estoque
        }
        if(props.produto){
            produto.id = props.produto.id
        }
        props.onEnviar(produto)
        //console.log(produto)
    }
    return<>
        <Dialog open fullWidth>
            <form action={enviar}>
            <DialogTitle>
                    {props.produto?<>Editar produto {props.produto.id} - {props.produto.nome}</>:<>Cadastrar novo produto</>}
            </DialogTitle>
            <DialogContent>
                
                    
                        <Stack>
                         <TextField label="Nome" variant="standard" type="text"  required value={nome} onChange={(evento)=>setNome(evento.target.value)}/>
                         <TextField label="Valor" variant="standard" type="number" required value={valor} onChange={(evento)=>setValor(evento.target.value)}/>
                         <TextField label="Estoque" variant="standard" type="number" required value={estoque} onChange={(evento)=>setEstoque(evento.target.value)}/>
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