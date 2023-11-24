"use strict";
const CUSTOM_LINKS_UID = "plugin::audit-log.log-activity";
module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi.plugin("log").service("myService").getWelcomeMessage();
  },
  async getAllActivityLogs() {
    const loggerCollection = await strapi.db.query(CUSTOM_LINKS_UID).findMany({
      orderBy: {
        id: "ASC",
      },
    });
    // console.log(loggerCollection)
    return loggerCollection;
  },

  async viewActivityLogs(ctx) {
    let id = ctx?.request?.body?.id;

    const loggerCollection = await strapi.db.query(CUSTOM_LINKS_UID).findOne({
      where: {
        id: id,
      },
    });

    return loggerCollection;
  },

  async getSearchData(ctx) {
    const keyword = ctx?.request?.body?.search_term;
    let loggerCollection = ''
    if (keyword == "") {
      loggerCollection = await strapi.db.query(CUSTOM_LINKS_UID).findMany();
    } else {
      loggerCollection = await strapi.db.query(CUSTOM_LINKS_UID).findMany({
        where: {
          $or: [
            {
              model: {
                $containsi: keyword,
              },
            },
            {
              type: {
                $containsi: keyword,
              },
            },
          ],
        },
      });
    }

    return loggerCollection;
  },
});
