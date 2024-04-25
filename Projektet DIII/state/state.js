"use strict";


// PRIVATE

const STATE = {
    movies: [],
    user: [],
    reviews: []
}



//  PUBLIC CLONE

const State = {

    GET(entity) {  // Get state denna gör enbart en kopia av STATE inte en request förfrågan.
        const stateClone = JSON.parse(JSON.stringify(STATE[entity]));
        return stateClone;
    },

    POST: async function (data) {
        const { entity, row } = data;
        const response = await fetcher(new Request(`api/${entity}.php`, {
            headers: { "Content-Type": "application/json" },
            method: 'POST',
            body: JSON.stringify(row),
        }));

        if (response.ok) {
            STATE[entity].push(response.data);

            postInstanceListnings(entity, response.data);
        }
    },


    PATCH: async function (data) {
        const { entity, id, fields, values } = data;
        const response = await fetcher(new Request(`api/${entity}.php`, {
            headers: { "Content-Type": "application/json" },
            method: 'PATCH',
            body: JSON.stringify({ id: id, favorite: values }),
        }));
        if (response.ok) {
            console.log(response);
            const index = STATE[entity].findIndex(d => d.id === data.id);
            if (index !== -1) {
                STATE[entity][index][fields] = values;
            }
        }
    },


    DELETE: async function (data) {
        const { entity, id } = data;
        const response = await fetcher(new Request(`api/${entity}.php`, {
            headers: { "Content-Type": "application/json" },
            method: 'DELETE',
            body: JSON.stringify({ id: id }),
        }));
        if (response.ok) {
            const index = STATE[entity].findIndex(d => d.id === data.id);
            if (index !== -1) {
                STATE[entity].splice(index, 1);
            }
            deleteInstanceListnings(entity, id);
        }
    }
};
