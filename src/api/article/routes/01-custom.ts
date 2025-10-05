module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/article/read/:slug',
            handler: 'article.findRead',
        }
    ]
}