Rails.application.routes.draw do
  root 'homepage#index'
  put '/homepage/update_all'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
