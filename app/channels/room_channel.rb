class RoomChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    room = Room.find_by(token: params[:token])
    stream_for room
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
    room = Room.find_by(token: params[:token])
    RoomChannel.broadcast_to(room, data['message'])
  end
end
