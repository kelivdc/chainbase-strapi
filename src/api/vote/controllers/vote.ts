/**
 * vote controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::vote.vote', ({ strapi }) => ({
    async createVote(ctx) {
        const body = ctx.request.body;
        const article = await strapi.documents('api::article.article').findOne({
            documentId: body.document_id
        });

        if (!article) {
            ctx.throw(404, 'Article not found');
        }
        const user = ctx.state.user;
     
        const docs = await strapi.documents('api::vote.vote').findMany({
            filters: {
                article: article,
                user: user.id,
                group: body.group
            }
        })
        if (docs.length > 0) {
            ctx.throw(400, 'You have already voted for this article in this group');
        }     

        await strapi.documents('api::vote.vote').create({
            data: {
                article: body.document_id,
                user: user.id,
                group: body.group
            }
        })
     
        ctx.body = { message: 'Vote created successfully' };
    }
}))
