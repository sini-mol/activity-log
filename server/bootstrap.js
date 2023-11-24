"use strict";
const PLUGIN_ID = "audit-log";
const CUSTOM_LINKS_UID = "plugin::audit-log.log-activity";
const {diff} = require("deep-object-diff");

module.exports = async ({ strapi }) => {
  // bootstrap phase
  const config = strapi.config.get(PLUGIN_ID) || { contentTypes: [] };
  const models = config?.contentTypes;
  
  strapi.db.lifecycles.subscribe({
    models,
    async afterCreate(event) {
      try {
        const { result, params } = event;
        // Log Start
        const loggerCollection = await strapi.db.query(CUSTOM_LINKS_UID);

        const logger = await loggerCollection.create({
          data: {
            user:
              result?.createdBy?.firstname,
            before_data: "",
            after_data: result,
            type: event?.model?.singularName?.toUpperCase() || "",
            created_by: result?.createdBy?.id,
            updated_by: result?.updatedBy?.id,
            action: "create",
            target_id: result?.id,
            model: event?.model?.tableName,
          },
        });
      } catch (error) {
        console.log("Error", error);
        throw error;
      }
    },
    async afterUpdate(event) {
      // console.log('****',event)
      try {
        const { result, params } = event;
        const loggerCollection = await strapi.db.query(CUSTOM_LINKS_UID);
        let before_data = await loggerCollection.findOne({
          where: {
            target_id: result?.id,
            model: event?.model?.tableName,
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        // console.log("before",before_data)
        // Log Start
        const logger = await loggerCollection.create({
          data: {
            user:
              result?.createdBy?.firstname,
            before_data: before_data?.after_data,
            after_data: result,
            type: event?.model?.singularName?.toUpperCase() || "",
            created_by: result?.createdBy?.id,
            updated_by: result?.updatedBy?.id,
            action: "update",
            target_id: result?.id,
            model: event?.model?.tableName,
          },
        });
        console.log('after',logger?.after_data)
        console.log('before',logger?.before_data)
        const differences = diff(logger?.before_data, logger?.after_data);
        console.log("Differences:", differences);
        await loggerCollection.update({
          where : {
            id : logger?.id
          },
          data : {
            difference_data : differences
          }
        })
        // Log End
      } catch (error) {
        console.log("Error adding activity logs", error);
        throw error;
      }
    },
  });
};
