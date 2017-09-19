class Vehicle < ActiveRecord::Base
  belongs_to :owner, class_name: 'Person'

  validates :license_plate, uniquness: true
end
