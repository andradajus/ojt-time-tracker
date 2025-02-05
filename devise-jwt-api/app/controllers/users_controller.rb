class UsersController < ApplicationController
  before_action :authenticate_user!, only: [:show]

  def create
    user = User.new(user_params)
    if user.save
      render json: { message: 'User created successfully', user: user }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def login
    user = User.find_for_database_authentication(email: params[:email])
    if user&.valid_password?(params[:password])
      token = user.generate_jwt
      render json: { token: token, user: user }, status: :ok
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  def show
    render json: current_user, status: :ok
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end