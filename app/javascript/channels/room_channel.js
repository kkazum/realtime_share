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
        const user_name = localStorage.getItem('user_name');
        let html;
        if (data.user_name == user_name) {
          html = `<div class="line__right">
                    <div class="text">${data.message}</div>
                    <span class="date">既読<br>${new Date().toLocaleString()}</span>
                  </div>`;
        } else {
          html = `<div class="line__left">
                    <div class="line__left-text">
                      <div class="name">${data.user_name}</div>
                      <div class="text">${data.message}</div>
                    </div>
                  </div>`;
        }
        return document
          .querySelector('.line__contents')
          .insertAdjacentHTML('beforeend', html);
      },

      speak: function (message) {
        const user_name = localStorage.getItem('user_name');
        console.log(user_name);
        return this.perform('speak', {
          message: message,
          user_name: user_name,
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
