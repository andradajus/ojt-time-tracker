class Users::SessionsController < Devise::SessionsController
  respond_to :json
  skip_before_action :verify_signed_out_user, only: :destroy
  skip_before_action :require_no_authentication, only: [:create]

  private

  def respond_with(resource, _opts = {})
    render json: { message: 'Logged in successfully.', user: resource }, status: :ok
  end

  def respond_to_on_destroy
    log_out_success && return if current_user

    log_out_failure
  end

  def log_out_success
    render json: { message: "Logged out successfully." }, status: :ok
  end

  def log_out_failure
    render json: { message: "Something went wrong." }, status: :unauthorized
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_in, keys: [:email, :password])
  end

  # Override the method to avoid using flash
  def set_flash_message!(*args)
    # Do nothing
  end

  def set_flash_message(*args)
    # Do nothing
  end

  # Override the method to avoid using resource_name
  def resource_name
    :user
  end

  def resource_class
    User
  end

  # Override the method to avoid using resource=
  def resource=(resource)
    @resource = resource
  end

  def resource
    @resource
  end
end
