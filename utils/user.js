import redisClient from './redis';
import dbClient from './db';

/**
 * Utility functions related to user operations.
 * @namespace userUtils
 */
const userUtils = {
  /**
   * Retrieves the user ID and key from the request object.
   * @async
   * @memberof userUtils
   * @param {Object} request - The request object.
   * @returns {Promise<Object>} A promise that resolves to an object containing the user ID and key.
   */
  async getUserIdAndKey(request) {
    const obj = { userId: null, key: null };

    const xToken = request.header('X-Token');

    if (!xToken) return obj;

    obj.key = `auth_${xToken}`;

    obj.userId = await redisClient.get(obj.key);

    return obj;
  },

  /**
   * Retrieves a user from the database based on the provided query.
   * @async
   * @memberof userUtils
   * @param {Object} query - The query to find the user.
   * @returns {Promise<Object|null>} A promise that resolves to the user object, or null
   */
  async getUser(query) {
    const user = await dbClient.usersCollection.findOne(query);
    return user;
  },
};

export default userUtils;
