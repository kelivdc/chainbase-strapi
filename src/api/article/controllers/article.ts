/**
 * article controller
 */

import { factories } from '@strapi/strapi'

function formatCount(count: number): string | number {
  return count > 99 ? "99+" : count;
}

export default factories.createCoreController('api::article.article', ({ strapi }) => ({

async find(ctx) {
    // jalankan find bawaan Strapi
    const { data, meta } = await super.find(ctx);

    // helper format
    const formatCount = (count: number) => {
      return count > 99 ? '99+' : count.toString();
    };

    // map setiap article, tambahkan votesSummary
    const enrichedData = await Promise.all(
      data.map(async (article: any) => {
        const votesSummary = {
          bullish: formatCount(
            await strapi.documents('api::vote.vote').count({
              filters: { article: article, group: 'bullish' }
            })
          ),
          bearish: formatCount(
            await strapi.documents('api::vote.vote').count({
              filters: { article: article, group: 'bearish' }
            })
          ),
          fud: formatCount(
            await strapi.documents('api::vote.vote').count({
              filters: { article: article, group: 'fud' }
            })
          ),
          fomo: formatCount(
            await strapi.documents('api::vote.vote').count({
              filters: { article: article, group: 'fomo' }
            })
          ),
          dislike: formatCount(
            await strapi.documents('api::vote.vote').count({
              filters: { article: article, group: 'dislike' }
            })
          ),
          like: formatCount(
            await strapi.documents('api::vote.vote').count({
              filters: { article: article, group: 'like' }
            })
          ),
        };

        return {
          ...article,
          votesSummary,
        };
      })
    );

    return { data: enrichedData, meta };
  },
    async findRead(ctx) {
        const { slug } = ctx.params;
        const article = await strapi.documents('api::article.article').findFirst({
            filters: { 
                slug: slug,
            },
        });
        
        if (!article) {
            return ctx.notFound('Article not found');
        }

        const votesSummary = {
            bullish: formatCount(await strapi.documents('api::vote.vote').count({
                filters: {
                    article: article as any,
                    group: 'bullish'
                }
            })),
            bearish: formatCount(await strapi.documents('api::vote.vote').count({
                filters: {
                    article: article as any,
                    group: 'bearish'
                }
            })), 
            fud: formatCount(await strapi.documents('api::vote.vote').count({
                filters: {
                    article: article as any,
                    group: 'fud'
                }
            })), 
            fomo: formatCount(await strapi.documents('api::vote.vote').count({
                filters: {
                    article: article as any,
                    group: 'fomo'
                }
            })), 
            dislike: formatCount(await strapi.documents('api::vote.vote').count({
                filters: {
                    article: article as any,
                    group: 'dislike'
                }
            })), 
             like: formatCount(await strapi.documents('api::vote.vote').count({
                filters: {
                    article: article as any,
                    group: 'like'
                }
            })),           
        }       
        return {
            ...article,
            votesSummary,
        }
    }
}))
