import { useEffect, useState } from "react"
import api from "../../services/api"
import { Box, Button, LinearProgress, Stack, TextField } from "@mui/material"
import Tabela from "./tabela"
import CadastroEditar from "./cadastroEditar"

export default function Clientes() {
    const [clientes, setClientes] = useState([])
    const [totalPaginas, setTotalPaginas] = useState(1)
    const [pagina, setPagina] = useState(1)
    const [clientePesquisar, setClientePesquisar] = useState(null)
    const [showCadastroEditar, setShowCadastroEditar] = useState(false)
    const [clienteEditar, setClienteEditar] = useState(false)
    async function BuscarBanco() {
        let params = { _page: pagina, _per_page: 5 }
        if(clientePesquisar){
             params["nome:contains"]=clientePesquisar;
        }
        try{
        let retorno = await api.get("/clientes", { params: params })
        setTotalPaginas(retorno.data.pages)
        setClientes(retorno.data.data)
        console.log(retorno.data.data)
        }
        catch(erro){
            console.log(erro.name)
        }
    }

    useEffect(() => {
        BuscarBanco()
    }, [pagina, clientePesquisar])

    if(!clientes){
      return<LinearProgress/>
    }
    function mudarPagina(novaPagina){
        setPagina(novaPagina)
    }
    function onPesquisar(appData){
        setClientePesquisar(appData.get("cliente"))
        
    }

    //excluir
    async function deletar(id){
        try{
        let retorno = await api.delete(`/clientes/${id}`)
        }
        catch(erro){
            console.log(erro.name)
        }
        finally{
            BuscarBanco()
        }
    }
    //enviar cadastro ou editar
    async function enviar(cliente){
        //enviar
        try{if(cliente.id){
            console.log("tem id")
            let retorno = await api.put(`/clientes/${cliente.id}`, cliente)
           
        }else{
            let retorno = await api.post(`/clientes`, cliente)
            console.log("não tem id")
        }
        }catch(erro)
        {
            console.log(erro.nome)
        }
        finally{
            setClienteEditar(null)
            setShowCadastroEditar(false)
            BuscarBanco()
        }
    }

    //iniciar edição
    async function iniciarEdicao(id){
        let retorno = await api.get(`/clientes/${id}`)
        setClienteEditar(retorno.data)
        setShowCadastroEditar(true)
        
    }
    return <>
    {showCadastroEditar&&<CadastroEditar onCancelar={()=>{setShowCadastroEditar(false)
                                                        setClienteEditar(null)
                                                    }}
                                        onEnviar={enviar}
                                        cliente={clienteEditar}
        />}
    <Stack direction={"row"} sx={{justifyContent:"space-between", alignItems:"end"}}>
        <Stack><h1>Clientes</h1>
        <Button onClick={()=>setShowCadastroEditar(true)}>Adicionar Cliente</Button>
        </Stack>
        <form action={onPesquisar}>
        <TextField label="Pesquisar" variant="standard" name="cliente"/>
        </form>
    </Stack>
        <Tabela clientes={clientes}
                pagina={pagina}
                onMudarPagina={mudarPagina}
                totalPaginas={totalPaginas}
                onDeletar={deletar}
                onEditar={iniciarEdicao}
        />
    </>
}