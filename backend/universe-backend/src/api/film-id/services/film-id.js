'use strict';

/**
 * film-id service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::film-id.film-id');
