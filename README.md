# Strapi plugin Audit Log

This plugin is used to store the audit logs of different collection types.

# Getting Started

The plugin can be tested in strapi version 4.13.3, node vesrion above 18.0.0 and less than 20.0.0

# To Install

    1.Go into your strapi project.
    2.Run the npm command npm i audit-log
    3.The plugin will be added to your strapi project.

# Note

Alternatively, you can create a file audit-log.js inside the folder config of your strapi project.

The file look like this:

        module.exports = {
        contentTypes: ['api::mycontenttype.mycontenttype', 'api::othercontentype.othercontentype'],
        };

The audit log currently displays only the 'collection type added' event when a new collection type is added in the audit-log.js file