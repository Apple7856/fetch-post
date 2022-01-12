import React, { useEffect, useState } from 'react';
import { Typography, makeStyles, TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody, Modal } from '@material-ui/core'
import axios from 'axios';
import Navbar from '../components/Navbar';

const useStyle = makeStyles({
    home: {
        marginTop: "62px",
        height: '89.5vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
    },
    tableContainer: {
        maxWidth: "1200px",
        marginTop: "10px"
    },
    table: {

    },
    heading: {
        fontWeight: "bold",
    },
    paper: {
        position: 'absolute',
        width: 600,
        height: 300,
        backgroundColor: "white",
        border: '2px solid #000',
        overflow: "hidden"
    },
    modalBox: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    }
});

interface state {
    data: Array<string | number>,
    value: boolean,
    count: number,
    open: boolean,
    rowData: any,
}

const Home: React.FC<state> = () => {

    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);
    const [value, setValue] = useState(true);
    const [open, setOpen] = useState(false);
    const [rowData, setRowData] = useState("");
    const classes = useStyle();

    const onScroll = (e: any) => {
        const bottom = Math.trunc(e.target.scrollHeight - e.target.scrollTop) === e.target.clientHeight;
        if (bottom) {
            setValue(false);
            setCount(count + 1);
        }
    }

    const timer = () => {
        value ? setCount(count + 1) : ""
    };

    useEffect(() => {
        console.log(count);
        axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${count}`)
            .then((res) => {
                setData(data.concat(res.data.hits));
            })
            .catch((error) => {
                console.log(error);
            });
        if (value) {
            const id = setInterval(timer, 10000);
            return () => clearInterval(id);
        }
    }, [count]);

    const handleClose = () => {
        setOpen(false);
    }
    const handleOpen = (x: any) => {
        const findData: any = data.find((item: any) => item.objectID === x);
        setRowData(findData);
        setOpen(true);
    }
    return (
        <Typography component="div" className={classes.home}>
            <Navbar />
            <TableContainer component={Paper} className={classes.tableContainer} onScroll={onScroll}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" className={classes.heading}>Sr. No.</TableCell>
                            <TableCell align="center" className={classes.heading}>Title</TableCell>
                            <TableCell align="center" className={classes.heading}>URL</TableCell>
                            <TableCell align="center" className={classes.heading}>Created_at</TableCell>
                            <TableCell align="center" className={classes.heading}>Author</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row: any, i) => (
                            <TableRow key={i} className='tableRow' onClick={(x) => handleOpen(row.objectID)}>
                                <TableCell align="center" className="url">{i + 1}</TableCell>
                                <TableCell component="th" scope="row" align="center" className="title">
                                    {row.title}
                                </TableCell>
                                <TableCell align="center" className="url">{row.url}</TableCell>
                                <TableCell align="center">{row.created_at}</TableCell>
                                <TableCell align="center" className="author">{row.author}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                className={classes.modalBox}
            >
                <div className={classes.paper}>
                    <p id="simple-modal-description">
                        {JSON.stringify(rowData)}
                    </p>
                </div>
            </Modal>
        </Typography>
    )
}

export default Home;
