class PaymentSchedulesController < ApplicationController
  before_action :authenticate_user!

  def create
    user = User.find_by(id: params[:user_id])
    return render json: { message: "User not found" }, status: :not_found unless user

    payment_schedules = user.payment_schedules.create(payment_schedule_params)

    if payment_schedules.all?(&:persisted?)
      render json: { message: 'Payment schedules created successfully' }, status: :created
    else
      render json: {
        message: 'Failed to create payment schedules',
        errors: payment_schedules.map(&:errors)
      }, status: :unprocessable_entity
    end
  end

  def index
    user = User.find_by(id: params[:user_id])
    return render json: { message: "User not found" }, status: :not_found unless user

    payment_schedules = user.payment_schedules.order(date: :desc).page(params[:page]).per(100)
    render json: {
      payment_schedules: payment_schedules.presence || [],
      total_pages: payment_schedules.total_pages,
      current_page: payment_schedules.current_page,
      next_page: payment_schedules.next_page,
      prev_page: payment_schedules.prev_page,
      total_count: payment_schedules.total_count
    }
  end

  def show
    user = User.find_by(id: params[:user_id])
    return render json: { message: "User not found" }, status: :not_found unless user

    payment_schedules = user.payment_schedules
    render json: payment_schedules, status: :ok
  end

  def update
    payment_schedule = PaymentSchedule.find_by(id: params[:id])
    return render json: { message: "Payment schedule not found" }, status: :not_found unless payment_schedule

    if payment_schedule.update(single_payment_schedule_params)
      render json: { message: 'Payment schedule updated successfully' }, status: :ok
    else
      render json: {
        message: 'Failed to update payment schedule',
        errors: payment_schedule.errors
      }, status: :unprocessable_entity
    end
  end

  def list
    payment_schedules = current_user.payment_schedules.order(date: :desc).page(params[:page]).per(100)
    render json: {
      payment_schedules: payment_schedules.presence || [],
      total_pages: payment_schedules.total_pages,
      current_page: payment_schedules.current_page,
      next_page: payment_schedules.next_page,
      prev_page: payment_schedules.prev_page,
      total_count: payment_schedules.total_count
    }
  end

  private

  def payment_schedule_params
    if params[:payment_schedules].is_a?(Array)
      params.require(:payment_schedules).map do |schedule|
        schedule.permit(:date, :amount, :bank_name, :account_number, :status, :date_paid)
      end
    else
      params.require(:payment_schedules).permit(:date, :amount, :bank_name, :account_number, :status, :date_paid)
    end
  rescue ActionController::ParameterMissing
    []
  end

  def single_payment_schedule_params
    params.require(:payment_schedule).permit(:date, :amount, :bank_name, :account_number, :status, :date_paid)
  end
end
