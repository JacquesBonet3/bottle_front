import {accessTokenKeyName} from "./helpers.js";
import axios from "axios";
import {BaseKey} from "@refinedev/core";

export const deleteNotes = async ( baseUrl: string, bottleId: BaseKey) => {
    const { data } = await axios.get( `${baseUrl}/bottles/${bottleId}`, {
        headers: {
            accept: '*/*',
            Authorization: `Bearer ${localStorage.getItem(accessTokenKeyName)}`,
            'Content-Type': 'application/json'
        },
    });

    return Promise.all( data.notes.map( async (note: any) => {
        await axios.delete( `${baseUrl}/notes/${note.id}`,
            {
                headers: {
                    accept: '*/*',
                    Authorization: `Bearer ${localStorage.getItem(accessTokenKeyName)}`,
                    'Content-Type': 'application/json'
                },
            })
    }))
}