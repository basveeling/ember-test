EmberTest.Router = Ember.Router.extend({
  location: 'hash',
  enableLogging: true,

  root: Ember.Route.extend({
    index: Ember.Route.extend({
      route: '/',
      redirectsTo: 'posts.index'
    }),
    posts: Ember.Route.extend({
      route: '/posts',
      // showPost: Ember.Route.transitionTo('posts.show'),
      
      index: Ember.Route.extend({
        route: '/',
        showPost: function(router,event){
          console.log(router);
          console.log(event);
          console.log(event.context);
          router.transitionTo('show');
        },
        connectOutlets: function(router) {
          router.get('applicationController').connectOutlet('posts', EmberTest.Post.find());
        },
        eventTransitions: {
          showPost: 'posts.show'
        }
      }),
      show: Ember.Route.extend({
        route: '/:post_id',
        modelClass: EmberTest.Post,
        connectOutlets: function(router, post) {
          router.get('applicationController').connectOutlet('post', post);
        }
      }),
    })
  })
});

