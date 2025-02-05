# config/initializers/devise.rb

Devise.setup do |config|
  config.mailer = 'Devise::Mailer'
  config.case_insensitive_keys = [:email]
  config.strip_whitespace_keys = [:email]
  config.reconfirmable = true
  config.password_length = 6..128
  config.email_regexp = /\A[^@\s]+@[^@\s]+\z/
  
  config.jwt do |jwt|
    jwt.secret = Rails.application.credentials.devise_jwt[:secret_key]
    jwt.dispatch_requests = [
      ['POST', %r{^/login$}],
      ['POST', %r{^/users$}]
    ]
    jwt.revocation_requests = [
      ['DELETE', %r{^/logout$}]
    ]
    jwt.expiration_time = 1.day.to_i
  end

  config.warden do |manager|
    manager.default_strategies(scope: :user).unshift :jwt
  end
end