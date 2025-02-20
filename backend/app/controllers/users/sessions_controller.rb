# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  # before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  def create
    self.resource = warden.authenticate!(auth_options)
    if resource.persisted?
      sign_in(resource_name, resource)
      render json: { status: :ok, message: 'Login successful', role: resource.role }
    else
      render json: { status: 'error', message: 'Login Failed', errors: ['Invalid email or password'] }, status: :unprocessable_entity
    end
  end

  # DELETE /resource/sign_out
  # def destroy
  #   super do |resource|
  #     render json: { status: :ok, message: 'Logout successful' }
  #   end
  # end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end

  protected

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: { status: :ok, message: 'Login successful'}
    else
      render json: { status: 'error', message: 'Login Failed', errors: ['Invalid email or password'] }, status: :unprocessable_entity
    end
  end
end
