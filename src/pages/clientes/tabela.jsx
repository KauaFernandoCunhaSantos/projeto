import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Pagination, Table, TableBody, TableCell, TableFooter, TableHead, TableRow } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import { useState } from "react";
export default function Tabela(props){
    const [clienteDeletar, setClienteDeletar] = useState(null)
    return<>
    
    {clienteDeletar&&<Dialog open >
            <DialogTitle>Confirmação de exclusão</DialogTitle>
            <DialogContent>
                <DialogContentText>Tem certeza que quer excluir o cliente {clienteDeletar.id} - {clienteDeletar.nome}?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="error" onClick={()=>{props.onDeletar(clienteDeletar.id)
                    setClienteDeletar(null)
                }}>Confirmar</Button>
                <Button onClick={()=>setClienteDeletar(null)}>Cancelar</Button>
            </DialogActions>
        </Dialog>}
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell>CPF</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.clientes.map((cliente)=><TableRow key={cliente.id}>
                    <TableCell>{cliente.id}</TableCell>
                    <TableCell>{cliente.nome}</TableCell>
                    <TableCell>{cliente.cpf}</TableCell>
                    <TableCell>
                        <IconButton>
                            <EditSquareIcon onClick={()=>props.onEditar(cliente.id)} color="info"/>
                        </IconButton>
                        <IconButton onClick={()=>setClienteDeletar(cliente)} color="error">
                              <DeleteIcon/>
                        </IconButton>
                    </TableCell>
                </TableRow>)}
            </TableBody>
            
               
            
        </Table>
         <Pagination count={props.totalPaginas} page={props.pagina} onChange={(evento, novaPagina)=>props.onMudarPagina(novaPagina)}/>

    </>
}