import angular from 'angular';
import isabellaPng from './images/Isabella.png';

export default class YChatPageCtrl {
  
  constructor($scope, $timeout, $stateParams, yChat) {
    'ngInject';
    Object.assign(this, {
      $scope, $timeout, $stateParams, yChat,
      isabellaPng
    });
    
    const chatId = this.$stateParams.id;
    
    this.messages = [];
    
    // FIXME: Obviously this is incorrect.
    // Currently the API only allows getting chat by userid though.
    this.yChat.getChatForUser(chatId)
      .then((chat) => {
        this.chat = chat;
        this.yChat.listen(this.chat.id, (msgs) => {
          this.$timeout(() => {
            msgs.forEach((msg) => {
              this.messages.push(msg);
            });
            this.$timeout(() => {
              this.scrollToEnd();
            });
          });
        });
    });
  }
  
  scrollToEnd() {
    // FIXME(ns) this should not be find-by-id... (and will need to get it from the link fn)
    let containerEl = document.getElementById('chat-container');
    let scrollable = angular.element(containerEl).controller('scrollableContent');
    if (scrollable && containerEl) {
      scrollable.scrollTo(containerEl.scrollHeight);
    }
  }
  
  sendMessage() {
    if (this.content) {
      let msg = { content: this.content };
      this.content = '';
      this.yChat.sendMessage(this.chat.id, msg);
    }
  }
  
}
