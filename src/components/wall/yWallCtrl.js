export default class WallCtrl {
  
  constructor(yAPI) {
    'ngInject';
    Object.assign(this, {
      
      yAPI,
      
      user: yAPI.session.user,
      canPost: yAPI.session.loggedIn,
      
      posts: [{
        title: "Tess",
        media: "/images/Bodhi.png",
        content: "Thanks everyone for the awesome time at WuppDays #7! " +
                "I'm going to write some mindless stuff here so I can " +
                "see what long comments would look like. Ones that go " +
                "over multiple lines, you know?",
        canReply: yAPI.session.loggedIn,
        replies: [{
          title: "Tess",
          media: "/images/Bodhi.png",
          content: "I'm talking to myself for the sake of science~"
        }, {
          title: "Boo",
          media: "/images/Bodhi.png",
          content: "This is how comments might look on a user's wall."
        }]
      }, {
        title: "yunity Announcement",
        media: "/images/yunity_logo.svg",
        content: "This is an IMPORTANT announcement!!! You can't reply to this :(",
        canReply: false
      }]
      
    });
  }
  
}
