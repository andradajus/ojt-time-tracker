# filepath: /c:/Users/Justin-PC/Desktop/UB/ojt-time-tracker/backend/app/controllers/users_controller.rb
class UsersController < ApplicationController
  before_action :authenticate_user!

  def show
    render json: current_user
  end
end
