import React, { useEffect } from "react";
import {GET_MY_NOTES} from "../gql/query";
import {useQuery} from "@apollo/client";
import NoteFeed from "../components/NoteFeed";

const MyNotes = () => {
    useEffect(() => {
        document.title = 'My Notes - Notedly';
    });

    const { loading, error, data } = useQuery(GET_MY_NOTES);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    console.log(data.me.notes.length);

    if (data.me.notes.length !== 0) {
        return <NoteFeed notes={data.me.notes} />
    } else {
        return <p>No notes yet</p>
    }
};

export default MyNotes;
