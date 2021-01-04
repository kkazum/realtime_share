import consumer from './consumer';
if (location.pathname.split('/')[2].length > 3) {
  const token = location.pathname.split('/')[2];
  const appRoom = consumer.subscriptions.create(
    { channel: 'RoomChannel', token: token },
    {
      connected() {
        // Called when the subscription is ready for use on the server
      },

      disconnected() {
        // Called when the subscription has been terminated by the server
      },

      received(data) {
        // Called when there's incoming data on the websocket for this channel
        console.log(data);
        return alert(data);
      },

      speak: function (message) {
        console.log(message);
        return this.perform('speak', { message: message });
      },
    }
  );

  window.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
      appRoom.speak(e.target.value);
      e.target.value = '';
      e.preventDefault();
    }
  });
}
