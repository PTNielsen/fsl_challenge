Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :person, :vehicle, only: [:create]
  resources :household, only: [:create] do
    get 'summary',   on: :member
    get 'residents', on: :member
  end
end
