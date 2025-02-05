class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json
  before_action :configure_permitted_parameters, if: :devise_controller?

  private

  def respond_with(resource, _opts = {})
    register_success && return if resource.persisted?

    register_failed(resource)
  end

  def register_success
    render json: { message: 'Signed up successfully.' }
  end

  def register_failed(resource)
    render json: { message: "Something went wrong.", errors: resource.errors.full_messages }
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:email, :password, :password_confirmation])
  end
end
