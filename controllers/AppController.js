import redisClient from '../utils/redis';
import dbClient from '../utils/db';

/**
 * Controller class for handling application-related requests.
 */
class AppController {
  /**
   * Get the status of the application.
   * @param {Object} request - The request object.
   * @param {Object} response - The response object.
   */
  static getStatus(request, response) {
    const status = {
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    };
    response.status(200).send(status);
  }

  /**
   * Get statistics of the application.
   * @param {Object} request - The request object.
   * @param {Object} response - The response object.
   */
  static async getStats(request, response) {
    const stats = {
      users: await dbClient.nbUsers(),
      files: await dbClient.nbFiles(),
    };
    response.status(200).send(stats);
  }
}

export default AppController;
