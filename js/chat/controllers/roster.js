Chat.Controllers.Roster = Ember.ArrayController.extend({
    content: [],

    online: function () {
        return this.filterProperty('presence', 'available');
    }.property('@each.presence'),

    setFriendPresence: function (presence) {
        var fullJid = presence.from,
            bareJid = Strophe.getBareJidFromJid(fullJid),
            friend = this.findProperty('jid', bareJid);

        if (friend) {
            friend.setPresence(presence);
        } else {
            // Something went wrong.
            // Got presence notification from user not in the roster.
            console.warn('Presence update from user not in the roster: ' + fullJid + ':' + presence.type);
        }
    }
});

Chat.Controllers.roster = Chat.Controllers.Roster.create();
