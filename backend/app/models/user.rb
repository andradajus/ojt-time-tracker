class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  include Devise::JWT::RevocationStrategies::JTIMatcher
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist

  has_one :payment_profile
  has_many :payment_schedules, dependent: :destroy

  def as_json(options = {})
    super(options.merge(include: :payment_profile, except: [:jti]))
  end
end
