import yunityAPI from './api';
import yunitySocket from './socket';

console.log('creating yunityChat');

const chatModule = angular.module('yunityChat', [
    yunityAPI,
    yunitySocket
]);

chatModule.factory('yChat', ['$q', 'ySocket', 'yAPI', ($q, ySocket, yAPI) => {

    let listeners = {}; // chatid -> [array, of listener functions]

    ySocket.listen(data => {

        // TODO: we didn't decide the format for the messages

        if (data.type === 'chat') {
            let chatId = data.id;
            let fns = listeners[chatId];
            if (fns) {
                fns.forEach(fn => fn(data.msgs));
            }
        }

    });

    // TODO: replace with real method to load messages from API

    function loadInitialMessages(chatId){

        function generateMessages(n) {
            let msgs = [];
            for (let i = 0; i < n; i++) {
                msgs.push({
                    type: "chat",
                    id: i + 1,
                    body: "this is a nice message"
                });
            }
            return msgs;
        }

        let deferred = $q.defer();

        // simulate api request delay

        setTimeout(() => {
            deferred.resolve(generateMessages(10));
        }, 2000);

        return deferred.promise;
    }

    return {

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

            if (!listeners[chatId]) listeners[chatId] = [];
            listeners[chatId].push(listener);


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
                let fns = listeners[chatId];
                if (!fns) return;
                let idx = fns.indexOf(listener);
                if (idx) {
                    fns.splice(idx, 1);
                    if (fns.length === 0) {
                        delete listeners[chatId];
                    }
                }
            };

        }
    };
}]);

export default chatModule.name;