import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Pagination, Table, TableBody, TableCell, TableFooter, TableHead, TableRow } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import { useState } from "react";
export default function Tabela(props){
    const [produtoDeletar, setProdutoDeletar] = useState(null)
    return<>
    
    {produtoDeletar&&<Dialog open >
            <DialogTitle>Confirmação de exclusão</DialogTitle>
            <DialogContent>
                <DialogContentText>Tem certeza que quer excluir o produto {produtoDeletar.id} - {produtoDeletar.nome}?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="error" onClick={()=>{props.onDeletar(produtoDeletar.id)
                    setProdutoDeletar(null)
                }}>Confirmar</Button>
                <Button onClick={()=>setProdutoDeletar(null)}>Cancelar</Button>
            </DialogActions>
        </Dialog>}
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell>Valor</TableCell>
                    <TableCell>Estoque</TableCell>
                    <TableCell>Ação</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.produtos.map((produto)=><TableRow key={produto.id}>
                    <TableCell>{produto.id}</TableCell>
                    <TableCell>{produto.nome}</TableCell>
                    <TableCell>{produto.valor}</TableCell>
                    <TableCell>{produto.estoque}</TableCell>
                    <TableCell>
                        <IconButton>
                            <EditSquareIcon onClick={()=>props.onEditar(produto.id)} color="info"/>
                        </IconButton>
                        <IconButton onClick={()=>setProdutoDeletar(produto)} color="error">
                              <DeleteIcon/>
                        </IconButton>
                    </TableCell>
                </TableRow>)}
            </TableBody>
            
               
            
        </Table>
         <Pagination count={props.totalPaginas} page={props.pagina} onChange={(evento, novaPagina)=>props.onMudarPagina(novaPagina)}/>

    </>
}