var Member = (function() {
    var memberId = 0;
    var username = '';
    var email = '';

    var getId = function() {
        return memberId;
    }

    var getToken = function() {
        return JSON.parse(sessionStorage.getItem('WHITEBOARD_TOKEN'));
    }

    var getName = function() {
        return username;
    }

    var getEmail = function() {
        return email;
    }

    var setId = function(id) {
        memberId = id;
    }

    var setToken = function(value) {
        sessionStorage.setItem('WHITEBOARD_TOKEN', JSON.stringify(value));
    }

    var setName = function(name) {
        username = name;
    }

    var setEmail = function(mail) {
        email = mail;
    }

    var reset = function() {
        memberId= 0;
        username = '';
        email = '';
        sessionStorage.removeItem('WHITEBOARD_TOKEN');
    }

    return {
        getId: getId,
        getToken: getToken,
        getName: getName,
        getEmail: getEmail,
        setId: setId,
        setToken: setToken,
        setName: setName,
        setEmail: setEmail,
        reset: reset
    }
})();

export default Member;