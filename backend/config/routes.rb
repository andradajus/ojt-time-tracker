Rails.application.routes.draw do
  scope 'api/v1' do
    devise_for :users, controllers: {
      registrations: 'users/registrations',
      sessions: 'users/sessions'
    }

    resources :users, only: [:index]

    get 'user', to: 'users#show'
    post 'user', to: 'users#create'
    patch 'user', to: 'users#update'

    resources :payment_schedules, only: [:create, :index, :update] do
      get 'user/:user_id', to: 'payment_schedules#show', on: :collection
      get 'list', to: 'payment_schedules#list', on: :collection
    end
    # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

    # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
    # Can be used by load balancers and uptime monitors to verify that the app is live.
    get "up" => "rails/health#show", as: :rails_health_check


    # Defines the root path route ("/")
    # root "posts#index"
  end
end
