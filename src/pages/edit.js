import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import {GET_ME, GET_NOTE} from "../gql/query";
import NoteForm from "../components/NoteForm";
import {EDIT_NOTE} from "../gql/mutation";

const EditNote = props => {
    const id = props.match.params.id;

    const { data } = useQuery(GET_NOTE, { variables: { id } });

    const { loading, error, data: userdata } = useQuery(GET_ME);

    const [editNote] = useMutation(EDIT_NOTE, {
        variables: {
            id
        },
        onCompleted: () => {
            props.history.push(`/note/${id}`);
        }
    });

    if (loading) return 'Loading...';
    if (error) return <p>Error! Note not found</p>;

    if (userdata.me.id !== data.note.author.id) {
        return <p>You do not have access to edit this note</p>;
    }

    return <NoteForm content={data.note.content} action={editNote} />;
};

export default EditNote;
