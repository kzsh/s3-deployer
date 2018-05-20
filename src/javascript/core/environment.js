let environment = null;
export default {
  get: function(key) {
    return environment[key];
  },
  initialize: function(env) {
    if (!environment) {
      environment = env;
    } else {
      throw Error('Environment already initialized. Cannot initialize more than once.');
    }
  }
};
