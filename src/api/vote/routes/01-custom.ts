module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/votes/create',
            handler: 'vote.createVote',
        }
    ]
}