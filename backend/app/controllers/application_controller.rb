class ApplicationController < ActionController::API

  protected

  def admin_user!
    unless current_user.user_type == 'admin'
      render json: { error: 'Access denied' }, status: :forbidden
    end
  end

end
