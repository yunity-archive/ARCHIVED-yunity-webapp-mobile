import yunityAPI from './api';
import yunitySocket from './socket';

const chatModule = angular.module('yunityChat', [
    yunityAPI,
    yunitySocket
]);

chatModule.factory('yChat', ['$q', '$http', 'ySocket', 'yAPI', ($q, $http, ySocket, yAPI) => {

    let chatListeners = {}; // chatid -> [array, of listener functions]
    let allListeners = [];  // [array, of, listener, functions, for, all, chats]

    ySocket.listen(data => {

        let {type, payload} = data;

        if (type === 'chat_message') {
            let {chat_id, message} = payload;
            let fns = chatListeners[chat_id];
            if (fns) {
                fns.forEach(fn => fn([message]));
            }
            allListeners.forEach(fn => fn([message]));
        }

    });

    function loadInitialMessages(chatId){
        return yAPI.apiCall(`/chats/${chatId}/messages/`).then(response => {
            return response.data.messages.reverse();
        });
    }

    return {

        getChatForUser(userId, fn) {
            return yAPI.apiCall({
                uri: `/users/${userId}/chat/`,
                method: 'POST'
            }).then(response => {
                return response.data.chat;
            });
        },

        // TODO: add options, include how many historic messages to get
        // default as none?

        listen(chatId, fn) {

            let loadedInitialMessages = false;

             // store messages from socket here until we've loaded existing via API
            let incoming = [];

            function listener(msgs) {
                if (loadedInitialMessages) {
                    fn(msgs);
                } else {
                    incoming.push.apply(incoming, msgs);
                }
            }

            if (!chatListeners[chatId]) chatListeners[chatId] = [];
            chatListeners[chatId].push(listener);


            ySocket.ensureConnected().then(() => {

                // ensure we are connected before we make the API request

                // otherwise messages created after the API req but
                // before socket connect will not be seen

                loadInitialMessages(chatId).then(msgs => {

                    if (incoming.length > 0) {
                        let minimumId = incoming[0].id;
                        msgs = msgs.filter(msg => msg.id < minimumId);
                    }
                    if (msgs.length > 0) {
                        fn(msgs);
                    }
                    if (incoming.length > 0) {
                        fn(incoming.slice());
                    }
                    incoming.length = 0; // empty the tmp array
                    loadedInitialMessages = true;
                });

            });

            return () => { // unlisten fn
                let fns = chatListeners[chatId];
                if (!fns) return;
                let idx = fns.indexOf(listener);
                if (idx) {
                    fns.splice(idx, 1);
                    if (fns.length === 0) {
                        delete chatListeners[chatId];
                    }
                }
            };

        },

        sendMessage(chatId, msg) {
            return yAPI.apiCall({
                uri: `/chats/${chatId}//messages`,
                method: 'POST',
                data: msg
            }).then(response => {
                console.log('sent message!', response.data);
                return;
            }, err => {
                console.log('error sending chat message', err);
                return;
            });
        },

        /**
         * checks if 1 to 1 chat with given user id exists already
         *
         * @param userId
         * @param chats[]
         *
         * @return null | object chat
         */
        getExistingChat(userId,chats) {

            for(let chat of chats) {
                if(chat.participants.length == 2) {

                    for(let part of chat.participants) {
                        if(part == userId) {
                            return chat;
                        }
                    }

                }
            }

            return null;
        },

        initChats() {
            let chat = this;

            console.log('init chats');
            yAPI.apiCall('/chats').then(function(ret){
                yAPI.session.chats = ret.data.chats;

                chat.listenAll((msgs) => {
                    console.log('todo: sync messages');
                    // TO DO: sync messages with yApi.Session messages...
                });

            });
        },

        listenAll(fn) {

            allListeners.push(fn);

            return () => { // unlisten fn
                let idx = allListeners.indexOf(listener);
                if (idx) {
                    allListeners.splice(idx, 1);
                }
            };

        },

        getAllChats() {

            return yAPI.apiCall('/chats');

        }
    };
}]);

export default chatModule.name;