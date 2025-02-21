class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :admin_user!, only: [:index, :create]

  def show
    user = User.includes(:payment_profile).find(current_user.id)
    render json: user.as_json
  end

  def index
    users = User.where.not(user_type: 'admin').page(params[:page]).per(10)
    render json: {
      users: users,
      total_pages: users.total_pages,
      current_page: users.current_page,
      next_page: users.next_page,
      prev_page: users.prev_page,
      total_count: users.total_count
    }
  end

  def create
    user = User.new(user_params)
    user.user_type = 'user'
    user.is_onboarded = false
    user.password = 'password'
    user.password_confirmation = 'password'

    if user.save
      render json: user, status: :created
    else
      render json: { message: "Something went wrong.", errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if current_user.update(update_user_params)
      if current_user.is_paid && params[:user][:payment_profile].present?
        current_user.create_payment_profile(payment_profile_params)
      end
      current_user.update(is_onboarded: true)
      render json: current_user.as_json(include: :payment_profile), status: :ok
    else
      render json: { message: "Something went wrong.", errors: current_user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :is_paid)
  end

  def update_user_params
    params.require(:user).permit(
      :first_name, :middle_name, :last_name, :year_level, :course,
      :preferred_name, :contact_number, :emergency_contact_name,
      :emergency_contact_number, :role, :is_paid,
      payment_profile_attributes: [
        :mode_of_payment, :bank_or_wallet_name, :account_name, :account_number,
        :first_monthly_payment, :second_monthly_payment, :monthly_payment
      ]
    )
  end

  def payment_profile_params
    params.require(:user).require(:payment_profile).permit(
      :mode_of_payment, :bank_or_wallet_name, :account_name, :account_number,
      :first_monthly_payment, :second_monthly_payment, :monthly_payment
    )
  end
end
