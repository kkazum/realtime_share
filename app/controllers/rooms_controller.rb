class RoomsController < ApplicationController
  def new
    @room = Room.new
  end

  def show
    @room = Room.find_by(token: params[:token])
  end

  def create
    @room = Room.new(room_params)
    if @room.save
      redirect_to room_url(token: @room.token)
    end
  end

  private

  def room_params
    params.require(:room).permit(:token)
  end
end
