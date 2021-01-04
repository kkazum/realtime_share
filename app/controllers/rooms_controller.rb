class RoomsController < ApplicationController
  def new
    @room = Room.new
  end

  def show
  end

  def create
    @room = Room.new(room_params)
    if @room.save
      redirect_to @room
    end
  end

  private

  def room_params
    params.require(:room).permit(:token)
  end
end
