import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Breadcrumbs, Button, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useFetchCustomersListQuery, useRemoveCustomerMutation } from "../../redux/api/customerApi";

const CustomerList = () => {
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const { data, error, isFetching: isCustomerFetching } = useFetchCustomersListQuery(null);
    const [removeCustomer, isSuccess] = useRemoveCustomerMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            setSelectedUser(null);
        }
    }, [isSuccess])

    console.log(selectedUser, 'selectedUser');

    const handleClickOpen = (v: any) => {
        setSelectedUser(v);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const renderDialogBox = () => {
        return (
            <>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    maxWidth={false}
                >
                    <DialogTitle id="alert-dialog-title">
                        Are you sure?
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            You want to delete customer.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>No</Button>
                        <Button onClick={() => { removeCustomer(selectedUser); handleClose() }} autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }

    if (isCustomerFetching) {
        return <>Loading...</>;
    }


    return (
        <>
            <div className='main-container-header'>
                <div>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link color="inherit" to="/">
                            Home
                        </Link>
                        <Typography color="text.primary">List of Beneficiary</Typography>
                    </Breadcrumbs>
                </div>
                <div>
                    <Button variant="contained" onClick={() => navigate(`/customer/add`)}>Add Customer</Button>
                </div>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="left">FullName</TableCell>
                            <TableCell align="left">Address</TableCell>
                            <TableCell align="left">Country</TableCell>
                            <TableCell align="left">Pincode</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((v: any, i: number) => (
                            <TableRow
                                key={v.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="v">
                                    {i + 1}
                                </TableCell>
                                <TableCell align="left">{v.fullName}</TableCell>
                                <TableCell align="left">{v.address}</TableCell>
                                <TableCell align="left">{v.country}</TableCell>
                                <TableCell align="left">{v.pincode}</TableCell>
                                <TableCell align="left">
                                    <span className='action-button' onClick={() => navigate(`/customer/edit/${v.id}`)}>
                                        <EditIcon />
                                    </span>
                                    <span className='action-button' onClick={() => navigate(`/customer/view/${v.id}`)}>
                                        <VisibilityIcon />
                                    </span>
                                    <span className='action-button' onClick={(e) => handleClickOpen(v)}>
                                        <DeleteIcon />
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {renderDialogBox()}
        </>
    )
}

export default CustomerList;