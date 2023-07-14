require 'net/http'
require 'json'

class HomepageController < ApplicationController

  def index

  end
  # def fetch_data




  #   url = 'https://api.exchangerate-api.com/v4/latest/USD'







  #   uri = URI(url)




  #   response = Net::HTTP.get(uri)




  #   data = JSON.parse(response)







  #   data['rates'].each do |currency_code, rate|




  #     currency = Datum.new(currency_name: currency_code, rate: rate)




  #     currency.save




  #   end







  #   render json: { message: 'Data fetched and stored successfully' }




  # end

  def update_all
    url = 'https://api.exchangerate-api.com/v4/latest/USD'
    uri = URI(url)
    response = Net::HTTP.get(uri)
    data = JSON.parse(response)
    data['rates'].each do |currency_code, rate|
      currency = Datum.find_by(currency_name: currency_code)
      currency.update(rate: rate) if currency
    end
    render json: { message: 'Data updated successfully' }

  end



end
