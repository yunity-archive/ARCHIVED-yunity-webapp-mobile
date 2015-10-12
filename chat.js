import yunityAPI from './api';
import yunitySocket from './socket';

const chatModule = angular.module('yunityChat', [
    yunityAPI,
    yunitySocket
]);

chatModule.factory('yChat', ['$q', '$http', 'ySocket', 'yAPI', ($q, $http, ySocket, yAPI) => {

    let chatListeners = {}; // chatid -> [array, of listener functions]
    let allListeners = [];  // [array, of, listener, functions, for, all, chats]

     // TODO: should obviously not do this...

    console.log('WIP: authenticating with pretend user foo@foo.com / foo');

    yAPI.authenticate({
        email: 'foo@foo.com',
        password: 'foo',
        success: val => {
            console.log('logged in!', val);
        }
    });

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

    // TODO: replace with real method to load messages from API

    function loadInitialMessages(chatId){

        console.log('WIP: generating pretend initial chat messages');

        function generateMessages(n) {
            let msgs = [];
            for (let i = 0; i < n; i++) {

                // see example message at
                //   https://github.com/yunity/yunity-sockets/blob/master/README.md#chat-messages

                msgs.push({
                    id: i + 1,
                    sender: 82,
                    created_at: new Date().toString(),
                    type: "TEXT",
                    content: "Hi John, how are you? " + (i)
                });

            }
            return msgs;
        }

        let deferred = $q.defer();

        // simulate api request delay

        setTimeout(() => {
            deferred.resolve(generateMessages(10));
        }, 500);

        return deferred.promise;
    }

    return {

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

        listenAll(fn) {

            allListeners.push(fn);

            return () => { // unlisten fn
                let idx = allListeners.indexOf(listener);
                if (idx) {
                    allListeners.splice(idx, 1);
                }
            };

        }
    };
}]);

export default chatModule.name;