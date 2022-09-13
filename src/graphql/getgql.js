const getGQL = url => (
    async (query, variables={}) => {
        let obj = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                ...(localStorage.authToken ? {Authorization: "Bearer " + localStorage.authToken} : {})
            },
            body: JSON.stringify({ query, variables })
        })
        let a = await obj.json()
        if (!a.data && a.errors) {
            throw new Error(JSON.stringify(a.errors))
        } else {
            return a.data[Object.keys(a.data)[0]]
        }
    }
)
export const gql = getGQL('http://hipstagram.node.ed.asmer.org.ua/graphql');
