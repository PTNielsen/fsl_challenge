class Household < ActiveRecord::Base
  has_many :residents, class_name: 'Person'
  has_many :vehicles, through: :residents
end