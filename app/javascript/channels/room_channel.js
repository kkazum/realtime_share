import consumer from './consumer';
if (location.pathname.split('/')[2].length > 3) {
  const token = location.pathname.split('/')[2];
  const appRoom = consumer.subscriptions.create(
    { channel: 'RoomChannel', token: token },
    {
      connected() {
        // Called when the subscription is ready for use on the server
        const user_name =
          localStorage.getItem('user_name') ||
          window.prompt('ユーザー名を入力してください', '');
        localStorage.setItem('user_name', user_name);
      },

      disconnected() {
        // Called when the subscription has been terminated by the server
      },

      received(data) {
        // Called when there's incoming data on the websocket for this channel
        return alert(data);
      },

      speak: function (message) {
        const user_name = localStorage.getItem('user_name');
        return this.perform('speak', {
          message: `${user_name}: ${message}`,
        });
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
