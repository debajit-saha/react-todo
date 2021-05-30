import {
    Avatar, Button, createStyles, Input, List, ListItem,
    ListItemAvatar, ListItemText, makeStyles, Modal
} from '@material-ui/core';
import React, { useState } from 'react';
import './Todo.css';
import db from '../firebase';
import firebase from 'firebase';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { green } from '@material-ui/core/colors';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        green: {
            color: '#fff',
            backgroundColor: green[500]
        },
        cursor: {
            cursor: 'pointer'
        }
    }),
);

function Todo(props) {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState(props.todo);

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const updateTodo = () => {
        db.collection('todos').doc(props.id).set({
            todo: input,
            timeStamp: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        handleClose();
    };

    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <div style={modalStyle} className={classes.paper}>
                    <Input value={input} onChange={event => setInput(event.target.value)} />
                    <Button variant="contained" color="primary" onClick={updateTodo}>Update</Button>
                </div>
            </Modal>
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar className={classes.green}>
                            <AssignmentIcon />
                        </Avatar>
                    </ListItemAvatar>
                </ListItem>
                <ListItem>
                    <ListItemText key={props.id} primary={props.todo} secondary={"Dummy deadline"}></ListItemText>
                </ListItem>
                <Button variant="contained" color="primary" onClick={handleOpen}>Edit</Button>
                <DeleteForeverIcon className={classes.cursor} onClick={() => db.collection('todos').doc(props.id).delete()} />
            </List>
        </>
    );
}

export default Todo
